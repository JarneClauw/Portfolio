import * as THREE from "three";

// Adding a star to space
async function addRandomStar(scene: THREE.Scene) {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);
    
    // Scaling the star
    const factor = 0.5;
    star.scale.set(factor, factor, factor);

    // Generating a random location and rotation
    const [x,y,z,rx,ry,rz] = Array(6).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    star.rotation.set(rx,ry,rz);

    // Adding the object to the scene
    scene.add(star);
}

// Adding a number of stars to space
export function addRandomStars(scene: THREE.Scene, n: number) {
    Array(n).fill(0).forEach(async () => await addRandomStar(scene));
}
