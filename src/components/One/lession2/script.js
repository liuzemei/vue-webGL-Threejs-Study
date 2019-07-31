import * as THREE from 'three';

let ThreeObject = function () {
    this.scene, this.renderer, this.camera, this.light,
        this.width, this.height;
}
ThreeObject.prototype.initThree = function () {
    let dom = document.getElementById('canvas-frame')
    this.width = dom.clientWidth;
    this.height = dom.clientHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true }); // 抗锯齿模式
    this.renderer.setSize(this.width, this.height);
    dom.appendChild(this.renderer.domElement);
    this.renderer.setClearColor('white', 1);
}

ThreeObject.prototype.initCamera = function () {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 1000;
    // this.camera.up.x = 0;
    // this.camera.up.y = 0;
    // this.camera.up.z = 1;
    // this.camera.lookAt({ x: 0, y: 0, z: 0 });
}

ThreeObject.prototype.initScene = function () {
    this.scene = new THREE.Scene();
}

ThreeObject.prototype.initLight = function () {
    this.light = new THREE.DirectionalLight('#f00', 1);
    this.light.position.set(100, 100, 200);
    this.scene.add(this.light);
}

ThreeObject.prototype.initObject = function () {
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({ vertexColors: true });
    var color1 = new THREE.Color('#444'),
        color2 = new THREE.Color('#f00');

    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3(-100, 0, 100);
    var p2 = new THREE.Vector3(100, 0, -100);
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push(color1, color2);
    var line = new THREE.Line(geometry, material, THREE.LineSegments);
    this.scene.add(line);
}

ThreeObject.prototype.init = function () {
    this.initThree();
    this.initCamera();
    this.initScene();
    this.initLight();
    this.initObject();
    this.renderer.clear();
}




// 1. 加载场景
var scene = new THREE.Scene();
// 2. 加载相机(透视相机)
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
// 3. 加载渲染器 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);// 设置 渲染器大小
renderer.setClearColor('white', 1); // 设置整个渲染器的背景颜色
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
    cube.rotation.x += Math.random() - 0.5 > 0 ? 0.02 : 0.01;
    cube.rotation.y += Math.random() - 0.5 > 0 ? 0.02 : 0.01;
    cube.rotation.z += Math.random() - 0.5 > 0 ? 0.02 : 0.01;
    renderer.render(scene, camera);
}

var timer;
export default {
    mounted() {
        // this.$refs.container.appendChild(renderer.domElement);// 添加到dom上
        // render();
        let tmp = new ThreeObject();
        tmp.init();
    },
    destroyed() {
        cancelAnimationFrame(timer);
    },
}