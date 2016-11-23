(function () {
  'use strict';

  angular
    .module('neosEx01')
    .factory('CatTweets', CatTweets);

  // Manages the tweets selected and categorized by the user

  function CatTweets() {

    var tweetList = [];

    var addTweet = function (tweet, category) {
      var thisTweet = angular.copy(tweet);
      thisTweet.category = category;
      tweetList.push(thisTweet);

      return tweetList;
    };

    var removeTweet = function (catID) {
      var returnList = [];
      for (var i = 0; i < tweetList.length; i++) {
        if (tweetList[i].id !== catID) {

          returnList.push(tweetList[i]);

        } else {

        }
      }
      tweetList = angular.copy(returnList);
      return returnList;
    };

    var returnCat = function (catID) {
      var returnList = [];
      for (var i = 0; i < tweetList.length; i++) {
        if (tweetList[i].category == catID) {
          returnList.push(tweetList[i]);
        }
      }
      return returnList;
    };

    var deleteCat = function (catID) {
      var returnList = [];
      for (var i = 0; i < tweetList.length; i++) {
        if (tweetList[i].category != catID) {

          returnList.push(tweetList[i]);

        }
      }
      tweetList = angular.copy(returnList);
      return returnList;
    };

    var service = {
      addTweet: addTweet,
      returnCat: returnCat,
      deleteCat: deleteCat,
      removeTweet: removeTweet
    };

    return service;

  }
})();
