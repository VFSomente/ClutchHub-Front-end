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
  private apiUrl = 'http://localhost:8080/competicao'; // URL do backend

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, { email, senha });
  }

  cadastrar(email: string, senha: string, nickname: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/register`, { email, senha, nickname });
  }

  salvarUsuarioLocal(usuario: Usuario): void {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }

  getUsuarioLogado(): Usuario | null {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
    console.log('Usuário deslogado');
  }
}
