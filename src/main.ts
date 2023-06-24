import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { addRandomStars } from "./lib/stars";

// Helpers when developing. Returns an update function that updates the helpers every frame
function helpers(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera): () => void {
	// Show a grid
	const gridHelper = new THREE.GridHelper(200, 50);
	scene.add(gridHelper);

	// Zoom, pan, ...
	const controls = new OrbitControls(camera, renderer.domElement);

	// Return an update function
	return () => {
		controls.update();
	};
}

// Everything to do with lights
function lights(scene: THREE.Scene) {
	const ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);
}

// Function that is being called on every frame
function animate(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, updateHelpers: () => void) {
	// Request next frame, looping this function
	requestAnimationFrame(() => animate(renderer, scene, camera, updateHelpers));

	// Update the objects
	// ...

	// Update the helpers and the renderer
	updateHelpers();
	renderer.render(scene, camera);
}

function main() {
	// Check if WebGL is available
	if (WebGL.isWebGLAvailable()) {
		// Scene
		const scene = new THREE.Scene();

		// Camera
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
		camera.position.z = 5;

		// Renderer
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		// Helpers
		const updateHelpers: () => void = helpers(renderer, scene, camera);

		// Adding objects to the scene
		lights(scene);
		addRandomStars(scene, 200);

		// Start animating
		animate(renderer, scene, camera, updateHelpers);

	// WebGL is not available, show an error page
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
}

main();
