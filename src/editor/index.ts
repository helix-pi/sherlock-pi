import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import Editor from './editor';

const drivers = {
  DOM: makeDOMDriver('.app')
}

run(Editor, drivers);
