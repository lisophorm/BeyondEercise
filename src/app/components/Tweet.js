(function() {
  'use strict';

  angular
    .module('neosEx01').factory('Tweet', ['$http', function($http) {
  function Tweet(tweetData) {
    if (tweetData) {
      this.setData(tweetData);
    }
    // Some other initializations related to book
  };
  Tweet.prototype = {
    setData: function(tweetData) {
      angular.extend(this, tweetData);
    },

  };
  return Tweet;
}]);
})();
