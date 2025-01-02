import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    menuList: any[] = [
        { name: 'Pólizas', url: '/policy/policies', icon: '' },
        { name: 'Inventario', url: '/inventory/inventories', icon: '' },
        { name: 'Empleados', url: '/employee/employees', icon: '' }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
