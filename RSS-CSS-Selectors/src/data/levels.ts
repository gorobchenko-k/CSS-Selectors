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
  {
    task: 'Select empty rectangles',
    boardMarkup: `
    <rectangle>
      <circle class='small'/>
    </rectangle>
    <circle />
    <rectangle class='small'/>
    <circle>
      <rectangle class='small'/>
    </circle>
    <rectangle/>
    `,
    selector: 'rectangle:empty',
  },
  {
    task: 'Select a non-gradient circle',
    boardMarkup: `
    <squares>
      <circle class='small'/>
    </squares>
    <circle>
      <squares class='small' />
    </circle>
    <circle id='gradient'/>
    `,
    selector: 'circle:not(#gradient)',
  },
  {
    task: 'Select every third square',
    boardMarkup: `
    <squares class='small'/>
    <squares class='small' />
    <squares class='small' />
    <squares class='small' />
    <squares class='small' />
    <squares class='small' />
    <squares class='small' />
    <squares class='small' />
    <squares class='small' />
    <squares class='small' />
    <squares class='small' />
    `,
    selector: 'squares:nth-child(3n)',
  },
  {
    task: 'Select every third circle',
    boardMarkup: `
    <squares class='small'/>
    <circle class='small' />
    <circle class='small' />
    <squares class='small' />
    <squares class='small' />
    <circle class='small' />
    <squares class='small' />
    <circle class='small' />
    <squares class='small' />
    <circle class='small' />
    <squares class='small' />
    <circle class='small' />
    <squares class='small' />
    `,
    selector: 'circle:nth-of-type(3n)',
  },
  {
    task: 'Select the circle that is the only one in the square',
    boardMarkup: `
    <squares>
      <circle class='small' />
    </squares>
    <circle>
      <squares class='small'/>
    </circle>
    <squares>
      <circle class='small'/>
      <circle class='small'/>
      <circle class='small'/>
    </squares>
    `,
    selector: 'squares circle:only-child',
  },
];
