import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRoutesEnum } from './app.routes';
import { LoginRegisterGuard } from '@core/guards/login-register.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutesEnum.APP,
    pathMatch: 'full'
  },
  {
    path: AppRoutesEnum.LOGIN,
    canLoad: [LoginRegisterGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: AppRoutesEnum.REGISTER,
    canLoad: [LoginRegisterGuard],
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: AppRoutesEnum.APP,
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/app/app.module').then( m => m.AppPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
