import { ItemData } from '../typings/item';

export const Items: {
  [key: string]: ItemData | undefined;
} = {
  water: {
    name: 'water',
    close: false,
    label: 'Water',
    stack: true,
    usable: true,
    count: 1,
  },
  burger: {
    name: 'burger',
    close: false,
    label: 'BURGR',
    stack: false,
    usable: false,
    count: 0,
  },
  backwoods: {
    name: 'burger',
    close: false,
    label: 'Package',
    stack: false,
    usable: false,
    count: 0,
  },
};
