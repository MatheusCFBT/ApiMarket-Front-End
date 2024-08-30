import { Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import CadastroComponent from './produtos/cadastro/cadastro.component';
import { ListaComponent } from './produtos/lista/lista.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'cadastrar-produto', component: CadastroComponent},
    {path: 'lista-produtos', component: ListaComponent}
];
