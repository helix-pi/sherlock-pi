
function sherlock (a, b) {
  const diff = diffState(a, b);

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

export default sherlock;
