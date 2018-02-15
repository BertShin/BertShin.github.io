import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

// THREE.js Necessities
let world;
let scene;
let camera;
let renderer;
let hemLight;
let shadowLighting;
let pointLight;
let backLighting;
let controls;
let floor;
let size;
let divisions;
let gridhelper;
let axishelper;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
let halfWindowX = WIDTH/2;
let halfWindowY = HEIGHT/2;
let wireFrameBool = false;
let mousePosition = {
  x: 0,
  y: 0
};

// Kobe
// DECIDED COLOR: 0xb8b8b8
let oColor = 0xb8b8b8;
let kobe;
let head;
let mane;
let mane2;
let mane3;
let mane4;
let endMane;
let nose;
let nostril;
let face;
let ear1;
let ear2;
let inner1;
let inner2;

function rule3(v, vmin, vmax, tmin, tmax) {
  let nv = Math.max(Math.min(v, vmax), vmin);
  let dv = vmax - vmin;
  let pc = (nv - vmin) / dv;
  let dt = tmax - tmin;
  let tv = tmin + (pc * dt);

  return tv;
}

function handleMouseMovement(e) {
  mousePosition = {
    x: e.clientX,
    y: e.clientY
  };
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, (WIDTH / HEIGHT), .1, 2000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio);
  controls = new OrbitControls(camera);
  camera.position.set(0, 5, 15);
  controls.update();

  // ADD EventListeners and other domElements;
  document.body.appendChild(renderer.domElement);
  document.addEventListener("mousemove", handleMouseMovement, false);
}

function createHelperGrid() {
  size = 20;
  divisions = 20;
  gridhelper = new THREE.GridHelper(size, divisions);
  axishelper = new THREE.AxesHelper(20);
  scene.add(gridhelper);
  scene.add(axishelper);
}

function createFloor() {
  let plane = new THREE.PlaneBufferGeometry(1000, 500);
  let material = new THREE.MeshPhongMaterial({ color: 0xf0f0f0 });
  floor = new THREE.Mesh(plane, material);

  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -10;
  floor.receiveShadow = true;

  scene.add(floor);
}


function createLights() {
  hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .5);

  backLighting = new THREE.DirectionalLight(0xffffff, .7);
  backLighting.position.set(-50, 50, 50);
  backLighting.castShadow = true;

  shadowLighting = new THREE.DirectionalLight(0xffffff, .7);
  shadowLighting.position.set(50, 50, 50);
  shadowLighting.castShadow = true;

  scene.add(hemLight);
  scene.add(backLighting);
  scene.add(shadowLighting);
}



// KOBE // 


