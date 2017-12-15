'use strict';

/* Directives */


angular.module('GXLeads.directives', []).
	directive('mainarea', function($http) {
    return {
        template: 'community2.html',
        scope: {
            createtodo: '&'
        }
    }
});
            

