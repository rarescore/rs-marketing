from PIL import Image, ImageDraw, ImageFilter, ImageChops
import math, random, os

OUT='/mnt/data/lg_article_fix/public/article-images'
os.makedirs(OUT, exist_ok=True)
W,H=1600,1000
RED=(239,16,29)
BLACK=(8,8,9)
WHITE=(247,244,238)
GRAY=(105,105,112)
DARK=(18,18,21)
random.seed(12)

def grain(im, amt=8):
    noise=Image.new('L',im.size)
    px=noise.load()
    for y in range(0,H,2):
        for x in range(0,W,2):
            v=random.randint(0,255)
            px[x,y]=v
            if x+1<W: px[x+1,y]=v
            if y+1<H: px[x,y+1]=v
            if x+1<W and y+1<H: px[x+1,y+1]=v
    noise=noise.filter(ImageFilter.GaussianBlur(0.7))
    overlay=Image.new('RGBA',im.size,(255,255,255,0))
    overlay.putalpha(noise.point(lambda p: int((p/255)*amt)))
    return Image.alpha_composite(im.convert('RGBA'),overlay)

def glow(base, x,y,r,color=RED,alpha=150):
    lay=Image.new('RGBA',base.size,(0,0,0,0)); d=ImageDraw.Draw(lay)
    d.ellipse((x-r,y-r,x+r,y+r), fill=color+(alpha,))
    lay=lay.filter(ImageFilter.GaussianBlur(r*.65))
    return Image.alpha_composite(base.convert('RGBA'),lay)

def lineglow(base, pts, width=4, color=RED):
    lay=Image.new('RGBA',base.size,(0,0,0,0)); d=ImageDraw.Draw(lay)
    d.line(pts, fill=color+(210,), width=width, joint='curve')
    blur=lay.filter(ImageFilter.GaussianBlur(width*3))
    base=Image.alpha_composite(base.convert('RGBA'),blur)
    return Image.alpha_composite(base,lay)

def save(name, im):
    im=grain(im,5).convert('RGB')
    im.save(f'{OUT}/{name}.webp','WEBP',quality=91,method=6)
    im.resize((800,500),Image.Resampling.LANCZOS).save(f'{OUT}/{name}-800.webp','WEBP',quality=88,method=6)

# 1 first impression
im=Image.new('RGBA',(W,H),BLACK+(255,)); im=glow(im,1120,460,360,RED,120); d=ImageDraw.Draw(im)
# monitor perspective
screen=[(235,190),(1265,145),(1375,760),(300,815)]
d.polygon(screen, fill=(20,20,23,255), outline=(70,70,74,255), width=3)
# abstract UI
for i,(yy,ww) in enumerate([(270,670),(360,480),(440,820)]):
    d.rounded_rectangle((390,yy,390+ww,yy+34),9,fill=((246,243,236,220) if i==0 else (105,105,112,140)))
d.rounded_rectangle((390,535,650,610),18,fill=RED+(255,))
d.rounded_rectangle((700,535,925,610),18,outline=(110,110,114,200),width=2)
# attention rings
for rr,a in [(225,180),(320,105),(430,45)]: d.ellipse((1090-rr,435-rr,1090+rr,435+rr),outline=RED+(a,),width=3)
d.ellipse((1072,417,1108,453),fill=WHITE+(255,))
# desk shadow
d.polygon([(180,835),(1460,780),(1580,1000),(0,1000)],fill=(3,3,4,255))
save('first-impression',im)

