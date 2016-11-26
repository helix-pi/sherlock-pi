import * as deepEqual from 'deep-equal';

const CONDITIONAL_CONFIDENCE = 0.8;

function sherlock (frames) {
  const diff = diffState(frames[0].state, frames[1].state);

  const initialDiffState = {
    previousFrame: null,
    diffs: []
  }

  const diffs = frames.reduce((acc, val) => {
    if (acc.previousFrame === null) {
      return {
        previousFrame: val,
        diffs: []
      }
    }

    return {
      previousFrame: val,
      diffs: acc.diffs.concat(diffState(acc.previousFrame.state, val.state))
    }
  }, initialDiffState).diffs;


  const codes = diffs.map(diffToCode);

  if (allEqual(codes)) {
    return codes[0];
  }

  function sum (array) {
    return array.reduce((acc, val) => acc + val, 0);
  }

  function average (array) {
    return sum(array) / array.length;
  }

  function mostlyEqual (codes) {
    if (codes.some(codeBits => codeBits.length === 0)) {
      return false;
    }

    const averageBitValue = (
      average(
        codes
          .map(codeBits => codeBits[0])
          .map(bit => bit.value)
      )
    );

    const differences = (
      codes
        .map(codeBits => codeBits[0])
        .map(bit => Math.abs((averageBitValue / bit.value) - 1))
    );

    return differences.every(diff => diff < 0.1);
  }

  if (mostlyEqual(codes)) {
    return codes[0];
  }

  // if we can draw a straight line through the code values with an r > 0.9
  //   we're doing that straight line
  //
  const code = codes[0];

  const framesToUseIn = codes.map(otherCode => deepEqual(code, otherCode));

  const possibleInputs = findMatchingInputs(framesToUseIn, frames);

  const input = possibleInputs[0];

  const conditional = {
    type: 'inputConditional',

    input,

    children: code
  }

  return [conditional];

  // given a series of frames
  // generate a diff between the state of each frame
  // if the same diff can be used for each frame, great, use it
  //
  // if there is an input that is true in all the frames the diff is valid for,
    // and false for all others,
    // use that input as a conditional

}

function findMatchingInputs (possibleFrames, frames) {
  const inputs = Object.keys(frames[0].input);

  return inputs.filter(input => {
    const total = possibleFrames.length;

    const matchingFrames = possibleFrames.map((bool, index) => {
      return bool === frames[index].input[input];
    });

    const confidence = matchingFrames.filter(b => !!b).length / total;

    return confidence >= CONDITIONAL_CONFIDENCE;
  })
}

function diffToCode (diff: Object): Object {
  const differentProperties = Object.keys(diff);

  return differentProperties.map(property => {
    return {
      type: 'increase',

      property,

      value: diff[property]
    }
  })
}

function diffState (a: Object, b: Object): Object {
  const keys = Object.keys(a);

  const diff = {};

  keys.forEach(key => {
    if (a[key] !== b[key]) {
      diff[key] = b[key] - a[key];
    }
  })

  return diff;
}


function allEqual (array: Array<any>): Boolean {
  let equal = true;

  array.reduce((acc, val) => {
    equal = equal && deepEqual(acc, val);

    return val;
  })

  return equal;
}

export default sherlock;
