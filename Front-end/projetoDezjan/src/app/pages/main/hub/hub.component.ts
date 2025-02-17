import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MainComponent } from '../main/main.component';
import { RankingComponent } from '../ranking/ranking.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-hub',
  template: `
  <app-menu></app-menu>
  <app-main></app-main>
  <app-ranking></app-ranking>
  <app-footer></app-footer>`,
  standalone: true,
  imports: [
    MenuComponent,
    MainComponent,
    RankingComponent,
    FooterComponent
  ],
})
export class HubComponent {

}
