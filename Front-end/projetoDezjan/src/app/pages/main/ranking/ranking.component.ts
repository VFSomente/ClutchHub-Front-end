import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ranking',
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {
  jogos = [
    {
      nome: 'Valorant',
      campeonatos: 1,
      imagem: '../../../../assets/images/valorant2.png',
      link: '/campeonatos',
      disabled: true
    },
    {
      nome: 'League of legends',
      campeonatos: 1,
      imagem: '../../../../assets/images/lol.webp',
      link: '/campeonatos',
      disabled: true
    },
    {
      nome: 'Brawlhalla',
      campeonatos: 1,
      imagem: '../../../../assets/images/brawlhalla.jpg',
      link: '/campeonatos',
      disabled: true
    },
  ];
}
