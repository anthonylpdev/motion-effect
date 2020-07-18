import './style.scss';
import {
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  PlaneGeometry,
  ShaderMaterial,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import vs from './glsl/vert.glsl';
import fs from './glsl/frag.glsl';

class Base {
  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 1000,
    );
    this.renderer = new WebGLRenderer({alpha: true});
    this.geometry = new PlaneGeometry(0.4, 0.6, 16, 16);
    this.material = new ShaderMaterial({
      vs,
      fs,
      uniforms: {
        uTime: { value: 0.0 }
      },
      wireframe: true,
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
    this.init();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.add(this.mesh);
    this.camera.position.z = 1;
    this.animate();
    document.body.appendChild(this.renderer.domElement);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }
}

let base = new Base();
