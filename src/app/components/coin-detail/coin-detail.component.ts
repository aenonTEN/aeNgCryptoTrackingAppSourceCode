import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoApiService } from 'src/app/services/crypto-api.service';
import {} from 'chart.js'

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {

  coinId!: string;
  coinData!: any;

  constructor(private cryptoApi: CryptoApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=> {
      this.coinId = val['id']
    })

    this.getCoinData();

  }

  getCoinData(){
     this.cryptoApi.getCoinById(this.coinId)
     .subscribe(res=> {
        this.coinData = res
        console.log(this.coinData)
     })

  }

  

}