# 2 information architecture
im=Image.new('RGBA',(W,H),WHITE+(255,)); d=ImageDraw.Draw(im)
# subtle grid
for x in range(0,W,80): d.line((x,0,x,H),fill=(225,221,214,90),width=1)
for y in range(0,H,80): d.line((0,y,W,y),fill=(225,221,214,90),width=1)
levels=[[(620,130,980,240)],[(270,380,590,500),(650,380,950,500),(1010,380,1330,500)],[(160,690,410,790),(460,690,710,790),(760,690,1010,790),(1060,690,1310,790)]]
centers=[]
for level in levels:
    row=[]
    for box in level:
        d.rounded_rectangle(box,22,fill=(9,9,10,255),outline=(35,35,38,255),width=2)
        x1,y1,x2,y2=box; row.append(((x1+x2)//2,(y1+y2)//2));
        d.rectangle((x1+28,y1+25,x1+100,y1+31),fill=RED+(255,));
        d.rectangle((x1+28,y1+52,x2-35,y1+61),fill=(110,110,112,120));
        d.rectangle((x1+28,y1+76,x2-100,y1+84),fill=(110,110,112,85));
    centers.append(row)
for c in centers[1]: im=lineglow(im,[centers[0][0],c],3)
for i,c in enumerate(centers[2]): im=lineglow(im,[centers[1][min(i//2,2)],c],3)
im=glow(im,800,230,140,RED,60)
save('seo-architecture',im)

# 3 CWV performance
im=Image.new('RGBA',(W,H),BLACK+(255,)); im=glow(im,470,510,400,RED,105); d=ImageDraw.Draw(im)
# speed rings
cx,cy=450,510
for rr,a in [(310,70),(235,120),(155,210)]: d.arc((cx-rr,cy-rr,cx+rr,cy+rr),205,515,fill=RED+(a,),width=12)
for ang in range(210,505,24):
    a=math.radians(ang); r1,r2=270,300; d.line((cx+math.cos(a)*r1,cy+math.sin(a)*r1,cx+math.cos(a)*r2,cy+math.sin(a)*r2),fill=(190,190,194,120),width=4)
d.line((cx,cy,cx+190,cy-125),fill=WHITE+(255,),width=9)
d.ellipse((cx-20,cy-20,cx+20,cy+20),fill=RED+(255,))
# performance cards
for i,y in enumerate([240,405,570]):
    d.rounded_rectangle((850,y,1370,y+115),20,fill=(19,19,22,255),outline=(60,60,65,220),width=2)
    d.rectangle((885,y+30,980,y+38),fill=RED+(240,));
    d.rectangle((885,y+60,1230-(i*60),y+69),fill=(210,210,214,110));
    d.rounded_rectangle((1245,y+26,1332,y+86),16,outline=RED+(180,),width=3)
save('core-web-vitals',im)

# 4 AI search
im=Image.new('RGBA',(W,H),DARK+(255,)); im=glow(im,800,440,400,RED,115); d=ImageDraw.Draw(im)
d.rounded_rectangle((240,190,1360,790),32,fill=(9,9,11,250),outline=(67,67,73,230),width=2)
d.rounded_rectangle((330,280,1268,362),41,fill=(246,244,238,235)); d.ellipse((370,306,410,346),outline=RED+(255,),width=5); d.line((403,340,430,365),fill=RED+(255,),width=5)
# ai response blocks
for y,wid in [(450,730),(500,835),(550,610),(635,380)]: d.rounded_rectangle((355,y,355+wid,y+17),8,fill=(178,178,183,90))
d.rounded_rectangle((1080,610,1245,705),20,outline=RED+(220,),width=3)
# nodes behind
for i in range(16):
    x=random.randint(80,1520); y=random.randint(80,920); r=random.randint(3,8); d.ellipse((x-r,y-r,x+r,y+r),fill=RED+(random.randint(80,220),))
save('ai-search',im)

# 5 mobile first
im=Image.new('RGBA',(W,H),RED+(255,)); d=ImageDraw.Draw(im)
# black waves
for i in range(8):
    pts=[]
    for x in range(0,W+100,100): pts.append((x,520+math.sin((x/170)+i*.65)*80+i*24))
    d.line(pts,fill=(0,0,0,35+i*10),width=3)
# device tilted on transparent layer
phone=Image.new('RGBA',(620,980),(0,0,0,0)); pd=ImageDraw.Draw(phone)
pd.rounded_rectangle((60,20,560,950),72,fill=(7,7,9,255),outline=(55,55,60,255),width=6)
pd.rounded_rectangle((83,66,537,905),48,fill=WHITE+(255,))
pd.rounded_rectangle((130,130,490,260),26,fill=(9,9,10,255)); pd.rectangle((160,165,360,176),fill=RED+(255,)); pd.rectangle((160,198,440,210),fill=(200,197,191,150)); pd.rounded_rectangle((160,222,295,252),12,fill=RED+(255,))
for y in [330,480,630]:
    pd.rounded_rectangle((130,y,490,y+115),24,outline=(205,201,193,255),width=3); pd.rectangle((165,y+34,405,y+44),fill=(60,60,62,130)); pd.rectangle((165,y+65,350,y+73),fill=(130,130,132,100))
phone=phone.rotate(-10,resample=Image.Resampling.BICUBIC,expand=1)
im.alpha_composite(phone,(500,-40))
im=glow(im,790,500,330,(255,255,255),45)
save('mobile-first',im)

# 6 accessibility
im=Image.new('RGBA',(W,H),WHITE+(255,)); d=ImageDraw.Draw(im)
d.rectangle((0,0,800,H),fill=(8,8,10,255));
# focus rectangles / contrast
for i in range(5):
    x=145+i*95; y=260+i*95; d.rounded_rectangle((x,y,x+360,y+150),24,outline=(255,255,255,150),width=3)
d.rounded_rectangle((880,190,1430,760),28,fill=(245,242,235,255),outline=(30,30,33,255),width=3)
d.rectangle((940,250,1335,270),fill=(15,15,17,255)); d.rectangle((940,310,1250,324),fill=(100,100,103,140)); d.rectangle((940,355,1285,369),fill=(100,100,103,100));
d.rounded_rectangle((940,445,1160,525),14,fill=RED+(255,)); d.rounded_rectangle((1190,445,1370,525),14,outline=(10,10,12,255),width=3)
# keyboard focus ring
for r,a in [(130,70),(95,130),(62,230)]: d.ellipse((1045-r,630-r,1045+r,630+r),outline=RED+(a,),width=4)
save('accessibility',im)

# 7 security recovery
im=Image.new('RGBA',(W,H),BLACK+(255,)); im=glow(im,800,500,460,RED,130); d=ImageDraw.Draw(im)
# broken panels
for i in range(6):
    x=130+i*240; d.polygon([(x,180),(x+190,140),(x+220,810),(x+25,850)],fill=(18+i*2,18+i*2,21+i*2,255),outline=(65,65,70,150))
# shield
shield=[(800,250),(1040,335),(1010,625),(800,790),(590,625),(560,335)]
d.polygon(shield,fill=(10,10,12,245),outline=RED+(255,),width=8)
d.arc((690,360,910,600),180,360,fill=WHITE+(255,),width=18); d.rectangle((690,470,910,650),fill=WHITE+(255,)); d.rounded_rectangle((735,505,865,650),20,fill=(12,12,14,255)); d.ellipse((782,545,818,581),fill=RED+(255,)); d.rectangle((796,575,804,620),fill=RED+(255,))
# recovery line
im=lineglow(im,[(200,780),(460,720),(610,770),(800,670),(1040,700),(1390,550)],5)
save('hacked-site',im)

# 8 local SEO map
im=Image.new('RGBA',(W,H),(14,14,16,255)); d=ImageDraw.Draw(im)
# roads
roads=[[(0,220),(420,260),(740,180),(1100,270),(1600,230)],[(100,1000),(420,720),(760,670),(1010,410),(1600,310)],[(0,560),(370,530),(700,610),(1020,580),(1600,770)],[(300,0),(430,400),(380,1000)],[(1150,0),(1080,330),(1280,1000)]]
for pts in roads:
    d.line(pts,fill=(65,65,70,190),width=24); d.line(pts,fill=(125,125,128,80),width=2)
# red rings around locations
for x,y,scale in [(470,520,1),(1030,415,.75),(1220,720,.55)]:
    im=glow(im,x,y,int(180*scale),RED,80); d=ImageDraw.Draw(im)
    for r,a in [(85,210),(130,120),(175,45)]: d.ellipse((x-r*scale,y-r*scale,x+r*scale,y+r*scale),outline=RED+(a,),width=4)
    # pin
    d.ellipse((x-18,y-26,x+18,y+10),fill=WHITE+(255,)); d.polygon([(x-13,y),(x+13,y),(x,y+31)],fill=WHITE+(255,)); d.ellipse((x-6,y-14,x+6,y-2),fill=RED+(255,))
save('local-seo',im)

# 9 growth funnel
im=Image.new('RGBA',(W,H),WHITE+(255,)); d=ImageDraw.Draw(im)
# inbound particles
for i in range(70):
    x=random.randint(70,560); y=random.randint(100,900); r=random.randint(3,10); col=RED+(random.randint(40,190),) if i%3 else (30,30,32,random.randint(30,100)); d.ellipse((x-r,y-r,x+r,y+r),fill=col)
# funnel polygons
funnel=[(570,160),(1360,160),(1080,500),(980,500),(900,820),(820,820),(760,500),(660,500)]
d.polygon(funnel,fill=(10,10,12,255)); d.line(funnel+[funnel[0]],fill=(70,70,74,255),width=3)
# streams
for y in [250,330,410]: d.line((650,y,1260,y),fill=(120,120,124,80),width=10)
im=lineglow(im,[(620,270),(1060,360),(930,540),(870,830)],11)
d.ellipse((820,800,920,900),fill=RED+(255,));
save('qualified-growth',im)

# 10 structured data
im=Image.new('RGBA',(W,H),BLACK+(255,)); im=glow(im,800,500,400,RED,80); d=ImageDraw.Draw(im)
# nodes cards
nodes=[(230,210,510,360),(650,110,950,270),(1110,220,1380,370),(320,610,610,780),(760,520,1080,720),(1160,650,1440,820)]
cent=[]
for i,box in enumerate(nodes):
    d.rounded_rectangle(box,22,fill=(19,19,22,250),outline=((239,16,29,220) if i==4 else (62,62,67,220)),width=2)
    x1,y1,x2,y2=box; cent.append(((x1+x2)//2,(y1+y2)//2)); d.rectangle((x1+28,y1+28,x1+90,y1+35),fill=RED+(255,));
    for k in range(3): d.rectangle((x1+28,y1+64+k*23,x2-35-random.randint(0,80),y1+70+k*23),fill=(150,150,154,100))
for a,b in [(0,1),(1,2),(0,3),(1,4),(2,5),(3,4),(4,5)]: im=lineglow(im,[cent[a],cent[b]],3)
save('structured-data',im)

# 11 redesign/rebuild
im=Image.new('RGBA',(W,H),WHITE+(255,)); d=ImageDraw.Draw(im)
# old pane left
old=(100,160,730,820); new=(870,130,1500,790)
d.rounded_rectangle(old,25,fill=(35,35,38,255),outline=(100,100,104,150),width=2)
# broken pieces
for y,w in [(260,380),(335,460),(410,300),(610,420)]: d.rectangle((170,y,170+w,y+26),fill=(125,125,130,80))
d.line((440,170,360,420,520,560,410,820),fill=RED+(230,),width=8)
# new pane
d.rounded_rectangle(new,25,fill=(10,10,12,255),outline=RED+(220,),width=3)
d.rectangle((940,220,1270,245),fill=WHITE+(230,)); d.rectangle((940,275,1370,290),fill=(160,160,164,110)); d.rounded_rectangle((940,345,1190,420),16,fill=RED+(255,));
for y in [510,610]: d.rounded_rectangle((940,y,1425,y+70),16,outline=(85,85,90,190),width=2)
# reconstruction beam
im=lineglow(im,[(700,490),(800,490),(900,490)],16)
for i in range(12):
    x=760+random.randint(-70,70); y=490+random.randint(-160,160); r=random.randint(2,7); d=ImageDraw.Draw(im); d.ellipse((x-r,y-r,x+r,y+r),fill=RED+(random.randint(100,255),))
save('redesign-decision',im)

print('generated',len([f for f in os.listdir(OUT) if f.endswith('.webp')]),'webp files')
