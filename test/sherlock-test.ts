import * as assert from 'assert';
import sherlock from '../src/sherlock';
import execute from '../src/execute';

interface Frame {
  state: Object,
  input: Object,

  frame: Number,

  actuallyExpectedState?: Object
}

interface TestCase {
  label: string,
  frames: Array<Frame>
}

const CASES: Array<TestCase> = [
  {
    label: 'handles moving to the right',

    frames: [
      {
        frame: 0,

        state: {
          x: 100,
          y: 100
        },

        input: {}
      },

      {
        frame: 1,

        state: {
          x: 110,
          y: 100
        },

        input: {}
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

        input: {}
      },

      {
        frame: 1,

        state: {
          x: 177,
          y: 100
        },

        input: {}
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

        input: {}
      },

      {
        frame: 1,

        state: {
          x: 100,
          y: 150
        },

        input: {}
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

        input: {}
      },

      {
        frame: 1,

        state: {
          x: 100,
          y: 100
        },

        input: {}
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

        input: {}
      },

      {
        frame: 1,

        state: {
          x: 145,
          y: 170
        },

        input: {}
      }
    ]
  },

  {
    label: 'handles n frames',

    frames: [
      {
        frame: 0,

        state: {
          x: 0,
          y: 0
        },

        input: {}
      },

      {
        frame: 1,

        state: {
          x: 10,
          y: 0
        },

        input: {}
      },

      {
        frame: 2,

        state: {
          x: 20,
          y: 0
        },

        input: {}
      }
    ]
  },

  {
    label: 'creates conditional code for inputs',

    frames: [
      {
        frame: 0,

        state: {
          x: 0,
          y: 0
        },

        input: {
          left: false,
          right: true
        }
      },

      {
        frame: 1,

        state: {
          x: 10,
          y: 0
        },

        input: {
          left: false,
          right: false
        }
      },

      {
        frame: 2,

        state: {
          x: 10,
          y: 0
        },

        input: {
          left: false,
          right: false
        }
      },
    ]
  },

  {
    label: 'will create conditionals when they mostly match',

    frames: [
      {
        frame: 0,

        state: {
          x: 0,
          y: 0
        },

        input: {
          right: true,
          left: false
        }
      },

      {
        frame: 1,

        state: {
          x: 5,
          y: 0
        },

        input: {
          right: true,
          left: false
        }
      },

      {
        frame: 2,

        state: {
          x: 10,
          y: 0
        },

        input: {
          right: true,
          left: false
        }
      },

      {
        frame: 3,

        state: {
          x: 15,
          y: 0
        },

        input: {
          right: true,
          left: false
        }
      },

      {
        frame: 4,

        state: {
          x: 20,
          y: 0
        },

        input: {
          right: true,
          left: false
        }
      },

      {
        frame: 5,

        state: {
          x: 20,
          y: 0
        },

        actuallyExpectedState: {
          x: 25,
          y: 0
        },

        input: {
          right: false,
          left: false
        }
      }
    ]
  },

  {
    label: 'handles longer cases',
    frames: [
      {
        frame: 0,

        state: {
          x: 0,
          y: 0
        },

        input: {
          right: false,
          left: false
        }
      },
      {
        frame: 1,

        state: {
          x: 10,
          y: 0
        },

        input: {
          right: false,
          left: false
        }
      },

      {
        frame: 2,

        state: {
          x: 20,
          y: 0
        },

        input: {
          right: false,
          left: false
        }
      },

      {
        frame: 3,

        state: {
          x: 30,
          y: 0
        },

        input: {
          right: false,
          left: false
        }
      }
    ]
  },
  {
    label: 'handles fuzzy data',
    frames: [
      {
        frame: 0,

        state: {
          x: 0,
          y: 0
        },

        input: {
          right: false,
          left: false
        }
      },
      {
        frame: 1,

        state: {
          x: 10,
          y: 0
        },

        input: {
          right: false,
          left: false
        }
      },

      {
        frame: 2,

        state: {
          x: 20,
          y: 0
        },

        input: {
          right: false,
          left: false
        }
      },

      {
        frame: 3,

        state: {
          x: 29,
          y: 0
        },

        actuallyExpectedState: {
          x: 30,
          y: 0
        },

        input: {
          right: false,
          left: false
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

      testCase.frames.reduce((startFrame, nextFrame) => {
        assert.deepEqual(
          execute(deduction, startFrame.state, startFrame.input),
          nextFrame.actuallyExpectedState || nextFrame.state,
        );

        return nextFrame;
      });
    });
  })
});
