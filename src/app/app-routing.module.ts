import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from '../modules/admin/admin.module';

const routes: Routes = [
  { path: '', redirectTo: 'system', pathMatch: 'full' },
  { path: 'system', loadChildren: () => AdminModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
