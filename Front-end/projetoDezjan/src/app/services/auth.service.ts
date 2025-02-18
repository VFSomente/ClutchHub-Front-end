import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  email: string;
  senha: string;
  nickname?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/geralcontroller'; // URL do backend

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuario`, { email, senha });
  }

  cadastrar(nickname: string, email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuario`, { nickname, email, senha });
  }

  salvarUsuarioLocal(usuario: Usuario): void {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }


  getUsuarioLogado(): Usuario | null {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  }
  getUserEmail(): string | null {
    const usuario = localStorage.getItem('/email'); // Ou outra forma de armazenar
    return usuario ? JSON.parse(usuario).email : null;
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
    console.log('Usuário deslogado');
  }
  
  

}
