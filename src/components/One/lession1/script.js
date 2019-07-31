import * as THREE from 'three';
// 1. 加载场景
var scene = new THREE.Scene();
// 2. 加载相机(透视相机)
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
// 3. 加载渲染器 
var renderer = new THREE.WebGLRenderer();
// 设置 渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 4.1. 加载一个几何体
var geometry = new THREE.BoxGeometry(2, 2, 2);
// 4.2. 加载一个材质
var material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

// 4.3. 加载网格模型
var cube = new THREE.Mesh(geometry, material);

// 5. 将网格模型，添加到场景里去
scene.add(cube);

// 相机往屏幕外面移一点
camera.position.z = 5;

function render() {
    timer = requestAnimationFrame(render); // 当浏览器空闲时，会执行这个函数。
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    renderer.render(scene, camera);
}

var timer;
export default {
    mounted() {
        this.$refs.container.appendChild(renderer.domElement);// 添加到dom上
        render();
    },
    destroyed() {
        cancelAnimationFrame(timer);
    },
}