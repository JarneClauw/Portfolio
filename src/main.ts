import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import RandomStars from "./lib/stars";
import lights from "./lib/lights";
import Config from "./config.json";

// Initialize the necessary objects and functions
function init() {
	// Renderer
	const canvas = document.getElementById("canvas")!;
	const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(Config.camera.fov, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.set(Config.camera.positionX, Config.camera.positionY, Config.camera.positionZ);

	// Update the renderer and camera when the screen gets resized, also rerender the frame
	const updateRenderer = () => {
		const canvas = renderer.domElement;
		let width = canvas.clientWidth;
		let height = canvas.clientHeight;

		// Using HD-DPI can make the application heavier
		if (Config.renderer.useHDDPI) {
			const pixelRatio = window.devicePixelRatio;
			width *= pixelRatio | 0;
			width *= pixelRatio | 0
		}

		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			// Resize the renderer if the screen resizes
			renderer.setSize(width, height, false);

			// Update the camera resolution
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		// Render the frame
		renderer.render(scene, camera);
	};

	// Return the objects
	return {renderer, scene, camera, updateRenderer};
}

// Helpers when developing. Returns an update function that updates the helpers every frame
function helpers(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
	const config = Config.helpers;
	
	// Show a grid
	const gridHelper = new THREE.GridHelper(config.gridSize, config.gridSegments);
	scene.add(gridHelper);

	// Zoom, pan, rotate ...
	const controls = new OrbitControls(camera, renderer.domElement);

	// Return an update function
	const updateHelpers = () => {
		controls.update();
	};

	return {updateHelpers};
}

// Function that is being called on every frame
function animate(updateRenderer: () => void, updateHelpers: () => void, updateObjects: () => void) {
	// Request next frame, looping this function
	requestAnimationFrame(() => animate(updateRenderer, updateHelpers, updateObjects));

	// Update the objects
	updateObjects();

	// Update the application
	updateHelpers();
	updateRenderer();
}

function main() {
	// Check if WebGL is available
	if (WebGL.isWebGLAvailable()) {
		const {renderer, scene, camera, updateRenderer} = init();
		const {updateHelpers} = helpers(renderer, scene, camera);

		// Adding objects to the scene
		const updateLights = lights(scene);
		const updateStars = RandomStars(scene);

		const geom = new THREE.BoxGeometry(0.5,0.5,0.5,24,24,24);
		const material = new THREE.MeshStandardMaterial({color: 0xFF0000});
		const cube = new THREE.Mesh(geom, material);
		scene.add(cube);

		// Function to update the objects
		const updateObjects = () => {
			updateLights();
			updateStars();
		};

		// Start animating
		animate(updateRenderer, updateHelpers, updateObjects);

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