class Kobe {
  constructor() {
    this.head = new THREE.Object3D();

    // Mane //
    let maneGeometry = new THREE.BoxGeometry(10, 10, 1);
    let maneMaterial = new THREE.MeshPhongMaterial({
      color: oColor, wireframe: wireFrameBool
    });
    mane = new THREE.Mesh(maneGeometry, maneMaterial);
    mane2 = new THREE.Mesh(maneGeometry, maneMaterial);
    mane3 = new THREE.Mesh(maneGeometry, maneMaterial);
    mane4 = new THREE.Mesh(maneGeometry, maneMaterial);

    mane.position.y = 1;
    mane.position.z = -1;
    mane.rotation.z = .8;

    mane2.position.y = 1;
    mane2.position.z = -1.2;
    mane2.rotation.z = 0;

    mane3.position.y = 1;
    mane3.position.z = -1.6;
    mane3.rotation.z = .35;

    mane4.position.y = 1;
    mane4.position.z = -1.8;
    mane4.rotation.z = -.35;

    // Tip of the mane //
    let endManeGeometry1 = new THREE.ConeGeometry(3, 4, 3);
    let endManeMaterial1 = new THREE.MeshPhongMaterial({
      color: oColor,
      wireframe: wireFrameBool
    });

    endMane = new THREE.Mesh(endManeGeometry1, endManeMaterial1);
    endMane.position.y = -6;
    endMane.position.z = -1;

    endMane.rotation.x = -.5;
    endMane.rotation.y = 1.05;
    endMane.rotation.z = 3.15;

    // NOSE //
    // (radiusTop, radiusBottom, height, radialSegments);
    let noseGeometry = new THREE.CylinderGeometry(1, 1.5, 3);
    let noseMaterial = new THREE.MeshPhongMaterial({
      color: oColor, wireframe: wireFrameBool
    });
    nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.rotation.x = 1.5;
    nose.position.z = 4.1;
    nose.position.y = -.3;

    // NOSTRIL //
    let nosGeometry1 = new THREE.SphereGeometry(.8, 6, 6);
    let nosMaterial1 = new THREE.MeshPhongMaterial({
      color: 0x000000,
      wireframe: wireFrameBool
    });

    nostril = new THREE.Mesh(nosGeometry1, nosMaterial1);

    nostril.position.z = 5.6;
    nostril.position.y = -.1;

    // FACE //
    let faceGeometry = new THREE.BoxGeometry(5, 6, 4);
    let faceMaterial = new THREE.MeshPhongMaterial({
      color: oColor, wireframe: wireFrameBool
    });
    face = new THREE.Mesh(faceGeometry, faceMaterial);
    face.position.x = 0;
    face.position.y = 1;
    face.position.z = 1;

    // EARS //
    // (radius, height, radialsegments, heightsegments)
    let earGeometry = new THREE.ConeGeometry(.8, 2.6, 5);
    let earMaterial = new THREE.MeshPhongMaterial({
      color: oColor,
      wireframe: wireFrameBool
    });

    let innerGeo = new THREE.ConeGeometry(.35, 2.1, 3);
    let innerMat = new THREE.MeshPhongMaterial({
      color: 0xff99cc,
      wireframe: false
    });

    ear1 = new THREE.Mesh(earGeometry, earMaterial);
    ear2 = new THREE.Mesh(earGeometry, earMaterial);

    inner1 = new THREE.Mesh(innerGeo, innerMat);
    inner2 = new THREE.Mesh(innerGeo, innerMat);

    ear1.position.x = 2.7;
    ear1.position.y = 5.5;
    ear1.position.z = .5;

    ear1.rotation.x = .45;
    ear1.rotation.y = .64;
    ear1.rotation.z = -.57;

    ear2.position.x = -2.7;
    ear2.position.y = 5.5;
    ear2.position.z = .5;

    ear2.rotation.x = -.45;
    ear2.rotation.y = .64;
    ear2.rotation.z = .57;

    inner1.position.x = 2.5;
    inner1.position.y = 5.3;
    inner1.position.z = .85;

    inner1.rotation.x = .45;
    inner1.rotation.y = .9;
    inner1.rotation.z = -.7;

    inner2.position.x = -2.5;
    inner2.position.y = 5.35;
    inner2.position.z = .89;

    inner2.rotation.x = .35;
    inner2.rotation.y = -.9;
    inner2.rotation.z = .7;


    this.head.add(face);
    this.head.add(mane);
    this.head.add(mane2);
    this.head.add(mane3);
    this.head.add(mane4);
    this.head.add(endMane);
    this.head.add(nose);
    this.head.add(nostril);
    this.head.add(ear1);
    this.head.add(ear2);
    this.head.add(inner1);
    this.head.add(inner2);

    this.head.traverse(function (meshes) {
      if (meshes instanceof THREE.Mesh) {
        meshes.castShadow = true;
        meshes.receiveShadow = true;
      }
    });

    this.head.position.y = 2;
    this.head.rotation.x = .1;
    scene.add( this.head );
    this.updateHead = this.updateHead.bind(this);
    this.track = this.track.bind(this);
  }

  updateHead(speed) {
    this.head.rotation.y += (this.head.headRotationY - this.head.rotation.y) / speed;
    this.head.rotation.x += (this.head.headRotationX - this.head.rotation.x) / speed;


  }

  track(xPos, yPos) {
    this.head.headRotationY = rule3(xPos, 0, 100, -Math.PI / 4, Math.PI / 4);
    this.head.headRotationX = rule3(yPos, 0, 100, -Math.PI / 4, Math.PI / 4);
    this.updateHead(10);
  }

}

const createKobe = () => {
  kobe = new Kobe();
};

const animateLoop = () => {
  let xPos = (mousePosition.x - halfWindowX);
  let yPos = (mousePosition.y - halfWindowY);

  // console.log(kobe);
  // kobe.track(xPos, yPos);
  requestAnimationFrame(animateLoop);
  // head.rotation.x += .1;
  // kobe.rotation.y += .01;
  // head.rotation.z += .1;
  renderer.shadowMap.enabled = true;
  renderer.render(scene, camera);
};


init();
createKobe();
createLights();
createFloor();
// createHelperGrid();
animateLoop();