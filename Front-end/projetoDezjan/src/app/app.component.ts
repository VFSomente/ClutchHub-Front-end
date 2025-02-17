import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./pages/main/menu/menu.component";
import { MainComponent } from "./pages/main/main/main.component";
import { RankingComponent } from './pages/main/ranking/ranking.component';
import { FooterComponent } from "./pages/main/footer/footer.component";


@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projetoDezjan';
}
