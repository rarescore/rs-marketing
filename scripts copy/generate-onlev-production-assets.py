from pathlib import Path
import numpy as np
import trimesh
from trimesh.visual.material import PBRMaterial

OUT = Path('/mnt/data/onlev/work/public/models')
OUT.mkdir(parents=True, exist_ok=True)


def mat(name, color, metallic=0.0, rough=0.5):
    return PBRMaterial(name=name, baseColorFactor=np.array(color, dtype=np.uint8), metallicFactor=metallic, roughnessFactor=rough)

M = {
    'graphite': mat('Graphite', [37,39,43,255], .62, .28),
    'nickel': mat('Nickel', [153,157,160,255], .85, .24),
    'warm': mat('WarmMetal', [172,128,75,255], .82, .28),
    'blue': mat('SignalBlue', [72,104,197,255], .42, .25),
    'paper': mat('MineralPaper', [225,220,208,255], .05, .86),
    'stone': mat('Limestone', [176,165,145,255], .08, .76),
    'bronze': mat('OxidizedBronze', [122,92,60,255], .68, .42),
    'oak': mat('SmokedOak', [67,47,34,255], .12, .54),
    'steel': mat('BrushedSteel', [113,128,137,255], .88, .31),
    'enamel': mat('TechnicalEnamel', [22,48,65,255], .48, .24),
    'copper': mat('Copper', [169,99,56,255], .84, .24),
    'black': mat('BlackenedMetal', [29,30,33,255], .72, .34),
    'oxblood': mat('Oxblood', [78,40,49,255], .24, .48),
    'vellum': mat('Vellum', [201,190,170,255], .04, .72),
}

def box(extents, pos, material, name):
    mesh = trimesh.creation.box(extents=extents)
    mesh.apply_translation(pos)
    mesh.visual.material = material
    mesh.metadata['name'] = name
    return mesh

def cyl(radius, height, pos, material, name, axis='y'):
    mesh = trimesh.creation.cylinder(radius=radius, height=height, sections=24)
    # default along z
    if axis == 'y':
        mesh.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [1,0,0]))
    elif axis == 'x':
        mesh.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0,1,0]))
    mesh.apply_translation(pos)
    mesh.visual.material = material
    mesh.metadata['name'] = name
    return mesh

def export(name, meshes):
    scene = trimesh.Scene()
    for i, mesh in enumerate(meshes):
        node_name = mesh.metadata.get('name', f'part_{i}')
        scene.add_geometry(mesh, node_name=node_name, geom_name=node_name)
    data = scene.export(file_type='glb')
    path = OUT / name
    path.write_bytes(data)
    print(path.name, path.stat().st_size)

# ONLEV architectural mechanism asset
parts=[]
# base wall / plinth
parts += [box([7.4,4.8,.22],[0,0,-.32],M['paper'],'mineral_backplane')]
# nested offset frames, intentionally distinct depths
for idx,(w,h,z,offx) in enumerate([(5.3,3.35,0,0.15),(4.35,2.62,.18,.38),(3.35,1.95,.36,.62)]):
    t=.12
    parts += [
        box([w,t,.22],[offx,h/2, z],M['graphite' if idx==0 else 'nickel'],f'frame_{idx}_top'),
        box([w,t,.22],[offx,-h/2,z],M['graphite' if idx==0 else 'nickel'],f'frame_{idx}_bottom'),
        box([t,h,.22],[offx-w/2,0,z],M['graphite' if idx==0 else 'nickel'],f'frame_{idx}_left'),
        box([t,h,.22],[offx+w/2,0,z],M['graphite' if idx==0 else 'nickel'],f'frame_{idx}_right'),
    ]
# ONLEV mark-like central mechanism: twin pillars + warm V beam
parts += [
    box([.28,1.34,.3],[.25,.05,.62],M['graphite'],'mark_left'),
    box([.28,1.34,.3],[.88,.05,.62],M['graphite'],'mark_right'),
]
# diagonal warm beam created as box rotated about z
beam = box([1.22,.15,.25],[1.38,-.34,.72],M['warm'],'mark_v_beam')
beam.apply_transform(trimesh.transformations.rotation_matrix(-0.56,[0,0,1],point=[1.38,-.34,.72]))
parts.append(beam)
# signal rails and nodes
parts += [
    box([2.6,.07,.12],[-1.15,.72,.5],M['blue'],'signal_rail_top'),
    box([1.9,.07,.12],[-.82,-.82,.48],M['blue'],'signal_rail_bottom'),
]
for i,(x,y) in enumerate([(-2.15,.72),(-1.25,.72),(-.35,.72),(.25,.72),(-1.55,-.82),(-.65,-.82)]):
    parts.append(cyl(.09,.12,[x,y,.58],M['nickel'],f'node_{i}',axis='z'))
