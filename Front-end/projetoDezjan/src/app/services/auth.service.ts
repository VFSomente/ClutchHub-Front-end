import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Usuario {
  nickname?: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuario'; // URL do backend
  private userEmailKey = 'userEmail';

  constructor(private http: HttpClient) {}

  // Método para login
  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap((response) => {
        console.log('Login bem-sucedido!', response);

        // Verifica se a resposta contém o usuário corretamente
        const usuario = response.usuario || response; // Se "usuario" existir, pega ele, senão usa a resposta direta

        if (usuario && usuario.email) {
          this.salvarUsuarioLocal(usuario); // Salva o usuário no LocalStorage
        } else {
          console.error('Erro: resposta inesperada da API.', response);
        }
      }),
      catchError((err) => {
        console.error('Erro no login:', err);
        return throwError(() => new Error('Erro no login, tente novamente.'));
      })
    );
  }

  // Método para cadastrar um novo usuário
  cadastrar(nickname: string, email: string, senha: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/usuario/register', { nickname, email, senha }).pipe(
      catchError((error) => {
        if (error.status === 409) { // 409 é o status de conflito (e-mail duplicado)
          return throwError(() => new Error('E-mail já está em uso.'));
        } else {
          return throwError(() => new Error('Erro ao cadastrar usuário. Tente novamente.'));
        }
      })
    );
  }

  // Obtém o usuário logado do localStorage 
  getUsuarioLogado(): Usuario | null {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  }

  // Salva o usuário no localStorage
  salvarUsuarioLocal(usuario: Usuario): void {
    if (usuario && usuario.email) {
      localStorage.setItem(this.userEmailKey, usuario.email); // Salva o email no LocalStorage
    }
  }

  // Obtém o email do usuário logado
  getUserEmail(): string | null {
    return localStorage.getItem(this.userEmailKey); // Recupera o email armazenado
  }

  logout(): void {
    localStorage.removeItem(this.userEmailKey); // Remove o email ao deslogar
  }
}
