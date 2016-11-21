(function() {
  'use strict';

  angular
    .module('neosEx01')
    .factory('CatTweets', CatTweets);

  /** @ngInject */
  function CatTweets($http) {

    var tweetList=[];

    var addTweet=function(tweet,category) {
      var thisTweet=angular.copy(tweet);
      thisTweet.category=category;
      tweetList.push(thisTweet);
      console.log('added twweewt',tweetList);
    }

    var returnCat=function(catID) {

    }

    var service = {
      addTweet:addTweet,
      returnCat:returnCat

    };

    return service;

  }
})();