# side fins / ceiling cove suggestion
parts += [
    box([.14,4.2,.72],[-3.18,0,.05],M['graphite'],'left_return'),
    box([.14,4.2,.72],[3.18,0,.05],M['graphite'],'right_return'),
    box([6.5,.14,.72],[0,2.08,.05],M['nickel'],'ceiling_cove'),
]
export('onlev-mechanism.glb', parts)

# Real Estate portal asset
p=[]
# thick limestone wall returns and lintel
p += [
    box([.48,4.65,.9],[-1.38,.05,0],M['stone'],'estate_wall_left'),
    box([.48,4.65,.9],[1.38,.05,0],M['stone'],'estate_wall_right'),
    box([3.24,.48,.9],[0,2.13,0],M['stone'],'estate_lintel'),
    box([2.94,.22,1.15],[0,-2.05,.1],M['stone'],'estate_threshold'),
]
# bronze inner reveal
for x in (-1.09,1.09): p.append(box([.11,4.05,.5],[x,.02,.28],M['bronze'],f'estate_bronze_jamb_{x}'))
p.append(box([2.27,.11,.5],[0,1.98,.28],M['bronze'],'estate_bronze_head'))
# oak door and panels
p.append(box([2.06,3.86,.2],[0,.02,.5],M['oak'],'estate_door'))
for y,h in ((.85,1.25),(-.74,1.48)):
    p.append(box([1.66,h,.06],[0,y,.63],M['oak'],f'estate_panel_{y}'))
# handle + hinges
p += [
    cyl(.045,.55,[.72,.02,.68],M['bronze'],'estate_handle_vertical','y'),
    cyl(.04,.36,[.58,.02,.76],M['bronze'],'estate_handle_horizontal','x'),
]
for y in (-1.45,1.45): p.append(cyl(.055,.25,[-1.06,y,.5],M['nickel'],f'estate_hinge_{y}','y'))
export('portal-real-estate.glb',p)

# Plumbing portal asset
p=[]
p += [
    box([.4,4.7,1.0],[-1.36,.05,0],M['enamel'],'plumb_frame_left'),
    box([.4,4.7,1.0],[1.36,.05,0],M['enamel'],'plumb_frame_right'),
    box([3.12,.4,1.0],[0,2.18,0],M['enamel'],'plumb_frame_top'),
    box([2.9,.18,1.2],[0,-2.08,.12],M['steel'],'plumb_threshold'),
]
# steel reveal + visible fasteners
for x in (-1.1,1.1): p.append(box([.1,4.08,.52],[x,.02,.31],M['steel'],f'plumb_steel_jamb_{x}'))
p.append(box([2.3,.1,.52],[0,2.0,.31],M['steel'],'plumb_steel_head'))
for x in (-1.2,1.2):
  for y in (-1.55,-.65,.25,1.15): p.append(cyl(.045,.09,[x,y,.56],M['nickel'],f'bolt_{x}_{y}','z'))
# door and pull hardware
p.append(box([2.08,3.88,.22],[0,.02,.54],M['enamel'],'plumb_door'))
p.append(box([.12,2.4,.12],[.72,.05,.74],M['steel'],'plumb_pullbar'))
# copper line inset
p += [box([.09,2.55,.08],[-.58,.15,.71],M['copper'],'plumb_copper_vertical'), box([.9,.09,.08],[-.17,1.37,.71],M['copper'],'plumb_copper_top')]
# hinges
for y in (-1.5,0,1.5): p.append(cyl(.06,.3,[-1.07,y,.54],M['steel'],f'plumb_hinge_{y}','y'))
export('portal-plumbing.glb',p)

