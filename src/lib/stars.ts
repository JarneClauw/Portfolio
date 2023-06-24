import * as THREE from "three";
import Config from "../config.json";

const config = Config.stars;

// Adding a star to space
async function addRandomStar(scene: THREE.Scene) {
    const geometry = new THREE.SphereGeometry(config.radius, config.segments, config.segments);
    const material = new THREE.MeshStandardMaterial({color: config.color});
    const star = new THREE.Mesh(geometry, material);

    // Generating a random location and rotation
    const [x,y,z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(config.floatSpread));
    star.position.set(x,y,z);

    // Adding the object to the scene
    scene.add(star);
}

// Adding a number of stars to space
export function addRandomStars(scene: THREE.Scene) {
    Array(config.count).fill(0).forEach(async () => await addRandomStar(scene));
}
