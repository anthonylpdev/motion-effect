import './style.scss'
import {
  Clock,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  DoubleSide,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import vs from './glsl/vert.glsl';
import fs from './glsl/frag.glsl';

class Base {
  constructor() {
    this.clock = new Clock();
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 1000,
    );
    this.renderer = new WebGLRenderer({alpha: true});
    this.geometry = new PlaneGeometry(0.4, 0.6, 16, 16);
    this.material = new ShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: new TextureLoader().load('src/img/car.jpg') },
      },
      // wireframe: true,
      side: DoubleSide
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
    this.init();
  }

  init() {
    this.resize();
    this.camera.position.z = 1;
    this.scene.add(this.mesh);
    this.animate();
    document.body.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    this.controls.update();
  }

  resize() {
    let h = window.innerHeight;
    let w = window.innerWidth;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}

let base = new Base();
