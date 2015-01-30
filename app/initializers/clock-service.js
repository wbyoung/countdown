export function initialize(container, application) {
  application.inject('route', 'clock', 'service:clock');
  application.inject('controller', 'clock', 'service:clock');
}

export default {
  name: 'clock-service',
  initialize: initialize
};
