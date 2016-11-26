import {div, pre, svg, h} from '@cycle/dom';
import xs from 'xstream';

function debug (v) {
  return (
    pre('.debug', JSON.stringify(v, null, 2))
  )
}

function view (state) {
  return (
    div('.editor', [
      debug(state),
      svg([
        h('text', "hi")
      ])
    ])
  )
}

function Editor ({DOM}) {
  const initialState = {
  };

  const state$ = xs.of(initialState);

  return {
    DOM: state$.map(view)
  }
}

export default Editor;
