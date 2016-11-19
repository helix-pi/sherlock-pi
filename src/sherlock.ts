import * as deepEqual from 'deep-equal';

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

  return inputs.filter(input =>
    deepEqual(
      possibleFrames,
      frames.map(frame => frame.input[input]).slice(0, -1)
    )
  );
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
  })

  return equal;
}

export default sherlock;
