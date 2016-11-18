import * as assert from 'assert';
import sherlock from '../src/sherlock';
import execute from '../src/execute';

const CASES = [
  {
    label: 'handles moving to the right',

    frames: [
      {
        frame: 0,

        state: {
          x: 100,
          y: 100
        },
      },

      {
        frame: 1,

        state: {
          x: 110,
          y: 100
        }
      }
    ]
  },

  {
    label: 'handles moving to the right a different distance',

    frames: [
      {
        frame: 0,

        state: {
          x: 100,
          y: 100
        },
      },

      {
        frame: 1,

        state: {
          x: 177,
          y: 100
        }
      }
    ]
  },

  {
    label: 'handles moving down',

    frames: [
      {
        frame: 0,

        state: {
          x: 100,
          y: 100
        },
      },

      {
        frame: 1,

        state: {
          x: 100,
          y: 150
        }
      }
    ]
  },

  {
    label: 'handles no change',

    frames: [
      {
        frame: 0,

        state: {
          x: 100,
          y: 100
        },
      },

      {
        frame: 1,

        state: {
          x: 100,
          y: 100
        }
      }
    ]
  },

  {
    label: 'handles moving diagonally',

    frames: [
      {
        frame: 0,

        state: {
          x: 100,
          y: 100
        },
      },

      {
        frame: 1,

        state: {
          x: 145,
          y: 170
        }
      }
    ]
  }
]

describe('sherlock', () => {
  CASES.forEach((testCase) => {
    it(testCase.label, () => {
      const deduction = sherlock(
        testCase.frames
      );

      assert.deepEqual(
        execute(deduction, testCase.frames[0].state),
        testCase.frames[1].state
      );
    });
  })
});
