
function assign (...objects : Array<Object>): Object {
  return objects.reduce((acc, val) => {
    for (let property in val) {
      acc[property] = val[property];
    }

    return acc;
  })
}


function executeInstruction (startingState, instruction, input) {;
  const state = assign({}, startingState);

  if (instruction.type === 'increase') {
    state[instruction.property] += instruction.value;

    return state;
  }

  if (instruction.type === 'inputConditional') {
    if (input[instruction.input]) {
      return execute(instruction.children, startingState, input);
    } else {
      return state;
    }
  }

  throw new Error(`unhandled type ${instruction.type}`);
}

function execute (deduction, startingState, input) {
  return deduction.reduce((state, instruction) => {
    return executeInstruction(state, instruction, input);
  }, startingState);
}

export default execute;
