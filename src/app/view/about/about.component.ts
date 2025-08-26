import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { AliadosComponent } from "../../components/aliados/aliados.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, MatGridListModule, MatTabsModule, AliadosComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
