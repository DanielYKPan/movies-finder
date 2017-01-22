/**
 * actor-card.component
 */

import { Component, OnInit, Input, HostListener, trigger, state, style, transition, animate } from "@angular/core";
import { IPerson } from "../../model";

@Component({
    selector: 'app-actor-card',
    templateUrl: './actor-card.component.html',
    styleUrls: ['./actor-card.component.scss'],
    animations: [
        trigger('metaOnMouseState', [
            state('out', style({
                transform: 'translateY(50%)'
            })),
            state('in', style({
                transform: 'translateY(0)'
            })),
            transition('out <=> in', animate('150ms linear')),
        ]),
        trigger('subOnMouseState', [
            state('out', style({
                opacity: '0.4'
            })),
            state('in', style({
                opacity: '1'
            })),
            transition('out <=> in', animate('400ms linear'))
        ])
    ]
})

export class ActorCardComponent implements OnInit {

    @Input() actor: IPerson;

    @HostListener('mouseenter') ac_onEnter() {
        this.mouseState = 'in';
    }

    @HostListener('mouseleave') ac_onLeave() {
        this.mouseState = 'out';
    }

    mouseState: string;

    constructor() {
    }

    ngOnInit(): void {
        this.mouseState = 'out';
    }
}
