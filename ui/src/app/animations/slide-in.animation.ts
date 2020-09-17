import { trigger, transition, style, query, group, animate, animateChild } from '@angular/animations';

const toLeft = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
    style({
      transform: 'translateX(100%) scale(.5)',
      opacity: .5
    })
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({
        transform: 'translateX(-100%) scale(.5)',
        opacity: .5
      }))
    ]),
    query(':enter', [
      animate('300ms ease-out', style({
        transform: 'translateX(0) scale(1)',
        opacity: 1
      }))
    ])
  ]),
  query(':enter', animateChild()),
];

const toRight = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
    style({
      transform: 'translateX(-100%) scale(.5)',
      opacity: .5
    })
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({
        transform: 'translateX(100%) scale(.5)',
        opacity: .5
      }))
    ]),
    query(':enter', [
      animate('300ms ease-out', style({
        transform: 'translateX(0) scale(1)',
        opacity: 1
      }))
    ])
  ]),
  query(':enter', animateChild()),
];

export const slideInAnimation = trigger('routeAnimations', [
  transition(':increment', toLeft),
  transition(':decrement', toRight),
]);
