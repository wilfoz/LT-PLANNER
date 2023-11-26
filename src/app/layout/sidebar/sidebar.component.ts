import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @ViewChild('start') appDrawer!: ElementRef;

  navItems = [
    {
      displayName: 'Dashboard',
      iconName: 'bar_chart',
      route: '',
      children: []
    },
    {
      displayName: 'Registros',
      iconName: 'list',
      route: '',
      children: [
        {
          displayName: 'produção',
          iconName: 'keyboard_arrow_right',
          route: 'production',
          children: []
        }, {
          displayName: 'equipe',
          iconName: 'keyboard_arrow_right',
          route: 'composition/team',
          children: []
        }, {
          displayName: 'funcionário',
          iconName: 'keyboard_arrow_right',
          route: 'composition/employee',
          children: []
        }, {
          displayName: 'equipamento',
          iconName: 'keyboard_arrow_right',
          route: 'composition/equipment',
          children: []
        }, {
          displayName: 'atividade',
          iconName: 'keyboard_arrow_right',
          route: 'activity',
          children: []
        }, {
          displayName: 'lista de construção',
          iconName: 'keyboard_arrow_right',
          route: 'list-construction',
          children: []
        },
      ]
    }, {
      displayName: 'Setup',
      iconName: 'settings',
      route: '',
      children: [
        {
          displayName: 'equipes',
          iconName: 'add',
          route: 'composition/new',
          children: []
        }
      ]
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) { }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
