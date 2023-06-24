import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { addRandomStars } from "./lib/stars";
import Config from "./config.json";

// Helpers when developing. Returns an update function that updates the helpers every frame
function helpers(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera): () => void {
	const config = Config.helpers;
	
	// Show a grid
	const gridHelper = new THREE.GridHelper(config.gridSize, config.gridSegments);
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
	const config = Config.lights;
	const ambientLight = new THREE.AmbientLight(config.color);
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
		const camera = new THREE.PerspectiveCamera(Config.camera.fov, window.innerWidth/window.innerHeight, 0.1, 1000);
		camera.position.set(Config.camera.positionX, Config.camera.positionY, Config.camera.positionZ);

		// Renderer
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		// Helpers
		const updateHelpers: () => void = helpers(renderer, scene, camera);

		// Adding objects to the scene
		lights(scene);
		addRandomStars(scene);

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
