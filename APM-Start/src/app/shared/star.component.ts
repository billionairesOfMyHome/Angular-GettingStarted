import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
  selector:'pm-star',
  templateUrl:'./star.component.html',
  styleUrls:['./star.component.css']
})
export class StarComponent  implements OnChanges{
  
  cropWidth = 75;

  @Input() rating = 0;

  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    this.cropWidth = (this.rating / 5) * 75;
  }

  onClick(): void{
    this.ratingClicked.emit('The star was clicked!');
    console.log(`The rating ${this.rating} was clicked!`);
  }
}