import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-escena3d',
  standalone: true,
  templateUrl: './escena3d.html',
  styleUrls: ['./escena3d.css'],
})
export class Escena3d implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true })
  canvasContainer!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  private animationId: number | null = null;

  // modelo puede ser nulo hasta que cargue
  private modelo: THREE.Object3D | null = null;

  isRotating = true;

  private get isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.initScene();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.onWindowResize);
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  // ----------------- INICIALIZAR ESCENA -----------------

  private initScene(): void {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // Escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020617);

    // Cámara
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 2, 6);

    // Renderizador
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    // Controles
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 1, 0);

    // Luces
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    this.scene.add(dirLight);

    // Suelo
    const planeGeo = new THREE.PlaneGeometry(20, 20);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.9,
      metalness: 0.1,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    this.scene.add(plane);

    // ---------- Cargar camiseta.glb ----------
    const loader = new GLTFLoader();

    loader.load(

      'assets/modelos/camiseta.glb', // <--- CAMBIO APLICADO AQUÍ
      
      (gltf: GLTF) => {
        this.modelo = gltf.scene;

        this.modelo.position.set(0, 0.5, 0);
        this.modelo.scale.set(1.5, 1.5, 1.5);

        this.scene.add(this.modelo);
      },
      undefined,
      (error: unknown) => {
        console.error('Error cargando camiseta.glb', error);
      }
    );

    window.addEventListener('resize', this.onWindowResize);
  }

  private onWindowResize = () => {
    if (!this.isBrowser || !this.camera || !this.renderer) return;

    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  // ----------------- ANIMACIÓN -----------------

  private animate(): void {
    if (!this.renderer || !this.scene || !this.camera) return;

    this.animationId = requestAnimationFrame(() => this.animate());

    if (this.isRotating && this.modelo) {
      this.modelo.rotation.y += 0.01;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  // ----------------- BOTONES -----------------

  toggleRotacion(): void {
    this.isRotating = !this.isRotating;
  }

  detenerRotacion(): void {
    this.isRotating = false;
  }

  reanudarRotacion(): void {
    this.isRotating = true;
  }

  cambiarColor(): void {
    if (!this.modelo) return;

    const nuevoColor = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    );

    this.modelo.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material;

        if (Array.isArray(material)) {
          material.forEach((m) => {
            const stdMat = m as THREE.MeshStandardMaterial;
            if (stdMat.color) {
              stdMat.color = nuevoColor.clone();
            }
          });
        } else {
          const stdMat = material as THREE.MeshStandardMaterial;
          if (stdMat.color) {
            stdMat.color = nuevoColor.clone();
          }
        }
      }
    });
  }
}