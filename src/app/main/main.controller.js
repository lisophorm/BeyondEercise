(function () {
  'use strict';

  angular
    .module('neosEx01')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $http, $mdDialog, Tweets, CatTweets, $scope, $mdMedia) {
    var vm = this;

    vm.tweetsType = 0;
    vm.loadInProgress=false;

    vm.tweetList = [
    ];

    vm.catTweetList = [];


    vm.categories = [
      {label: 'category one'},
      {label: 'category two'},
      {label: 'categor three'},
    ]

    $scope.$watch(function () {
      return $mdMedia('gt-sm');
    }, function (big) {
      console.log("**************", big);
      console.log($mdMedia('gt-sm'));
      vm.openNav = $mdMedia('gt-sm');


      $scope.bigScreen = big;
    });


    vm.catclick = function (parentIndex, index) {
      console.log('click on index', parentIndex, index);
      vm.tweetList[parentIndex].category = index;
      vm.catTweetList=CatTweets.addTweet(vm.tweetList[parentIndex], index);
    }

    vm.showCat = function (index) {
      console.log('show category', index);

      //vm.catTweetList = CatTweets.returnCat(index);
      vm.selectedCat = vm.categories[index].label;
      vm.selectedCatIndex=index;
      vm.tweetsType = 1;
    }

    vm.deleteCat = function (index) {
      console.log('delete category', index);
      for (var i = 0; i < vm.tweetList.length; i++) {
        if (vm.tweetList[i].category == index) {
          console.log('deleting', vm.tweetList[i].category);
          delete vm.tweetList[i].category;
        }
      }
      vm.catTweetList = [];
      vm.categories.splice(index, 1)
      delete vm.selectedCat;
      vm.tweetsType = 0;
    }

    vm.createCategory = function (ev, tweet, category) {
      // Appending dialog to document.body to cover sidenav in docs app
      var ciao = 3;
      var confirm = $mdDialog.prompt()
      //     .title('Input modal')
        .textContent('Please type the name of the new category')
        .placeholder('type category here')
        //    .ariaLabel('Dog name')
        //   .initialValue('Buddy')
        .targetEvent(ev)
        .ok('Okay!')
        .cancel('cancel');

      $mdDialog.show(confirm).then(function (result) {
        vm.categories.push({label: result});
        console.log(ciao);
        if (typeof tweet !== 'undefined') {
          console.log('********* add to towwetsd ', tweet, category);
          vm.tweetList[tweet].category=vm.categories.length-1;
          vm.catTweetList=CatTweets.addTweet(vm.tweetList[tweet], vm.categories.length-1);
        }
      }, function () {
        //$scope.status = 'You didn\'t name your dog.';
      });
    };

    vm.removeTweet=function(index) {
      console.log('removing categorized',index);
      vm.catTweetList=CatTweets.removeTweet(index);
      vm.tweetList=Tweets.checkForCats(vm.catTweetList);
      console.log('removed tweet new list');
      console.log(vm.catTweetList);
    }

    vm.searchTweets = function (searchString, isHash) {
      vm.loadInProgress=true;
      Tweets.searchTweets(searchString, isHash)
        .then(function (response) {
          vm.tweetList = response;
          vm.loadInProgress=false;

        }, function (x) {
          vm.loadInProgress=false;
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
          console.log('error', x);
        });
    }

    vm.search = function () {
      console.log('search', vm.searchString);
      vm.searchTweets(vm.searchString,true);
    }

    vm.searchTweets ("epicfail",true);

  }
})();
