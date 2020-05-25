import { StavkaRacunaService } from './services/stavkaRacunaservice';
import { RacunService } from './services/racunservise';
import { ProizvodjacService } from './services/proizvodjacservice';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { VoziloComponent } from './vozilo/vozilo.component';
import { AutomobilComponent } from './vozilo/automobil/automobil.component';
import { ProizvodjacComponent } from './proizvodjac/proizvodjac.component';
import { ProizvodComponent } from './proizvod/proizvod.component';
import { RacunComponent } from './racun/racun.component';
import { StavkaRacunaComponent } from './stavka-racuna/stavka-racuna.component';
import { HomeComponent } from './core/home/home.component';
import { AuthorComponent } from './core/author/author.component';
import { AboutComponent } from './core/about/about.component';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ProizvodService } from './services/proizvodservice';
import { ProizvodjacDialogComponent } from './dialogs/proizvodjac-dialog/proizvodjac-dialog.component';
import { ProizvodDialogComponent } from './dialogs/proizvod-dialog/proizvod-dialog.component';
import { RacunDialogComponent } from './dialogs/racun-dialog/racun-dialog.component';
import { StavkaRacunaDialogComponent } from './dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';


const Routes = [{path: 'proizvodjac', component: ProizvodjacComponent},
{path: 'proizvod', component: ProizvodComponent},
{path: 'racun', component: RacunComponent},
{path: 'stavkaRacuna', component: StavkaRacunaComponent},
{path: 'home', component: HomeComponent},
{path: 'about', component: AboutComponent},
{path: 'author', component: AuthorComponent},
{path: '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  declarations: [
    AppComponent,
    VoziloComponent,
    AutomobilComponent,
    ProizvodjacComponent,
    ProizvodComponent,
    RacunComponent,
    StavkaRacunaComponent,
    HomeComponent,
    AuthorComponent,
    AboutComponent,
    ProizvodjacDialogComponent,
    ProizvodDialogComponent,
    RacunDialogComponent,
    StavkaRacunaDialogComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(Routes),
    MatTableModule,
    MatToolbarModule,
    HttpClientModule,
    MatSortModule, MatSelectModule, MatOptionModule,
    MatSnackBarModule,
    MatDialogModule, 
    MatInputModule,
    MatSelectModule, 
    MatOptionModule,
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatCheckboxModule, 
    MatPaginatorModule,
    FormsModule

  ],
  entryComponents: [
    ProizvodjacDialogComponent,  ProizvodDialogComponent, RacunDialogComponent, StavkaRacunaDialogComponent
  ],
  providers: [
    ProizvodjacService,
    ProizvodService,
    RacunService,
    StavkaRacunaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
