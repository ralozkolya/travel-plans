import { style, animate, trigger, transition, state } from '@angular/animations';

export const showHideAnimation = trigger('showHideAnimation', [
  transition(':enter', [
    style({ display: 'none' }),
    animate('0s 100ms', style({ display: 'inline' }))
  ])
]);

export const expandAnimation = trigger('expandAnimation', [
  transition(':enter', [
    style({ transform: 'scaleX(30%)' }),
    animate('100ms', style({
      transform: 'scaleX(100%)'
    }))
  ]),
  transition(':leave', [
    style({ transform: 'scaleX(100%)' }),
    animate('100ms', style({
      transform: 'scaleX(30%)'
    }))
  ]),
]);
