import { style, animate, trigger, transition, state } from '@angular/animations';

export const showHideAnimation = trigger('showHideAnimation', [
  transition(':enter', [
    style({ display: 'none' }),
    animate('0s 100ms', style({ display: 'inline' }))
  ])
]);

export const expandXAnimation = trigger('expandXAnimation', [
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
  ])
]);

export const expandYAnimation = trigger('expandYAnimation', [
  transition(':enter', [
    style({ transform: 'scaleY(0)' }),
    animate('100ms', style({
      transform: 'scaleY(100%)'
    }))
  ]),
  transition(':leave', [
    style({ transform: 'scaleY(100%)' }),
    animate('100ms', style({
      transform: 'scaleY(0)'
    }))
  ])
]);
