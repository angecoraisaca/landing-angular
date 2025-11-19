import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  HostListener,
} from '@angular/core';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-escena3d',
  templateUrl: './escena3d.html',
  styleUrls: ['./escena3d.css'],
})
export class Escena3d implements AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer', { static: false })
  rendererContainer!: ElementRef<HTMLDivElement>;

  // Three.js Core
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private controls!: OrbitControls;

  // Animation
  private animationId: number | null = null;
  rotando = true;

  // ------------------------------
  // Ciclo de vida Angular
  // ------------------------------
  ngAfterViewInit(): void {
    this.initScene();
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  // ------------------------------
  // Responsive: Ajustar tamaño
  // ------------------------------
  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.camera || !this.renderer || !this.rendererContainer) return;

    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // ------------------------------
  // Inicializar escena
  // ------------------------------
  private initScene(): void {
    // Crear escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020617);

    // Dimensiones del contenedor
    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    // Cámara
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(2, 2, 4);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.shadowMap.enabled = true;

    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(5, 5, 5);
    directional.castShadow = true;
    this.scene.add(directional);

    // Cubo 3D
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.4,
      metalness: 0.2,
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.cube.castShadow = true;
    this.scene.add(this.cube);

    // Piso opcional
    const planeGeometry = new THREE.PlaneGeometry(6, 6);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.6;
    plane.receiveShadow = true;

    this.scene.add(plane);

    // Controles (mouse)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Render inicial
    this.renderer.render(this.scene, this.camera);
  }

  // ------------------------------
  // Animación
  // ------------------------------
  private startAnimation(): void {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      if (this.rotando) {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.015;
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  private stopAnimation(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  // ------------------------------
  // Métodos para botones desde HTML
  // ------------------------------
  toggleRotation(): void {
    this.rotando = !this.rotando;
  }

  cambiarColor(): void {
    if (!this.cube) return;

    const material = this.cube.material as THREE.MeshStandardMaterial;

    material.color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    );
  }
}
