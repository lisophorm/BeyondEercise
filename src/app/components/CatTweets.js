(function () {
  'use strict';

  angular
    .module('neosEx01')
    .factory('CatTweets', CatTweets);

  /** @ngInject */
  function CatTweets($http) {

    var tweetList = [];

    var addTweet = function (tweet, category) {
      var thisTweet = angular.copy(tweet);
      thisTweet.category = category;
      tweetList.push(thisTweet);
      console.log('added twweewt', tweetList);
      return tweetList;
    }

    var removeTweet = function (catID) {
      var returnList = [];
      for (var i = 0; i < tweetList.length; i++) {
        if (tweetList[i].id !== catID) {
          console.log('tweet not to delete a new tweet')
          returnList.push(tweetList[i]);

        } else {
          console.log('this tweet will be deleted');
        }
      }
      return returnList;
    }

    var returnCat = function (catID) {
      var returnList = [];
      for (var i = 0; i < tweetList.length; i++) {
        if (tweetList[i].category == catID) {
          console.log('add a new tweet')
          returnList.push(tweetList[i]);

        }
      }
      return returnList;
    }

    var deleteCat = function (catID) {
      var returnList = [];
      for (var i = 0; i < tweetList.length; i++) {
        if (tweetList[i].category != catID) {
          console.log('add a new tweet')
          returnList.push(tweetList[i]);

        }
      }

      tweetList=angular.copy(returnList);

      return returnList;
    }

    var service = {
      addTweet: addTweet,
      returnCat: returnCat,
      deleteCat:deleteCat,
      removeTweet:removeTweet
    };

    return service;

  }
})();
