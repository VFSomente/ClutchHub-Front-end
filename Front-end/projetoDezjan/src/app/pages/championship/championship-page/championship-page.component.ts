import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-championship-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './championship-page.component.html',
  styleUrl: './championship-page.component.css'
})
export class ChampionshipPageComponent implements OnInit {
  private usuario: any = null;
  usuarioLogado: any = null;
  nomeTorneio: string = '';
  tipoTorneio: string = 'eliminacao-simples';
  torneios: any[] = [];
  torneioSelecionado: any = null;
  modoEdicao: boolean = false;
  times: { nome: string, sigla: string }[] = [];
  novoTime: { nome: string, sigla: string } = { nome: '', sigla: '' };
  jogoSelecionado: any = null;
  indiceEdicao: number = -1;

  jogos = [
    { nome: 'Valorant', campeonatos: 1, imagem: '../../../../assets/images/valorant2.png', disabled: true },
    { nome: 'League of Legends', campeonatos: 1, imagem: '../../../../assets/images/lol.webp', disabled: true },
    { nome: 'Brawlhalla', campeonatos: 1, imagem: '../../../../assets/images/brawlhalla.jpg', disabled: true }
  ];

  constructor(private router: Router, private authService: AuthService) {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
    }
  }
  

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioLogado(); 
    console.log('Usuário logado:', this.usuario);
  }
  
  

  verificarUsuarioLogado() {
    this.usuarioLogado = this.authService.getUsuarioLogado();
    console.log(this.usuarioLogado); 
    if (!this.usuarioLogado) {
      console.warn('Usuário não autenticado. Algumas funcionalidades estarão desativadas.');
    }
  }
  

  irParaLogin() {
    this.router.navigate(['/cadastro']);
  }

  adicionarTime() {
    if (this.novoTime.nome.trim() !== '' && this.novoTime.sigla.trim() !== '') {
      this.times.push({ ...this.novoTime });
      this.novoTime = { nome: '', sigla: '' };
    }
  }

  removerTime(index: number) {
    this.times.splice(index, 1);
  }
  cancelarEdicao() {
    this.limparFormulario();
    this.modoEdicao = false;
    this.indiceEdicao = -1;
  }

  selecionarJogo(jogo: any) {
    this.jogoSelecionado = jogo;
  }

  criarTorneio() {
    if (!this.usuarioLogado) {
      alert('Você precisa estar logado para criar um torneio.');
      return;
    }
    if (!this.jogoSelecionado) {
      alert('Selecione um jogo antes de criar o torneio.');
      return;
    }

    const novoTorneio = {
      nome: this.nomeTorneio,
      jogo: this.jogoSelecionado,
      tipo: this.tipoTorneio,
      times: [...this.times],
      criador: this.usuarioLogado.nickname,
      faseGrupos: this.jogoSelecionado.nome === 'League of Legends' ? this.gerarFaseGrupos() : null,
      faseEliminatoria: this.jogoSelecionado.nome === 'League of Legends' ? this.gerarFaseEliminatoria([]) : null
    };
    this.torneios.push(novoTorneio);
    this.limparFormulario();
  }

  gerarFaseGrupos() {
    const numGrupos = Math.ceil(this.times.length / 4);
    return Array.from({ length: numGrupos }, (_, i) => ({
      nome: `Grupo ${i + 1}`,
      times: this.times.slice(i * 4, (i + 1) * 4).map(time => ({ ...time, pontos: 0 }))
    }));
  }

  gerarFaseEliminatoria(vencedoresGrupos: any[]) {
    return vencedoresGrupos.map((_, i) => i % 2 === 0 ? { time1: vencedoresGrupos[i], time2: vencedoresGrupos[i + 1], vencedor: null } : null).filter(Boolean);
  }

  visualizarTorneio(torneio: any) {
    this.torneioSelecionado = torneio;
  }

  limparFormulario() {
    this.nomeTorneio = '';
    this.tipoTorneio = 'eliminacao-simples';
    this.times = [];
    this.novoTime = { nome: '', sigla: '' };
    this.jogoSelecionado = null;
  }

  editarTorneio(torneio: any) {
    if (!this.usuarioLogado) {
      alert('Você precisa estar logado para editar um torneio.');
      return;
    }
    this.modoEdicao = true;
    this.indiceEdicao = this.torneios.indexOf(torneio);
    Object.assign(this, torneio);
  }

  salvarEdicao() {
    if (!this.usuarioLogado) {
      alert('Você precisa estar logado para salvar a edição.');
      return;
    }
    this.torneios[this.indiceEdicao] = { ...this };
    this.limparFormulario();
    this.modoEdicao = false;
    this.indiceEdicao = -1;
  }

  excluirTorneio(torneio: any) {
    if (!this.usuarioLogado) {
      alert('Você precisa estar logado para excluir um torneio.');
      return;
    }
    this.torneios = this.torneios.filter(t => t !== torneio);
  }

  fecharDetalhes() {
    this.torneioSelecionado = null;
  }

  voltarAoLobby() {
    this.router.navigate(['']);
  }
}
