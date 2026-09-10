import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MapComponent } from '../../components/map/map.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NestJSService } from '../../services/nestjs.service';
import { Overpass } from '../../services/overpass';
import { Nominatim } from '../../services/nominatim';
import { Google } from '../../services/google';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.html',
  styleUrl: './trips.scss',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MapComponent,
    MatMenuModule,
    FormsModule,
    HeaderComponent,
    MatAutocompleteModule
  ],
  providers: [NestJSService, Overpass, Nominatim, Google],
})
export class Trips implements OnInit {

  nestjsService = inject(NestJSService);
  router = inject(Router);

  displayedColumns: string[] = [
    'confirmed',
    'driverName',
    'id',
    'pickupTime',
    'plate',
  ];

  dataSource = new MatTableDataSource<any>([]);

  ngOnInit(): void {
    this.getTrips();
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

getTrips(): void {
  this.nestjsService.getTrips().subscribe({
    next: (response) => {
      console.log(response);

      this.dataSource.data = response.data;
    },
    error: (error) => {
      console.error(error);
    }
  });
}

}
