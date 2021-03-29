import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./uploader/uploader.module').then(m => m.UploaderModule)},
  { path: 'changelog', loadChildren: () => import('./_static/changelog.module').then(m => m.ChangelogModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}