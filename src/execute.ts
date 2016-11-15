
function execute (deduction, startingState) {
  deduction.forEach(instruction => {

    if (instruction.type === 'increase') {
      startingState[instruction.property] += instruction.value;
    }
  });

  return startingState;
}

export default execute;
