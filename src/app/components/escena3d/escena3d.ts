import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  HostListener
} from '@angular/core';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-escena3d',
  templateUrl: './escena3d.html',
  styleUrls: ['./escena3d.css']
})
export class Escena3d implements AfterViewInit, OnDestroy {

  @ViewChild('rendererContainer', { static: false })
  rendererContainer!: ElementRef<HTMLDivElement>;

  // Three.js
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private controls!: OrbitControls;

  // Animación
  private animationId: number | null = null;
  rotando = true;

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

  // Redimensionar al cambiar tamaño de ventana
  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (!this.camera || !this.renderer || !this.rendererContainer) return;

    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private initScene(): void {
    // 1. Escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020617);

    // 2. Cámara
    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;
    const aspectRatio = width / height;

    this.camera = new THREE.PerspectiveCamera(
      60,            // campo de visión
      aspectRatio,   // aspect ratio
      0.1,           // plano cercano
      1000           // plano lejano
    );
    this.camera.position.set(2, 2, 4);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.shadowMap.enabled = true;

    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // 4. Luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    // 5. Luz direccional
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 5, 5);
    directional.castShadow = true;
    this.scene.add(directional);

    // 6. Cubo
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.4,
      metalness: 0.2
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.castShadow = true;
    this.cube.receiveShadow = true;
    this.scene.add(this.cube);

    // 7. Piso opcional
    const planeGeometry = new THREE.PlaneGeometry(6, 6);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
      metalness: 0
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.6;
    plane.receiveShadow = true;
    this.scene.add(plane);

    // 8. OrbitControls para rotar con el mouse
    this.controls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.8;
    this.controls.zoomSpeed = 0.8;

    // 9. Render inicial
    this.renderer.render(this.scene, this.camera);
  }

  private startAnimation(): void {
    const animate = () => {
      // Guardar id para poder detenerlo
      this.animationId = requestAnimationFrame(animate);

      if (this.rotando && this.cube) {
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

  // Métodos llamados desde el HTML
  toggleRotation(): void {
    this.rotando = !this.rotando;
  }

  cambiarColor(): void {
    if (!this.cube) return;

    const material = this.cube.material as THREE.MeshStandardMaterial;
    // Color aleatorio
    const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    material.color = randomColor;
  }
}