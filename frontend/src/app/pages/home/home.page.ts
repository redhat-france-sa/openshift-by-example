/*
 * MIT License

 * Copyright (c) 2020 RH France Solution Architects

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { Component, OnInit } from '@angular/core';

import { Fruit } from '../../models/fruit.model';
import { FruitsService } from '../../services/fruits.service';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePageComponent implements OnInit {

  fruit: Fruit = new Fruit();
  fruits: Fruit[];
  lovings: string[] = [];

  constructor(private fruitsSvc: FruitsService, private likeSvc: LikeService) { }

  ngOnInit() {
    this.getFruits();
  }

  getFruits(): void {
    this.fruitsSvc.getFruits().subscribe(results => this.fruits = results);
  }

  resetFruit(): void {
    this.fruit = new Fruit();
  }
  addFruit(): void {
    this.fruitsSvc.createFruit(this.fruit).subscribe(
      {
        next: res => {
          this.fruit = new Fruit();
          this.getFruits();
        },
        error: err => {
          alert("Fruit cannot be created (" + err.message + ")");
        },
        complete: () => console.log('Observer got a complete notification'),
      }
    );
  }

  isLiked(fruit: Fruit): boolean {
    if (this.lovings.includes(fruit.id)) {
      return true;
    }
    return false;
  }
  likeFruit(fruit: Fruit): void {
    this.likeSvc.likeFruit(fruit).subscribe(
      {
        next: res => {
          this.lovings.push(fruit.id);
          alert("Thank you for liking this " + fruit.name + " 😀");
        },
        error: err => {
          alert("Fruit cannot be liked (" + err.message + ")");
        },
        complete: () => console.log('Observer got a complete notification'),
      }
    );
  }
  unlikeFruit(fruit: Fruit): void {
    this.likeSvc.unlikeFruit(fruit).subscribe(
      {
        next: res => {
          this.lovings.splice(this.lovings.indexOf(fruit.id));
          alert("Sorry you do not like " + fruit.name + " anymore... 😢");
        },
        error: err => {
          alert("Fruit cannot be unliked (" + err.message + ")");
        },
        complete: () => console.log('Observer got a complete notification'),
      }
    );
  }
}
