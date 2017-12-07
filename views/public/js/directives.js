'use strict';

/* Directives */

angular.module('GXLeads.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });