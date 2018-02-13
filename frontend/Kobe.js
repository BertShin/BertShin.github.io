import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

let scene;
let camera;
let renderer;
let world;
let mane;
let face;
let light;
let backLight;
let controls;
let size;
let divisions;
let gridhelper;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, (WIDTH / HEIGHT), 0.1, 2000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  controls = new OrbitControls( camera );
  camera.position.set(0, 0, 0);
  controls.update();
  // world = document.getElementById('world');
  // world = document.body.appendChild(renderer.domElement);
  // world.appendChild(renderer.domElement);
  document.body.appendChild(renderer.domElement);
}

function createHelperGrid() {
  size = 20;
  divisions = 20;
  gridhelper = new THREE.GridHelper(size, divisions);
  scene.add( gridhelper );
}

function createLights() {
  light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);

  // backLight = new THREE.DirectionalLight(0xffffff, .4);
  // backLight.position.set(-100, 200, 50);
  //
  // scene.add(backLight);
  scene.add(light);
}

function createMane() {
  let geometry = new THREE.BoxGeometry(10, 10, 2);
  let material = new THREE.MeshBasicMaterial({color: 0xD3D3D3});
  mane = new THREE.Mesh(geometry, material);
  mane.position.y = 1;
  scene.add( mane );
  camera.position.z = 20;
}

function createFace() {
  // (radiusTop, radiusBottom, height, radialSegments);
  let geometry = new THREE.CylinderGeometry(1, 2, 3.5);
  let material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3 });
  face = new THREE.Mesh(geometry, material);
  face.position.z = 5;
  scene.add( face );
}

function animateLoop () {
  requestAnimationFrame( animateLoop );
  mane.rotation.z = .8;
  face.rotation.x = 1.5;
  renderer.render( scene, camera );
}


init();
createLights();
createMane();
createFace();
createHelperGrid();
animateLoop();
