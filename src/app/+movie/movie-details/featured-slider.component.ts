/**
 * featured-sider.component
 */

import {
    Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren, AfterViewInit,
    Renderer, Input, AfterViewChecked
} from "@angular/core";
import { IMovie } from "../model";

@Component({
    selector: 'app-featured-slider',
    templateUrl: './featured-slider.component.html',
    styleUrls: ['./featured-slider.component.scss']
})

export class FeaturedSliderComponent implements OnInit, AfterViewChecked {

    @Input() movies: Array<IMovie>;

    @ViewChild('featuredList') featuredList: ElementRef;
    @ViewChild('featuredTrack') featuredTrack: ElementRef;
    @ViewChildren('card') cards: QueryList<ElementRef>;

    constructor( private renderer: Renderer ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewChecked(): void {
        let featuredListWidth = this.featuredList.nativeElement.offsetWidth;
        let cardWidth = (featuredListWidth / 5).toString() + 'px';
        let featuredTrackWidth = ((featuredListWidth / 5) * this.cards.length).toString() + 'px';

        this.renderer.setElementStyle(this.featuredTrack.nativeElement, 'width', featuredTrackWidth);
        this.cards.map(card => {
            this.renderer.setElementStyle(card.nativeElement, 'width', cardWidth);
        });
    }

    clickLeft(): void {
        let distance = this.getSlideLeftDistance();
        this.renderer.setElementStyle(this.featuredTrack.nativeElement, 'transform', 'translateX(' + distance + 'px' +')');
    }

    clickRight(): void {
        let distance = this.getSlideRightDistance();
        if(distance === 0) return;
        this.renderer.setElementStyle(this.featuredTrack.nativeElement, 'transform', 'translateX(' + distance + 'px' +')');
    }

    private getSlideRightDistance(): number {
        let xTrans = this.getTransX(this.featuredTrack.nativeElement.style.transform);
        let featuredListWidth = this.featuredList.nativeElement.offsetWidth;
        let featuredTrackWidth = this.featuredTrack.nativeElement.offsetWidth;
        let diff =  featuredTrackWidth - Math.abs(xTrans) - featuredListWidth;

        if (diff <= 0) {
            return 0;
        }else if(diff < featuredListWidth) {
            return xTrans - diff
        }else {
            return xTrans - featuredListWidth;
        }
    }

    private getSlideLeftDistance(): number {
        let xTrans = this.getTransX(this.featuredTrack.nativeElement.style.transform);

        if(xTrans === 0) return 0;

        let featuredListWidth = this.featuredList.nativeElement.offsetWidth;

        if (xTrans + featuredListWidth < 0) {
            return xTrans + featuredListWidth;
        } else {
            return 0;
        }
    }

    private getTransX(transform: string): number {
        if(transform) {
            let transXRegex = /\.*translateX\((.*)px\)/i;
            let xTrans = transXRegex.exec(transform)[1];
            return +xTrans;
        }else {
            return 0;
        }
    }
}
