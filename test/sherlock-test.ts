import * as assert from 'assert';
import sherlock from '../src/sherlock';
import execute from '../src/execute';

const CASES = [
  {
    label: 'handles moving to the right',

    startingState: {
      x: 100,
      y: 100
    },

    endState: {
      x: 110,
      y: 100
    }
  },

  {
    label: 'handles moving to the right a different distance',

    startingState: {
      x: 100,
      y: 100
    },

    endState: {
      x: 177,
      y: 100
    }
  },

  {
    label: 'handles moving down',

    startingState: {
      x: 100,
      y: 100
    },

    endState: {
      x: 100,
      y: 150
    }
  },

  {
    label: 'handles no change',

    startingState: {
      x: 100,
      y: 100
    },

    endState: {
      x: 100,
      y: 100
    }
  },

  {
    label: 'handles moving diagonally',

    startingState: {
      x: 100,
      y: 100
    },

    endState: {
      x: 145,
      y: 170
    }
  }
]

describe('sherlock', () => {
  CASES.forEach((testCase) => {
    it(testCase.label, () => {
      const deduction = sherlock(testCase.startingState, testCase.endState);

      assert.deepEqual(execute(deduction, testCase.startingState), testCase.endState);
    });
  })
});
