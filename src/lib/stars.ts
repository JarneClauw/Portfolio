import * as THREE from "three";
import Config from "../config.json";

export default function RandomStars(scene: THREE.Scene) {
    const config = Config.stars;

    // Make the geometry and material once
    const geometry = new THREE.SphereGeometry(config.radius, config.segments, config.segments);
    const material = new THREE.MeshStandardMaterial({color: config.color, emissive: 0xff0000, emissiveIntensity: 2});

    // Make a number of stars with the same geometry and material
    Array(config.count).fill(0).forEach(() => {
        const star = new THREE.Mesh(geometry, material);

        // Generating a random location and rotation
        const [x,y,z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(config.floatSpread));
        star.position.set(x,y,z);

        // Adding the object to the scene
        scene.add(star);
    });

    // Return a function to update the stars every frame
    return () => {};
}
