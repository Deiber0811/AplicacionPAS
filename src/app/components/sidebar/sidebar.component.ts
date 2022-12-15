import { Component, OnInit } from '@angular/core';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'travel_istanbul', class: '' },
    // { path: '/sala1', title: 'Sala 1',  icon: 'ui-1_zoom-bold', class: '' },
    // { path: '/sala2', title: 'Sala 2',  icon:'ui-1_zoom-bold', class: '' },

    //{ path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  //faCoffee = faCoffee;

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
