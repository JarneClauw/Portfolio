import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Function that is being called on every frame
function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.rotation.z += 0.01;

	renderer.render( scene, camera );
}

// Check if WebGL is available
if (WebGL.isWebGLAvailable()) {
	animate();
} else {
	const error = WebGL.getWebGLErrorMessage();
	
	let errorDiv = document.createElement("div");
	errorDiv.id = "error";
	const errorH1 = document.createElement("h1");
	errorH1.innerText = "Oops ...";
	errorDiv.appendChild(errorH1);
	errorDiv.appendChild(error);

	document.body.textContent = ""; // Remove render first
	document.body.appendChild(errorDiv);
}
