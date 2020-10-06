import { Component, OnInit, Input } from '@angular/core';
import { Heroe } from '../heroes/heroe.interface';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.css']
})

export class HeroesDetailComponent implements OnInit {

  @Input() heroe: Heroe;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(heroe => this.heroe = heroe);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.heroe).subscribe(() => this.goBack());
  }

}
