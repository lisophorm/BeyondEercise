(function() {
  'use strict';

  angular
    .module('neosEx01')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout,$http) {
    var vm = this;

    vm.tweetList=[
      {text:"bella ciao"},
      {text:"riga 2"},
      {text:"riga 3"}
    ]

    vm.categories=[
      'uno',
      'due',
      'tre',
      'quattro'
    ]

    vm.searchString="12312321";

    vm.search=function() {
      console.log('search',vm.searchString);
    }

    $http.get('http://neos.crystal-bits.co.uk/neos.php', {
        params:  {hash:1,string:"epicfail"},
        //headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
      }
    )
      .then(function(response) {
        console.log('response',response);
        if(response.data.statuses.length >0) {
          console.log('"I HAVE SHIT');
          vm.tweetList=[];
          for (var i=0;i<response.data.statuses.length;i++) {
            var current=response.data.statuses[i];
            console.log(current.user.profile_image_url);
            var thisTweet={
              name:current.user.name,
              text:current.text,
              face:current.user.profile_image_url
            }
            //console.log(thisTweet);
            vm.tweetList.push(thisTweet);
          }
        }
        // Request completed successfully
      }, function(x) {
        console.log('error',x);
      });
  }
})();
