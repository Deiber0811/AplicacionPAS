import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { Sala1Component } from '../../sala1/sala1.component';
import { Sala2Component } from '../../sala2/sala2.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'sala1',          component: Sala1Component },
    { path: 'sala2',          component: Sala2Component },
];
