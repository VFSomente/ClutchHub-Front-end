import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';

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
  

  private apiUrl = 'http://localhost:8080/usuario';

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  
  
  ngOnInit() {
    const userEmail = this.authService.getUserEmail();
    console.log('Email obtido do AuthService:', userEmail);
    
    if (userEmail) {
      this.http.get<any>(`${this.apiUrl}/email/${userEmail}`).subscribe({
        next: (usuario) => {
          console.log('Usuário retornado pela API:', usuario); // Depuração
          this.nickname = usuario?.nickname ?? null;
          this.isAdmin = usuario?.role === 'admin';
        },
        error: (err) => {
          console.error('Erro ao buscar usuário:', err);
          this.nickname = null;
          this.isAdmin = false;
        }
      });
    }
  }
  logout() {
    this.authService.logout();
    this.usuarioService.setUsuario(null);
    this.router.navigate(['/']);
    location.reload();
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