# Injury Law portal asset
p=[]
p += [
    box([.38,4.72,.92],[-1.36,.04,0],M['black'],'law_frame_left'),
    box([.38,4.72,.92],[1.36,.04,0],M['black'],'law_frame_right'),
    box([3.12,.38,.92],[0,2.19,0],M['black'],'law_frame_top'),
    box([2.88,.2,1.15],[0,-2.08,.1],M['vellum'],'law_threshold'),
]
# oxblood reveal
for x in (-1.08,1.08): p.append(box([.1,4.08,.46],[x,.02,.28],M['oxblood'],f'law_reveal_{x}'))
p.append(box([2.26,.1,.46],[0,2.0,.28],M['oxblood'],'law_reveal_head'))
# door, archival panel bands
p.append(box([2.04,3.86,.21],[0,.02,.5],M['oxblood'],'law_door'))
for y in (.92,.48,.04,-.4,-.84): p.append(box([1.62,.08,.045],[-.05,y,.63],M['vellum'],f'law_record_band_{y}'))
# long calm handle
p += [cyl(.038,.72,[.72,.0,.7],M['nickel'],'law_handle','y'), cyl(.035,.3,[.58,.0,.75],M['nickel'],'law_handle_cross','x')]
for y in (-1.45,1.45): p.append(cyl(.055,.26,[-1.05,y,.5],M['black'],f'law_hinge_{y}','y'))
export('portal-injury-law.glb',p)
# Frame-only optimized portal shells used by runtime hinged doors.
export('portal-real-estate-frame.glb', [
    box([.48,4.65,.9],[-1.38,.05,0],M['stone'],'estate_wall_left'),
    box([.48,4.65,.9],[1.38,.05,0],M['stone'],'estate_wall_right'),
    box([3.24,.48,.9],[0,2.13,0],M['stone'],'estate_lintel'),
    box([2.94,.22,1.15],[0,-2.05,.1],M['stone'],'estate_threshold'),
    box([.11,4.05,.5],[-1.09,.02,.28],M['bronze'],'estate_bronze_left'),
    box([.11,4.05,.5],[1.09,.02,.28],M['bronze'],'estate_bronze_right'),
    box([2.27,.11,.5],[0,1.98,.28],M['bronze'],'estate_bronze_head'),
])
plumb_frame=[
    box([.4,4.7,1.0],[-1.36,.05,0],M['enamel'],'plumb_frame_left'),
    box([.4,4.7,1.0],[1.36,.05,0],M['enamel'],'plumb_frame_right'),
    box([3.12,.4,1.0],[0,2.18,0],M['enamel'],'plumb_frame_top'),
    box([2.9,.18,1.2],[0,-2.08,.12],M['steel'],'plumb_threshold'),
    box([.1,4.08,.52],[-1.1,.02,.31],M['steel'],'plumb_steel_left'),
    box([.1,4.08,.52],[1.1,.02,.31],M['steel'],'plumb_steel_right'),
    box([2.3,.1,.52],[0,2.0,.31],M['steel'],'plumb_steel_head'),
    box([.08,2.4,.12],[1.2,.1,.58],M['copper'],'plumb_copper_side'),
]
for x in (-1.2,1.2):
  for y in (-1.55,-.65,.25,1.15): plumb_frame.append(cyl(.045,.09,[x,y,.56],M['nickel'],f'frame_bolt_{x}_{y}','z'))
export('portal-plumbing-frame.glb',plumb_frame)
export('portal-injury-law-frame.glb', [
    box([.38,4.72,.92],[-1.36,.04,0],M['black'],'law_frame_left'),
    box([.38,4.72,.92],[1.36,.04,0],M['black'],'law_frame_right'),
    box([3.12,.38,.92],[0,2.19,0],M['black'],'law_frame_top'),
    box([2.88,.2,1.15],[0,-2.08,.1],M['vellum'],'law_threshold'),
    box([.1,4.08,.46],[-1.08,.02,.28],M['oxblood'],'law_reveal_left'),
    box([.1,4.08,.46],[1.08,.02,.28],M['oxblood'],'law_reveal_right'),
    box([2.26,.1,.46],[0,2.0,.28],M['oxblood'],'law_reveal_head'),
    box([2.18,.26,.12],[0,1.78,.58],M['vellum'],'law_archival_transom'),
])
