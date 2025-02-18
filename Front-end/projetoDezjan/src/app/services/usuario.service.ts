import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Certifique-se de ter essa configuração

interface Usuario {
  nickname?: string;
  email: string;
  senha: string;
  role?: string; // Adicionando para verificar permissões
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSubject: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);
  usuario$: Observable<Usuario | null> = this.usuarioSubject.asObservable();
  private apiUrl = environment.apiUrl; // Ajuste conforme necessário

  constructor(private http: HttpClient) {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      this.usuarioSubject.next(JSON.parse(usuarioSalvo));
    } else {
      this.carregarUsuario(); // Busca do backend se não houver no localStorage
    }
  }

  setUsuario(usuario: Usuario | null): void {
    this.usuarioSubject.next(usuario);
    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuarioLogado');
    }
  }

  getUsuarioLogado(): Usuario | null {
    return this.usuarioSubject.getValue();
  }

  /** Busca os dados do usuário autenticado no backend */
  getUsuarioFromBackend(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuario`);
  }

  /** Carrega o usuário do backend e atualiza o estado local */
  carregarUsuario(): void {
    this.getUsuarioFromBackend().subscribe(
      (usuario) => this.setUsuario(usuario),
      () => this.setUsuario(null) // Se houver erro, remove usuário
    );
  }
}
