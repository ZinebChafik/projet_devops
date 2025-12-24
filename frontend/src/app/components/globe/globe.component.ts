import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


interface ContinentData {
  name: string;
  url: string;
  lat: number;
  lon: number;
}

@Component({
  selector: 'app-globe',
  template: `
    <div #rendererContainer style="position: relative; background:black; width: 100%; height: 100%;">
      <div #labelContainer style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"></div>
    </div>
  `,
  styles: [
    ':host { display: block; height: 100%; }',
    'div[data-url] { pointer-events: auto !important; }'
  ],
})
export class GlobeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  @ViewChild('labelContainer', { static: true }) labelContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private globe!: THREE.Mesh;
  private controls!: OrbitControls;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private continentLabels: { 
    element: HTMLElement, 
    data: ContinentData 
  }[] = [];
  private animationFrameId: number | null = null;
getStarfield(numStars = 500): THREE.Points {
    function randomSpherePoint() {
      const radius = Math.random() * 25 + 25;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      return {
        pos: new THREE.Vector3(x, y, z),
        hue: 0.6,
        minDist: radius,
      };
    }

    const verts: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < numStars; i++) {
      const { pos, hue } = randomSpherePoint();
      const col = new THREE.Color().setHSL(hue, 0.2, Math.random());
      verts.push(pos.x, pos.y, pos.z);
      colors.push(col.r, col.g, col.b);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      fog: false,
    });

    return new THREE.Points(geo, mat);
  }


  private continentData: ContinentData[] = [
    { name: 'Africa', url: '/countries/1', lat: 10, lon: 160 },
    { name: 'Asia', url: '/countries/3', lat: 30, lon: 100 },
    { name: 'Europe', url: '/countries/2', lat: 50, lon: 190 },
    { name: 'North America', url: '/countries/9', lat: 40, lon: -80 },
    { name: 'South America', url: '/countries/10', lat: -10, lon: -120 },
    { name: 'Australia', url: '/countries/4', lat: -30, lon: 50 },
    { name: 'Antarctica', url: '/countries/8', lat: -90, lon: 0 },
  ];

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.addContinentLabels();
    this.animate();
    this.addEventListeners();
  }


  private initThreeJS(): void {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = null;

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.renderer.setClearColor(0xffffff, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    // Globe
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const globeTexture = new THREE.TextureLoader().load('earth2.jpg');
    const loader = new THREE.TextureLoader().load('sky.jpg')
    this.scene.background = new THREE.Color(0x000000);
    this.scene.add(this.getStarfield()) 



    const globeMaterial = new THREE.MeshStandardMaterial({ map: globeTexture });
    this.globe = new THREE.Mesh(globeGeometry, globeMaterial);
    this.scene.add(this.globe);

    // Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;
  }

  private addContinentLabels(): void {
    this.continentData.forEach(continent => {
      const phi = THREE.MathUtils.degToRad(90 - continent.lat);
      const theta = THREE.MathUtils.degToRad(continent.lon + 180);

      const position = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      );

      const label = document.createElement('div');
      label.textContent = continent.name;
      label.style.position = 'absolute';
      label.style.color = 'white';
      label.style.padding = '20px';
      label.style.fontSize="15px"
      label.style.cursor = 'pointer';
      label.style.zIndex = '100';
      label.style.fontFamily="Montserrat";

      // Store the continent data with the label
      this.continentLabels.push({ 
        element: label, 
        data: continent 
      });

      this.labelContainer.nativeElement.appendChild(label);
    });
  }

  private addEventListeners(): void {
    // Combine click handlers for labels and globe
    this.rendererContainer.nativeElement.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private handleClick(event: MouseEvent): void {
    // Check label clicks first
    const clickedLabel = this.continentLabels.find(labelObj => {
      const rect = labelObj.element.getBoundingClientRect();
      return (
        event.clientX >= rect.left && 
        event.clientX <= rect.right &&
        event.clientY >= rect.top && 
        event.clientY <= rect.bottom
      );
    });

    if (clickedLabel) {
      window.open(clickedLabel.data.url,"_self");
      return;
    }

    // Then check globe clicks²
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObject(this.globe);

    if (intersects.length > 0) {
      // Optional: Add globe-specific interaction if needed
      console.log('Globe clicked');
    }
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    this.updateLabelPositions();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private updateLabelPositions(): void {
    this.continentLabels.forEach(({ element, data }) => {
      const phi = THREE.MathUtils.degToRad(90 - data.lat);
      const theta = THREE.MathUtils.degToRad(data.lon + 180);

      const position = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      );

      const cameraDot = position.dot(this.camera.position.clone().normalize());
      position.project(this.camera);

      const x = (position.x * 0.5 + 0.5) * window.innerWidth;
      const y = -(position.y * 0.5 - 0.5) * window.innerHeight;

      const isOnScreen = 
        x >= 0 && x <= window.innerWidth && 
        y >= 0 && y <= window.innerHeight;

      if (cameraDot > 0 && isOnScreen) {
        element.style.display = 'block';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.transform = 'translate(-50%, -50%)';
      } else {
        element.style.display = 'none';
      }
    });
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.controls.dispose();
    this.renderer.dispose();
  }
}
