(function () {
  'use strict';

  angular
    .module('neosEx01')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $http, $mdDialog, Tweets, CatTweets, $scope, $mdMedia, $mdSidenav,$mdToast) {
    var vm = this;

    // position of the tab 0=search 1=categories
    vm.tweetsType = 0;

    vm.loadInProgress = false;

    // current search results
    vm.tweetList = [];

    // tweets with categories
    vm.catTweetList = [];

    vm.hashtag = "";

    vm.categories = [
      {label: 'test category'}
    ]

    // checks for screen resize and update media query flag

    $scope.$watch(function () {
      return $mdMedia('gt-sm');
    }, function (big) {
      vm.openNav = $mdMedia('gt-sm');
    });


    // add tweet to a category

    vm.catclick = function (parentIndex, index) {
      vm.tweetList[parentIndex].category = index;
      vm.catTweetList = CatTweets.addTweet(vm.tweetList[parentIndex], index);
    }

    // displays selected category
    // only if tweets >0
    vm.showCat = function (index) {

      if(countTweetsForCat(index)>0) {
        vm.selectedCat = vm.categories[index].label;
        vm.selectedCatIndex = index;
        vm.tweetsType = 1;
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('No tweets for this category')
            .position("top left")
            .hideDelay(3000)
        );
      }

    }

    function countTweetsForCat(index) {
      var count=0;
      for(var i=0;i<vm.catTweetList.length;i++) {
        if (vm.catTweetList[i].category==index) {
          count++;
        }
      }
      return count;
    }

    // deletes category and relative tweets
    vm.deleteCat = function (index) {
      for (var i = 0; i < vm.tweetList.length; i++) {
        if (vm.tweetList[i].category == index) {
          delete vm.tweetList[i].category;
        }
      }
      vm.catTweetList = CatTweets.deleteCat(index);
      vm.categories.splice(index, 1)
      delete vm.selectedCat;
      vm.tweetsType = 0;
    }

    // create new category
    // if called from the list of tweets will add the selected tweet to the new category

    vm.createCategory = function (ev, tweet, category) {
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
        if (typeof result !== "undefined") {
          vm.categories.push({label: result});
          // adds the tweet
          if (typeof tweet !== 'undefined') {
            vm.tweetList[tweet].category = vm.categories.length - 1;
            vm.catTweetList = CatTweets.addTweet(vm.tweetList[tweet], vm.categories.length - 1);
          }
        }
      }, function () {
        // pressed cancel
      });
    };

    // removes a tweet from the category
    vm.removeTweet = function (index) {
      vm.catTweetList = CatTweets.removeTweet(index);
      vm.tweetList = Tweets.checkForCats(vm.catTweetList);
      // if no more tweets in that category we hide the tab
      if(countTweetsForCat(vm.selectedCatIndex)==0) {
        delete vm.selectedCat;
        vm.tweetsType = 0;
      }
    }

    // search for new tweets

    vm.searchTweets = function (searchString, isHash) {

      vm.loadInProgress = true;
      Tweets.searchTweets(searchString, isHash)
        .then(function (response) {
          vm.searchString = "";
          // checks if any of the results have been selected previously
          // amd adds the category
          vm.tweetList = Tweets.checkForCats(vm.catTweetList);
          vm.loadInProgress = false;
          vm.tweetsType = 0;
        }, function (x) {
          vm.loadInProgress = false;
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
        });
    }

    vm.search = function () {
      // I know this is not very raffinate...
      if (vm.searchString == "") {
        return false;
      }
      vm.searchTweets(vm.hashtag + vm.searchString, true);
    }

    vm.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

    vm.searchTweets("#epicwin", true);

  }
})();
