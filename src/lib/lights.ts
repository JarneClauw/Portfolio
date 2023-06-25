import * as THREE from "three";
import Config from "../config.json";

export default function lights(scene: THREE.Scene) {
    // Initialize the lights
    const config = Config.lights;
	const ambientLight = new THREE.AmbientLight(config.color);
	scene.add(ambientLight);

    // Return a function that updates the lights on every frame
    return () => {};
}
