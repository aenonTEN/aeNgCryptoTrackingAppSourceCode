import { Component, OnInit } from '@angular/core';
import { CryptoApiService } from 'src/app/services/crypto-api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';


@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  displayedColumns: any[] = ['id', 'current_price', 'market_cap', 'price_change_percentage_24h'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;



  bannerData!: any[];

  constructor(private cryptoApi: CryptoApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllData(){
    this.cryptoApi.getCurrency('usd')
    .subscribe(res=>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }

  getBannerData(){
    this.cryptoApi.getTrendingCurrency('usd')
    .subscribe(res=>{
      console.log(res)
      this.bannerData = res;
    })
  }

  navToDetails(row: any){
    this.router.navigate(['detail', row.id])
  }
}
