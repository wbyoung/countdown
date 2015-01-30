import Ember from 'ember';

export function timeNumber(input) {
  return input < 10 ? '0' + input : input;
}

export default Ember.Handlebars.makeBoundHelper(timeNumber);
