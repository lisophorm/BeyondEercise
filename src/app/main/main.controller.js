(function() {
  'use strict';

  angular
    .module('neosEx01')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout,$http,$mdDialog,Tweets,CatTweets) {
    var vm = this;

    vm.tweetList=[
      {text:"bella ciao"},
      {text:"riga 2"},
      {text:"riga 3"}
    ];

    vm.catTweetList=[];



    vm.categories=[
      {label:'uno'},
      {label:'due'},
      {label:'tre'},
    ]

    vm.searchString="12312321";

    vm.search=function() {
      console.log('search',vm.searchString);
    }

    vm.catclick = function(parentIndex,index) {
      console.log('click on index',parentIndex,index);
      CatTweets.addTweet(vm.tweetList[parentIndex],index);
    }

    vm.showCat=function(index) {
      console.log('show category',index);
    }

    vm.createCategory= function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var ciao=3;
      var confirm = $mdDialog.prompt()
   //     .title('Input modal')
        .textContent('Please type the name of the new category')
        .placeholder('type category here')
    //    .ariaLabel('Dog name')
     //   .initialValue('Buddy')
        .targetEvent(ev)
        .ok('Okay!')
        .cancel('cancel');

      $mdDialog.show(confirm).then(function(result) {
        vm.categories.push({label:result});
        console.log(ciao);
      }, function() {
        //$scope.status = 'You didn\'t name your dog.';
      });
    };

    Tweets.searchTweets('fail',true)
      .then(function(response) {
        vm.tweetList=response;

      }, function(x) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Error')
            .textContent(JSON.stringify(x.data))
            .ariaLabel('Alert error')
            .ok('Got it!')
            //.targetEvent(ev)
        );
        console.log('error',x);
      });
  }
})();
