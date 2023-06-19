import { LevelData } from '../types';

export const levels: LevelData[] = [
  {
    task: 'Select the circle',
    boardMarkup: `
    <circle/>
    <circle/>
    `,
    selector: 'circle',
  },
  {
    task: 'Select the squares',
    boardMarkup: `
    <squares/>
    <circle/>
    <squares/>
    `,
    selector: 'squares',
  },
  {
    task: 'Select the gradient circle',
    boardMarkup: `
    <circle id='gradient'/>
    <circle/>
    <squares/>
    `,
    selector: '#gradient',
  },
  {
    task: 'Select the small squares',
    boardMarkup: `
    <squares/>
    <squares class='small'/>
    <circle>
      <squares class='small'/>
    </circle>
    <circle/>
    `,
    selector: '.small',
  },
  {
    task: 'Select all the things',
    boardMarkup: `
    <rectangle/>
    <circle>
      <squares class='small' />
    </circle>
    <squares/>
    <squares>
      <rectangle/>
    </squares>
    <circle id='gradient'/>
    `,
    selector: '*',
  },
  {
    task: "Select every rectangle that's next to a circle",
    boardMarkup: `
    <squares>
      <rectangle class='small'/>
    </squares>
    <circle />
    <rectangle class='small'/>
    <circle />
    <rectangle/>
    <rectangle class='small'/>
    <rectangle class='small'/>
    `,
    selector: 'circle + rectangle',
  },
];
