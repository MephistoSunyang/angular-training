import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from '../modules/admin/admin-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'system', pathMatch: 'full' },
  { path: 'system', loadChildren: () => AdminRoutingModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
