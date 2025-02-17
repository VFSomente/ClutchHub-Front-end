import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  nickname: string | null = null;
  menuOpen = false;
  isPopupVisible: boolean = false;
  isCadastroSuccess: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuarioService.getUsuarioFromBackend().subscribe((usuario) => {
      if (usuario) {
        this.nickname = usuario.nickname ?? null; // Se undefined, define como null
        this.isAdmin = (usuario.role ?? '') === 'admin'; // Evita erro de undefined
      } else {
        this.nickname = null;
        this.isAdmin = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.usuarioService.setUsuario(null);
    this.router.navigate(['/']);
  }

  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  navigateToCampeonatos() {
    this.router.navigate(['/campeonatos']);
  }

  navigateToAdminPanel() {
    if (this.isAdmin) {
      this.router.navigate(['/admin']);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openPopup(): void {
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
    this.isCadastroSuccess = false;
  }
}
