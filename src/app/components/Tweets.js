// stores and manages the current search result from the twitter api

(function () {
  'use strict';

  angular
    .module('neosEx01')
    .factory('Tweets', Tweets);

  function Tweets($http, $q,configVar) {

    var tweetList = [];

    var searchTweets = function (searchString, isHash) {
      var deferred = $q.defer();

      var hash = isHash == true ? "1" : "0";

      $http.get(configVar.twitterProxyURL, {
          params: {hash: hash, string: searchString}
        //headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
        }
      )
        .then(function (response) {
          if (response.data.statuses.length > 0) {
            tweetList = [];
            for (var i = 0; i < response.data.statuses.length; i++) {
              var current = response.data.statuses[i];
              var thisTweet = {
                id: current.id,
                name: current.user.name,
                text: current.text,
                face: current.user.profile_image_url
              };
              tweetList.push(thisTweet);
            }
          }
          deferred.resolve(tweetList);
        }, function (x) {
          deferred.reject(x);
        });

      return deferred.promise;
    };

    // check if the current search result contains any of the tweets stored previously
    // and synchronize the category attribute

    var checkForCats = function (catTweets) {
      for (var i = 0; i < tweetList.length; i++) {
        var foundTweet = false;
        for (var a = 0; a < catTweets.length; a++) {
          if (tweetList[i].id == catTweets[a].id) {
            foundTweet = true;
            tweetList[i].category = catTweets[a].category;
          }
        }
        if (!foundTweet) {
          delete tweetList[i].category;
        }
      }
      return tweetList;
    };


    var service = {
      searchTweets: searchTweets,
      checkForCats: checkForCats
    };

    return service;
  }
})();
