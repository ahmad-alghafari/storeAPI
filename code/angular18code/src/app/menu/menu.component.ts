import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  ngOnInit(): void {
    if (this.isBrowserEnvironment()) {
      this.applyNavbarStyle();
    }
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
