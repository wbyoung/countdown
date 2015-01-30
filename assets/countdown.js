define('countdown/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', './config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('countdown/controllers/countdown', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    days: (function () {
      var remaining = +this.get("remaining");
      var minuteLength = +this.get("model.lengths.minute");
      var hourLength = +this.get("model.lengths.hour");
      var dayLength = +this.get("model.lengths.day");
      return Math.floor(remaining / minuteLength / hourLength / dayLength);
    }).property("hours", "model.lengths"),

    hours: (function () {
      var remaining = +this.get("remaining");
      var minuteLength = +this.get("model.lengths.minute");
      var hourLength = +this.get("model.lengths.hour");
      var dayLength = +this.get("model.lengths.day");
      return Math.floor(remaining / minuteLength / hourLength) % dayLength;
    }).property("remaining", "model.lengths"),

    minutes: (function () {
      var remaining = +this.get("remaining");
      var minuteLength = +this.get("model.lengths.minute");
      var hourLength = +this.get("model.lengths.hour");
      return Math.floor(remaining / minuteLength) % hourLength;
    }).property("remaining", "model.lengths"),

    seconds: (function () {
      var remaining = +this.get("remaining");
      var minuteLength = +this.get("model.lengths.minute");
      return Math.floor(remaining) % minuteLength;
    }).property("remaining", "model.lengths"),

    hasTime: (function () {
      return this.get("hours") || this.get("minutes") || this.get("seconds");
    }).property("hours", "minutes", "seconds"),

    remaining: (function () {
      var now = Math.floor(Date.now() / 1000);
      var ranges = this.get("model.ranges");
      var remaining = ranges.reduce(function (seconds, range) {
        var start = range.start;
        var end = range.end;

        if (start < now) {
          start = now;
        }
        if (end < now) {
          end = now;
        }

        return seconds + end - start;
      }, 0);

      return remaining;
    }).property("model.ranges", "model.lengths", "clock.second")

  });

});
define('countdown/helpers/time-number', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.timeNumber = timeNumber;

  function timeNumber(input) {
    return input < 10 ? "0" + input : input;
  }exports['default'] = Ember['default'].Handlebars.makeBoundHelper(timeNumber);
  exports.__esModule = true;

});
define('countdown/initializers/app-version', ['exports', '../config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;

  exports['default'] = {
    name: "App Version",
    initialize: function (container, application) {
      var appName = classify(application.toString());
      Ember['default'].libraries.register(appName, config['default'].APP.version);
    }
  };

});
define('countdown/initializers/clock-service', ['exports'], function (exports) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    application.inject("route", "clock", "service:clock");
    application.inject("controller", "clock", "service:clock");
  }exports['default'] = {
    name: "clock-service",
    initialize: initialize
  };
  exports.__esModule = true;

});
define('countdown/initializers/export-application-global', ['exports', 'ember', '../config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal) {
      window[classifiedName] = application;
    }
  };

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };
  exports.__esModule = true;

});
define('countdown/router', ['exports', 'ember', './config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route("countdown", { path: "/" });
  });

  exports['default'] = Router;

});
define('countdown/routes/countdown', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return JSON.parse(decodeURIComponent(location.search.substr(1)));
    } });

});
define('countdown/services/clock', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({
    second: null,
    minute: null,
    hour: null,

    init: function () {
      this.tick();
    },

    tick: function () {
      var now = new Date();

      this.setProperties({
        second: now.getSeconds(),
        minute: now.getMinutes(),
        hour: now.getHours() });

      setTimeout(this.tick.bind(this), 1000);
    } });

});
define('countdown/templates/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('countdown/templates/countdown', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n  ");
    stack1 = helpers['if'].call(depth0, "days", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  ");
    stack1 = helpers['if'].call(depth0, "hasTime", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    }
  function program2(depth0,data) {
    
    var buffer = '', stack1;
    stack1 = helpers._triageMustache.call(depth0, "days", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push(" days");
    return buffer;
    }

  function program4(depth0,data) {
    
    var buffer = '', helper, options;
    data.buffer.push(escapeExpression((helper = helpers['time-number'] || (depth0 && depth0['time-number']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "hours", options) : helperMissing.call(depth0, "time-number", "hours", options))));
    data.buffer.push(":");
    data.buffer.push(escapeExpression((helper = helpers['time-number'] || (depth0 && depth0['time-number']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "minutes", options) : helperMissing.call(depth0, "time-number", "minutes", options))));
    data.buffer.push(":");
    data.buffer.push(escapeExpression((helper = helpers['time-number'] || (depth0 && depth0['time-number']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "seconds", options) : helperMissing.call(depth0, "time-number", "seconds", options))));
    return buffer;
    }

    data.buffer.push("\n");
    stack1 = helpers['if'].call(depth0, "remaining", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('countdown/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('countdown/tests/controllers/countdown.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/countdown.js should pass jshint', function() { 
    ok(true, 'controllers/countdown.js should pass jshint.'); 
  });

});
define('countdown/tests/helpers/resolver', ['exports', 'ember/resolver', '../../config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('countdown/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('countdown/tests/helpers/start-app', ['exports', 'ember', '../../app', '../../router', '../../config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('countdown/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('countdown/tests/helpers/time-number.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/time-number.js should pass jshint', function() { 
    ok(true, 'helpers/time-number.js should pass jshint.'); 
  });

});
define('countdown/tests/initializers/clock-service.jshint', function () {

  'use strict';

  module('JSHint - initializers');
  test('initializers/clock-service.js should pass jshint', function() { 
    ok(true, 'initializers/clock-service.js should pass jshint.'); 
  });

});
define('countdown/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('countdown/tests/routes/countdown.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/countdown.js should pass jshint', function() { 
    ok(true, 'routes/countdown.js should pass jshint.'); 
  });

});
define('countdown/tests/services/clock.jshint', function () {

  'use strict';

  module('JSHint - services');
  test('services/clock.js should pass jshint', function() { 
    ok(true, 'services/clock.js should pass jshint.'); 
  });

});
define('countdown/tests/test-helper', ['./helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('countdown/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/controllers/countdown-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:countdown", "CountdownController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('countdown/tests/unit/controllers/countdown-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/countdown-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/countdown-test.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/controllers/days-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:days", "DaysController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('countdown/tests/unit/controllers/days-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/days-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/days-test.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/controllers/hours-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:hours", "HoursController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('countdown/tests/unit/controllers/hours-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/hours-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/hours-test.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/controllers/minutes-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:minutes", "MinutesController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('countdown/tests/unit/controllers/minutes-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/minutes-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/minutes-test.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/controllers/seconds-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("controller:seconds", "SecondsController", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var controller = this.subject();
    ok(controller);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('countdown/tests/unit/controllers/seconds-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/seconds-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/seconds-test.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/helpers/time-number-test', ['countdown/helpers/time-number'], function (time_number) {

  'use strict';

  module("TimeNumberHelper");

  // Replace this with your real tests.
  test("it works", function () {
    var result = time_number.timeNumber(42);
    ok(result);
  });

});
define('countdown/tests/unit/helpers/time-number-test.jshint', function () {

  'use strict';

  module('JSHint - unit/helpers');
  test('unit/helpers/time-number-test.js should pass jshint', function() { 
    ok(true, 'unit/helpers/time-number-test.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/routes/countdown-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:countdown", "CountdownRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('countdown/tests/unit/routes/countdown-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/countdown-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/countdown-test.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/routes/days-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:days", "DaysRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('countdown/tests/unit/routes/days-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/days-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/days-test.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/routes/hours-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:hours", "HoursRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('countdown/tests/unit/routes/hours-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/hours-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/hours-test.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/routes/minutes-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:minutes", "MinutesRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('countdown/tests/unit/routes/minutes-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/minutes-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/minutes-test.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/routes/seconds-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("route:seconds", "SecondsRoute", {});

  ember_qunit.test("it exists", function () {
    var route = this.subject();
    ok(route);
  });
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('countdown/tests/unit/routes/seconds-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/seconds-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/seconds-test.js should pass jshint.'); 
  });

});
define('countdown/tests/unit/services/clock-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor("service:clock", "ClockService", {});

  // Replace this with your real tests.
  ember_qunit.test("it exists", function () {
    var service = this.subject();
    ok(service);
  });
  // Specify the other units that are required for this test.
  // needs: ['service:foo']

});
define('countdown/tests/unit/services/clock-test.jshint', function () {

  'use strict';

  module('JSHint - unit/services');
  test('unit/services/clock-test.js should pass jshint', function() { 
    ok(true, 'unit/services/clock-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

define('countdown/config/environment', ['ember'], function(Ember) {
  var prefix = 'countdown';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("countdown/tests/test-helper");
} else {
  require("countdown/app")["default"].create({"name":"countdown","version":"0.0.0.582c5683"});
}

/* jshint ignore:end */
//# sourceMappingURL=countdown.map