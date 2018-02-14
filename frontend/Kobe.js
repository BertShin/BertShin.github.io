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
let backLight;
let controls;
let floor;
let size;
let divisions;
let gridhelper;
let axishelper;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
let wireFrameBool = false;

// Kobe
let head;
let mane;
let mane2;
let mane3;
let mane4;
let endMane;
let nose;
let nostril;
let face;


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, (WIDTH / HEIGHT), .1, 2000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio);
  controls = new OrbitControls( camera );
  camera.position.set(0, 0, 0);
  camera.position.z = 20;
  camera.position.y = 0;
  controls.update();
  // world = document.getElementById('world');
  // world = document.body.appendChild(renderer.domElement);
  // world.appendChild(renderer.domElement);

  // ADD EventListeners and other domElements;
  document.body.appendChild(renderer.domElement);
}

function createHelperGrid() {
  size = 20;
  divisions = 20;
  gridhelper = new THREE.GridHelper(size, divisions);
  axishelper = new THREE.AxesHelper(20);
  scene.add( gridhelper );
  scene.add( axishelper );
}

function createFloor() {
  let plane = new THREE.PlaneBufferGeometry(1000, 500);
  let material = new THREE.MeshPhongMaterial({ color: 0xffffff});
  floor = new THREE.Mesh(plane, material);

  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -10;
  floor.receiveShadow = true;

  scene.add( floor );
}


function createLights() {
  hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .5);

  shadowLighting = new THREE.DirectionalLight(0xffffff, .7);
  shadowLighting.position.set(50, 50, 50);
  shadowLighting.castShadow = true;
  shadowLighting.shadowDarkness = .5;

  backLight = new THREE.DirectionalLight(0xffffff, .7);
  backLight.position.set(-50, 50, 50);
  backLight.shadowDarkness = .1;
  backLight.castShadow = true;

  scene.add(backLight);
  scene.add(hemLight);
  scene.add(shadowLighting);
}

function createMane() {
  let geometry = new THREE.BoxGeometry(10, 10, 1);
  let material = new THREE.MeshPhongMaterial({
    color: 0xffffff, wireframe: wireFrameBool
  });
  mane = new THREE.Mesh(geometry, material);
  mane2 = new THREE.Mesh(geometry, material);
  mane3 = new THREE.Mesh(geometry, material);
  mane4 = new THREE.Mesh(geometry, material);

  mane.position.y = 1;
  mane.position.z = -1;
  mane.rotation.z = .8;

  mane2.position.y = 1;
  mane2.position.z = -1.1;
  mane2.rotation.z = 0;

  mane3.position.y = 1;
  mane3.position.z = -1.2;
  mane3.rotation.z = .35;

  mane4.position.y = 1;
  mane4.position.z = -1.2;
  mane4.rotation.z = -.35;

  // End of the mane //
  let geometry1 = new THREE.ConeGeometry(3, 4, 3);
  let material1 = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: wireFrameBool
    });

  endMane = new THREE.Mesh( geometry1, material1);
  endMane.position.y = -6;
  endMane.position.z = -1;

  endMane.rotation.x = -.5;
  endMane.rotation.y = 1.05;
  endMane.rotation.z = 3.15;

}

function createNose() {
  // (radiusTop, radiusBottom, height, radialSegments);
  let geometry = new THREE.CylinderGeometry(1, 1.5, 3);
  let material = new THREE.MeshPhongMaterial({
    color: 0xffffff, wireframe: wireFrameBool
  });
  nose = new THREE.Mesh(geometry, material);
  nose.rotation.x = 1.5;
  nose.position.z = 4.1;
  nose.position.y = -.3;

  //Nostril
  let geometry1 = new THREE.SphereGeometry(.9, 6, 6);
  let material1 = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: wireFrameBool
  });

  nostril = new THREE.Mesh(geometry1, material1);

  nostril.position.z = 5.6;
  nostril.position.y = -.1;
}


//  HEAD //
function createFace() {
  let geometry = new THREE.BoxGeometry(5, 6, 4);
  let material = new THREE.MeshPhongMaterial({
    color: 0xffffff, wireframe: wireFrameBool
  });
  face = new THREE.Mesh(geometry, material);
  face.position.x = 0;
  face.position.y = 1;
  face.position.z = 1;
}

function createEars() {

}

function createHead() {
  // Grouping all Geometries
  head = new THREE.Object3D();
  head.add( face );
  head.add( mane );
  head.add( mane2 );
  head.add( mane3 );
  head.add( mane4 );
  head.add( endMane );
  head.add( nose );
  head.add( nostril );

  head.traverse( function ( meshes) {
    if (meshes instanceof THREE.Mesh) {
      meshes.castShadow = true;
      meshes.receiveShadow = true;
    }
  });

  console.log(head.children);

  head.position.y = 2;
  scene.add( head );
}

function animateLoop () {
  requestAnimationFrame( animateLoop );
  // head.rotation.x += .05;
  head.rotation.y += .01;
  // head.rotation.z += .04;
  renderer.shadowMap.enabled = true;
  renderer.render( scene, camera );
}


init();
createLights();
createFloor();
createMane();
createNose();
createFace();
// createHelperGrid();
createHead();
animateLoop();
