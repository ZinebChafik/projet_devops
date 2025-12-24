import { Component, AfterViewInit, ElementRef, Renderer2, OnDestroy, HostListener } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';
import Letterize from 'letterizejs';
import anime from 'animejs';

@Component({
  selector: 'app-country',
  imports: [NavbarComponent, RouterModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements AfterViewInit, OnDestroy {
  productId: string | null = null;
  country: any;
  private animatedElements = new Set<HTMLElement>();
  private scrollListener!: () => void;

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.initAOS();
    this.fetching();
  }

  ngAfterViewInit(): void {
    this.setupScrollListener();
    // Removed direct call to setupSecondAnimation here
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private initAOS(): void {
    AOS.init({
      duration: 1000,
      offset: 200,
      once: true
    });
  }

  async fetching() {
    try {
      const response = await fetch(`http://localhost:8000/views/${this.productId}/`);
      this.country = await response.json();
      setTimeout(() => {
        AOS.refreshHard();
        this.checkElementsVisibility();
      }, 900);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  }

  private setupScrollListener(): void {
    this.scrollListener = () => this.checkElementsVisibility();
    window.addEventListener('scroll', this.scrollListener);
    this.checkElementsVisibility();
  }

  private checkElementsVisibility(): void {
    this.checkAndAnimateElement('#country-name', this.animateCountryName.bind(this));
    this.checkAndAnimateElement('.ml2', this.animateMl2.bind(this));
    this.checkAndAnimateElement('.ml3', this.animateMl2.bind(this));
  }

  private checkAndAnimateElement(selector: string, animationFn: (element: HTMLElement) => void): void {
    const element = this.el.nativeElement.querySelector(selector);
    if (!element || this.animatedElements.has(element)) return;

    if (this.isElementVisible(element)) {
      animationFn(element);
      this.animatedElements.add(element);
    }
  }

  private isElementVisible(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (
      rect.top <= windowHeight * 0.8 &&
      rect.bottom >= 0
    );
  }

  private animateCountryName(element: HTMLElement): void {
    const letterize = new Letterize({ targets: element });
    anime.timeline({
      targets: letterize.listAll,
      loop: false
    }).add({
      translateY: [-30, 0],
      opacity: [0, 1],
      delay: anime.stagger(120),
      easing: 'easeOutExpo',
      duration: 750
    });
  }

  private animateMl2(element: HTMLElement): void {
    const letterize = new Letterize({ targets: element });
    anime.timeline({
      targets: letterize.listAll,
      loop: false
    }).add({
      scale: [4, 1],
      opacity: [0, 1],
      delay: anime.stagger(120),
      easing: 'easeOutExpo',
      duration: 950
    });
  }

  private setupSecondAnimation(element: HTMLElement): void {
    const textWrapper = element.querySelector('.home-letters');
    if (!textWrapper?.textContent) return;

    // Split text into characters
    const letters = textWrapper.textContent.split('');
    textWrapper.innerHTML = '';
    
    letters.forEach((letter: string) => {
      const span = this.renderer.createElement('span');
      span.className = 'home-letter';
      span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
      this.renderer.appendChild(textWrapper, span);
    });

    // Create animation timeline
    anime.timeline({ loop: false })
      .add({
        targets: '.home-heading-animation .home-letter',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el, i) => 50 * i,
        easing: 'easeOutExpo'
      })
      .add({
        targets: element,
        opacity: [1, 0],
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });
  }
}