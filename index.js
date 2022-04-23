import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.shadowMap.enabled = true

renderer.render(scene, camera);

function addpartical() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addpartical);

// типа свет

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// это на всякий случай

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);


// задник

const fuckTexture = new THREE.TextureLoader().load();
scene.background = fuckTexture;


const startTexture = new THREE.TextureLoader().load('techno.jpg')

const start = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: startTexture}));

scene.add(start);

const twoTexture = new THREE.TextureLoader().load('metro.jpg');

const two = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: twoTexture}));

scene.add(two);

two.position.z = 14;
two.position.x = 1;

start.position.z = -5;
start.position.x = 3;

// анимация скролла

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;  
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}



document.body.onscroll = moveCamera;
moveCamera();

// это короче анимация

function animate() {
  requestAnimationFrame(animate);

  start.rotation.y += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

AOS.init({
  disable: 'phone', 
  startEvent: 'DOMContentLoaded', 
  initClassName: 'aos-init', 
  animatedClassName: 'aos-animate', 
  useClassNames: false, 
  disableMutationObserver: false,
  debounceDelay: 50, 
  throttleDelay: 99, 

  offset: 100, 
  delay: 0, 
  duration: 800, 
  easing: 'ease', 
  once: false, 
  mirror: false, 
  anchorPlacement: 'top-bottom', 
});


$(window).on("scroll touchmove", function() {
if ($(document).scrollTop() >= $("#one").position().top) {
$('body').css('background', $("#one").attr("data-color"));
};

if ($(document).scrollTop() > $("#two").position().top) {
    $('body').css('background', $("#two").attr("data-color"))
};

if ($(document).scrollTop() > $("#three").position().top) {

$('body').css('background', $("#three").attr("data-color"))
};

if ($(document).scrollTop() > $("#four").position().top) {

$('body').css('background', $("#four").attr("data-color"))
};

if ($(document).scrollTop() >= $("#five").position().top) {
$('body').css('background', $("#five").attr("data-color"))
};

});
