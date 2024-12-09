import { Component, inject } from '@angular/core';
import { RouterOutlet , RouterLink , RouterLinkActive } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { FormsModule } from '@angular/forms';
import { routeNames } from './app.routes';
import { Controller } from './services/controller.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    FooterComponent , 
    RouterLink, 
    RouterLinkActive,
    FormsModule , 
  ]

})

export class AppComponent {

  routeNames = routeNames;
  controller = inject(Controller);

  ngOnInit(): void {
    if (this.isBrowserEnvironment()) {
      this.applyFluidLayout();
      this.applyNavbarStyle();
    }
  }

  constructor(){
    this.controller.preparation();
  }

  

  private isBrowserEnvironment(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private applyFluidLayout(): void {
    const isFluid: boolean | null = JSON.parse(localStorage.getItem('isFluid') || 'null');
    if (isFluid) {
      const container = document.querySelector('[data-layout]') as HTMLElement | null;
      if (container) {
        container.classList.remove('container');
        container.classList.add('container-fluid');
      }
    }
  }

  private applyNavbarStyle(): void {
    const navbarStyle = localStorage.getItem("navbarStyle");
    if (navbarStyle && navbarStyle !== 'transparent') {
      const navbar = document.querySelector('.navbar-vertical') as HTMLElement | null;
      if (navbar) {
        navbar.classList.add(`navbar-${navbarStyle}`);
      }
    }
  }

}
