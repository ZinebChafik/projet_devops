import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'
import { GlobeComponent } from '../globe/globe.component'
import anime from 'animejs';
@Component({
  selector: 'app-home',
  imports: [NavbarComponent,GlobeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupAnimation();
    this.setupSecondAnimation();
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

setupAnimation(): void {
    const textWrapper: HTMLElement | null = document.querySelector('.ml1 .letters');

    if (textWrapper && textWrapper.textContent) {
      // Wrap each letter in a <span>
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

      // Create Anime.js timeline
      anime.timeline({  })
        .add({
          targets: '.ml1 .letter',
          scale: [0.3, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 600,
          delay: (el, i) => 70 * (i + 1)
        })
        .add({
          targets: '.ml1 .line',
          scaleX: [0, 1],
          opacity: [0.5, 1],
          easing: "easeOutExpo",
          duration: 700,
          offset: '-=875',
          delay: (el, i, l) => 80 * (l - i)
        })
        .add({
          targets: '.ml1',
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000
        });
    }
  }
setupSecondAnimation(): void {
  const textWrapper = this.el.nativeElement.querySelector('.home-heading-animation .home-letters');
  
  if (textWrapper && textWrapper.textContent) {
    // Split text into characters while preserving word spacing
    const letters = textWrapper.textContent.split('');
    textWrapper.innerHTML = '';
    
    letters.forEach((letter: string) => {
      const span = this.renderer.createElement('span');
      span.className = 'home-letter';
      
      // Handle spaces with non-breaking space entity
      if (letter === ' ') {
        span.innerHTML = '&nbsp;'; // Preserve spaces between words
      } else {
        span.textContent = letter;
      }
      
      this.renderer.appendChild(textWrapper, span);
    });

    // Add space between words animation
    anime.timeline({ loop: false })
      .add({
        targets: '.home-heading-animation .home-letter',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el, i) => 50 * i
      })
      .add({
        targets: '.home-heading-animation',
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });
  }
}
}
