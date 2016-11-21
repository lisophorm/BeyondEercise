(function() {
  'use strict';

  angular
    .module('neosEx01')
    .factory('Tweets', Tweets);

  /** @ngInject */
  function Tweets($http,$q) {

    var searchTweets=function(searchString,isHash) {
      var deferred = $q.defer();

      var hash=isHash==true?"1":"0";

      $http.get('http://neos.crystal-bits.co.uk/neos.php', {
          params:  {hash:hash,string:searchString},
          //headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
        }
      )
        .then(function(response) {
          console.log('response',response);
          if(response.data.statuses.length >0) {
            console.log('"I HAVE SHIT');
            var tweetList=[];
            for (var i=0;i<response.data.statuses.length;i++) {
              var current=response.data.statuses[i];
              console.log(current.user.profile_image_url);
              var thisTweet={
                name:current.user.name,
                text:current.text,
                face:current.user.profile_image_url
              }
              //console.log(thisTweet);
              tweetList.push(thisTweet);
            }
          }
          deferred.resolve(tweetList);
          // Request completed successfully
        }, function(x) {
          console.log('error',x);
          deferred.reject(x);
        });

      return deferred.promise;
    }

    var service = {
      searchTweets:searchTweets

    };

    return service;
  }
})();
