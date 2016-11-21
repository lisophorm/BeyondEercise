(function() {
  'use strict';

  angular
    .module('neosEx01')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
