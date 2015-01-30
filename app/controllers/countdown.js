import Ember from 'ember';

export default Ember.Controller.extend({
  days: function() {
    var remaining = +this.get('remaining');
    var minuteLength = +this.get('model.lengths.minute');
    var hourLength = +this.get('model.lengths.hour');
    var dayLength = +this.get('model.lengths.day');
    return Math.floor(remaining / minuteLength / hourLength / dayLength);
  }.property('hours', 'model.lengths'),

  hours: function() {
    var remaining = +this.get('remaining');
    var minuteLength = +this.get('model.lengths.minute');
    var hourLength = +this.get('model.lengths.hour');
    var dayLength = +this.get('model.lengths.day');
    return Math.floor(remaining / minuteLength / hourLength) % dayLength;
  }.property('remaining', 'model.lengths'),

  minutes: function() {
    var remaining = +this.get('remaining');
    var minuteLength = +this.get('model.lengths.minute');
    var hourLength = +this.get('model.lengths.hour');
    return Math.floor(remaining / minuteLength) % hourLength;
  }.property('remaining', 'model.lengths'),

  seconds: function() {
    var remaining = +this.get('remaining');
    var minuteLength = +this.get('model.lengths.minute');
    return Math.floor(remaining) % minuteLength;
  }.property('remaining', 'model.lengths'),

  hasTime: function() {
    return this.get('hours') || this.get('minutes') || this.get('seconds');
  }.property('hours', 'minutes', 'seconds'),

  remaining: function() {
    var now = Math.floor(Date.now() / 1000);
    var ranges = this.get('model.ranges');
    var remaining = ranges.reduce(function(seconds, range) {
      var start = range.start;
      var end = range.end;

      if (start < now) { start = now; }
      if (end < now) { end = now; }

      return seconds + end - start;
    }, 0);

    return remaining;
  }.property('model.ranges', 'model.lengths', 'clock.second')

});
