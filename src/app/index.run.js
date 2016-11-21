(function() {
  'use strict';

  angular
    .module('neosEx01')
    .run(runBlock);

  /** @ngInject */
  function runBlock(configVar,$twitterApi,$base64,$http) {


    var consumerKey = encodeURIComponent('61188275-GFemQpO5DjCcHZJhYyy5gPwU2wiJHHN8ZCUHPLJsQ');
    var consumerSecret = encodeURIComponent('maIGgGMAQ8aaXJBlDa9eYyWvHSJz0rKZ1TTZRtQy2ho');
    var credentials = $base64.encode(consumerKey + ':' + consumerSecret)
    // Twitters OAuth service endpoint
    var twitterOauthEndpoint = $http.post(
      'https://api.twitter.com/oauth2/token'
      , "grant_type=client_credentials"
      , {headers: {'Authorization': 'Basic ' + credentials, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}
    )
    twitterOauthEndpoint.success(function (response) {
      console.log('success',response);
      // a successful response will return
      // the "bearer" token which is registered
      // to the $httpProvider
      $httpProvider.defaults.headers.common['Authorization'] = "Bearer " + response.access_token
    }).error(function (response) {
      console.log('error',response);
      // error handling to some meaningful extent
    })

  }

})();
