import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/+esm';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/+esm';

const mobile = window.matchMedia('(max-width: 720px)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SEED_COUNT = reducedMotion ? 42 : (mobile ? 78 : 128);
const SIM_DURATION = reducedMotion ? 3.5 : 8.5;
const FIXED_STEP = 1 / 60;

const canvas = document.querySelector('#seed-canvas');
const section = document.querySelector('#top');
const heroCopy = document.querySelector('#hero-copy');
const loadingMark = document.querySelector('#loading-mark');

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createSeedGeometry() {
  const geometry = new THREE.SphereGeometry(0.23, 32, 24);
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const taper = 1 - Math.max(0, y) * 0.28;
    const lowerBulge = 1 + Math.max(0, -y) * 0.14;
    const ripple = 1 + Math.sin((x + z) * 12) * 0.012;
    position.setXYZ(i, x * 0.78 * taper * ripple, y * 1.14, z * 0.72 * lowerBulge * ripple);
  }

  geometry.computeVertexNormals();
  return geometry;
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(mobile ? 42 : 35, 1, 0.1, 100);
camera.position.set(0, 0.6, mobile ? 13.6 : 11.5);
camera.lookAt(0, -0.2, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.shadowMap.enabled = !mobile;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

scene.add(new THREE.HemisphereLight(0xffffff, 0xf0e4e4, 2.4));

const key = new THREE.DirectionalLight(0xffffff, 4.2);
key.position.set(-4, 7, 7);
key.castShadow = !mobile;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = -7;
key.shadow.camera.right = 7;
key.shadow.camera.top = 8;
key.shadow.camera.bottom = -8;
scene.add(key);

const rim = new THREE.DirectionalLight(0xffd6d6, 2.8);
rim.position.set(5, 2, -6);
scene.add(rim);

const seedGeometry = createSeedGeometry();
const seedMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#b80f2e'),
  roughness: 0.16,
  transmission: 0.18,
  thickness: 0.65,
  ior: 1.36,
  clearcoat: 0.9,
  clearcoatRoughness: 0.08,
  sheen: 0.28,
  sheenColor: new THREE.Color('#ff335f'),
  specularIntensity: 1.3,
});

const seeds = new THREE.InstancedMesh(seedGeometry, seedMaterial, SEED_COUNT);
seeds.castShadow = !mobile;
seeds.receiveShadow = true;
seeds.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
scene.add(seeds);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(18, 12),
  new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.09 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -5.2;
floor.receiveShadow = true;
scene.add(floor);

const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
world.allowSleep = true;
world.broadphase = new CANNON.SAPBroadphase(world);
world.defaultContactMaterial.friction = 0.22;
world.defaultContactMaterial.restitution = 0.24;

const groundMaterial = new CANNON.Material('ground');
const seedPhysicsMaterial = new CANNON.Material('seed');
world.addContactMaterial(new CANNON.ContactMaterial(seedPhysicsMaterial, groundMaterial, {
  friction: 0.22,
  restitution: 0.25,
}));

const ground = new CANNON.Body({ mass: 0, material: groundMaterial });
ground.addShape(new CANNON.Plane());
ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
ground.position.set(0, -5.15, 0);
world.addBody(ground);

const wallShape = new CANNON.Box(new CANNON.Vec3(0.2, 8, 4.5));
world.addBody(new CANNON.Body({ mass: 0, shape: wallShape, position: new CANNON.Vec3(-6.2, 0, 0) }));
world.addBody(new CANNON.Body({ mass: 0, shape: wallShape, position: new CANNON.Vec3(6.2, 0, 0) }));

const bodies = [];
const initialStates = [];
const random = mulberry32(20260805);

for (let i = 0; i < SEED_COUNT; i += 1) {
  const radius = 0.18 + random() * 0.055;
  const body = new CANNON.Body({
    mass: 0.018 + random() * 0.012,
    material: seedPhysicsMaterial,
    linearDamping: 0.015,
    angularDamping: 0.035,
    allowSleep: true,
  });

  body.addShape(new CANNON.Sphere(radius));
  const delayBand = Math.floor(i / 11);
  body.position.set(-5.2 + random() * 10.4, 5.4 + delayBand * 0.48 + random() * 2.3, -1.9 + random() * 3.8);
  body.velocity.set((random() - 0.5) * 0.6, -0.15 - random() * 0.45, (random() - 0.5) * 0.34);
  body.angularVelocity.set((random() - 0.5) * 7, (random() - 0.5) * 7, (random() - 0.5) * 7);
  body.quaternion.setFromEuler(random() * Math.PI, random() * Math.PI, random() * Math.PI);
  world.addBody(body);
  bodies.push(body);
  initialStates.push({
    position: body.position.clone(),
    velocity: body.velocity.clone(),
    angularVelocity: body.angularVelocity.clone(),
    quaternion: body.quaternion.clone(),
    scale: 0.82 + random() * 0.55,
  });
}

const dummy = new THREE.Object3D();
let simulatedTime = 0;

function resetWorld() {
  bodies.forEach((body, index) => {
    const initial = initialStates[index];
    body.position.copy(initial.position);
    body.velocity.copy(initial.velocity);
    body.angularVelocity.copy(initial.angularVelocity);
    body.quaternion.copy(initial.quaternion);
    body.force.setZero();
    body.torque.setZero();
    body.wakeUp();
  });
  simulatedTime = 0;
}

function simulateTo(targetTime) {
  if (targetTime < simulatedTime - 0.05) resetWorld();
  let safety = 0;
  while (simulatedTime + FIXED_STEP <= targetTime && safety < 600) {
    world.step(FIXED_STEP);
    simulatedTime += FIXED_STEP;
    safety += 1;
  }
}

function updateInstances() {
  bodies.forEach((body, index) => {
    const state = initialStates[index];
    dummy.position.set(body.position.x, body.position.y, body.position.z);
    dummy.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
    dummy.scale.setScalar(state.scale);
    dummy.updateMatrix();
    seeds.setMatrixAt(index, dummy.matrix);
  });
  seeds.instanceMatrix.needsUpdate = true;
}

function getScrollProgress() {
  const rect = section.getBoundingClientRect();
  const scrollable = section.offsetHeight - window.innerHeight;
  return scrollable <= 0 ? 0 : THREE.MathUtils.clamp(-rect.top / scrollable, 0, 1);
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function render() {
  const progress = getScrollProgress();
  const eased = progress * progress * (3 - 2 * progress);
  simulateTo(eased * SIM_DURATION);
  camera.position.x = Math.sin(progress * Math.PI) * 0.2;
  camera.position.y = 0.45 - progress * 0.18;
  camera.lookAt(0, -0.4, 0);
  updateInstances();
  if (heroCopy) {
    const fade = THREE.MathUtils.clamp(1 - progress * 3.2, 0, 1);
    heroCopy.style.opacity = String(fade);
    heroCopy.style.transform = `translate3d(0, ${progress * -28}px, 0)`;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

window.addEventListener('resize', resize);
resize();
resetWorld();
render();


loadingMark.textContent = 'SCROLL';
loadingMark.classList.add('is-ready');

const menuButton = document.querySelector('#menu-button');
const nav = document.querySelector('#primary-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('nav-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('.menu-icon')?.classList.toggle('is-open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('nav-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.querySelector('.menu-icon')?.classList.remove('is-open');
}));

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.firstChild.textContent = 'Request received ';
  status.hidden = false;
});
