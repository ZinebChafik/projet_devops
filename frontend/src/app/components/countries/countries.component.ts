
import { Component ,OnInit,  ViewEncapsulation ,AfterViewInit, ElementRef, Renderer2,ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'
import { CommonModule } from '@angular/common'
import { ActivatedRoute,RouterModule } from '@angular/router';
import * as AOS from 'aos';
import anime from 'animejs';


@Component({
  selector: 'app-countries',
  imports: [  NavbarComponent,CommonModule,RouterModule ],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css', // Corrected to "styleUrls"
  encapsulation: ViewEncapsulation.None
})
export class CountriesComponent implements OnInit {
  title = 'angular-app';
  continents: any;
  Continent_ID:any;
  description:any;
  name:any;
  ngAfterViewInit(): void {
    this.initAOS();
  }

  async fetching() {
    try {
      const response = await fetch('http://localhost:8000/continent_listing/'+this.Continent_ID+'/');
      let res = await response.json();
      this.name = res.name;
      this.description=res.description;
      this.continents = res.posts;
      
      // Wait for Angular's change detection
      setTimeout(() => {
        this.initAnime();
        this.cdr.detectChanges();
      }, 0);
      
    } catch (error) {
      console.error('Error fetching continents:', error);
    }
  }

  // Add ChangeDetectorRef to constructor
  constructor(
    private route: ActivatedRoute,
    private el: ElementRef, 
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}



    private initAOS(): void {
    AOS.init({
      duration: 1000,
      offset: 200,
      //once:true,
    });
  }
scrollTo(fragment: string): any {
  const element = document.getElementById(fragment);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
    // Prevent default anchor behavior
    return false;
  }
}

  ngOnInit(): void {
    this.Continent_ID = this.route.snapshot.paramMap.get('id');

    // Or subscribe to the route parameter changes

    this.fetching();
    this.initAOS();
  }
text_truncate = function(str: any, length: any, ending: any): string {
  // If the length parameter is not provided, set it to 100 characters
  if (length == null) {
    length = 100;
  }
  // If the ending parameter is not provided, set it to '...'
  if (ending == null) {
    ending = '...';
  }

  // Remove all HTML tags using a regular expression
  const plainText = str.replace(/<[^>]*>/g, '');

  // Check if the length of the plain text exceeds the specified length
  if (plainText.length > length) {
    // If yes, truncate the plain text to length - ending.length characters and append the ending
    return plainText.substring(0, length - ending.length) + ending;
  } else {
    // If no, return the original plain text
    return plainText;
  }
};





private initAnime(): void {
  setTimeout(() => {
    this.initTextAnimation('.african', 40, 500);
    this.initTextAnimation('.countries_you', 40, 450);
    this.initTextAnimation('.ml13', 40, 500);
    this.initTextAnimation('.Visit', 40, 500);
    this.initializeAnimation('.ml10')
  }, 300); // Increased delay for data rendering
}
private initTextAnimation(selector: string, translateX: number, initialDelay: number): void {
  const textWrapper: HTMLElement | null = this.el.nativeElement.querySelector(selector);

  if (textWrapper && textWrapper.textContent) {
    const isShouldElement = textWrapper.classList.contains('should');

    // Wrap each letter in a span
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, (match: string) => {
      // Fix the typo: use "!important" instead of "limportant"
      const colorStyle = isShouldElement ? 'style="color: black !important;"' : '';
      return `<span class="letter" ${colorStyle}>${match}</span>`;
    });

    // Force black color for "should" elements
    if (isShouldElement) {
      const letters = textWrapper.querySelectorAll('.letter');
      letters.forEach((letter: Element) => {
        // Cast Element to HTMLElement
        const htmlLetter = letter as HTMLElement;
        this.renderer.setStyle(htmlLetter, 'color', 'black');
      });
    }

    // Debug: Log the generated HTML
    console.log(`Generated HTML for ${selector}:`, textWrapper.innerHTML);

    // Initialize animation
    anime.timeline({  })
      .add({
        targets: `${selector} .letter`,
        translateY: [translateX, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 4000,
        delay: (el, i) => initialDelay + 40 * i,
        begin: () => {
          console.log(`Animation started for: ${selector}`);
        }
      })
     
  } else {
    console.error(`Element or text content not found for: ${selector}`);
  }
}


private initializeAnimation(selector:string): void {
    const textWrapper:HTMLElement = this.el.nativeElement.querySelector(selector);
    
    if (textWrapper && textWrapper.textContent) {
      // Wrap letters in spans
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, 
        "<span class='letter'>$&</span>"
      );

      // Create anime.js timeline
      anime.timeline({  })
        .add({
          targets: `${selector} .letter`,
          rotateY: [-90, 0],
          duration: 900,
          delay: (el, i) => 20 * i
        })
     
    }
  }

}


