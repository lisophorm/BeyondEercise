(function() {
  'use strict';

  angular
    .module('neosEx01')
    .config(config);

  /** @ngInject */
  function config(configVar) {
    console.log('ciao');
    console.log(configVar.twitteroauthToken);
    //
  }

})();
