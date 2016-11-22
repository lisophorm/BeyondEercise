(function () {
  'use strict';

  angular
    .module('neosEx01')
    .factory('Tweets', Tweets);

  /** @ngInject */
  function Tweets($http, $q) {

    var searchTweets = function (searchString, isHash) {
      var deferred = $q.defer();

      var hash = isHash == true ? "1" : "0";

      var tweetList = [];

      $http.get('http://neos.crystal-bits.co.uk/neos.php', {
          params: {hash: hash, string: searchString},
          //headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
        }
      )
        .then(function (response) {
          console.log('response', response);
          if (response.data.statuses.length > 0) {
            console.log('"I HAVE SHIT');
            tweetList = [];
            for (var i = 0; i < response.data.statuses.length; i++) {
              var current = response.data.statuses[i];
              console.log(current.user.profile_image_url);
              var thisTweet = {
                id: current.id,
                name: current.user.name,
                text: current.text,
                face: current.user.profile_image_url
              }
              console.log(thisTweet);
              tweetList.push(thisTweet);
            }
          }
          deferred.resolve(tweetList);
          // Request completed successfully
        }, function (x) {
          console.log('error', x);
          deferred.reject(x);
        });

      return deferred.promise;
    }

    var checkForCats = function (catTweets) {
      for (var i = 0; i < tweetList.length; i++) {
        for (var a = 0; a < catTweets.length; a++) {
          if (tweetList[i].id == catTweets[a].id) {
            console.log('we have a match', catTweets[a]);
            tweetList[i].category = catTweets[a].category;
          }
        }
      }
      return tweetList;
    }

    function search(nameKey, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
          return true;
        }
      }
    }

    var service = {
      searchTweets: searchTweets,
      checkForCats:checkForCats

    };

    return service;
  }
})();
