angular.module('starter.controllers', ['ionic', 'ngCordova', 'ion-datetime-picker', 'starter.services'])

.controller('MenuCtrl', function($scope, $state, $ionicHistory){
  var navOptions ={
    disableAnimate: false,
    disableBack: true
    
  };

  $scope.goToNews = function(){
    $ionicHistory.nextViewOptions(navOptions);
    $state.go('tabs.allnews');
  }

  $scope.goToSettings = function(){
    $ionicHistory.nextViewOptions(navOptions);
    $state.go('settings');
  }

  $scope.goToAboutUs = function(){
    $ionicHistory.nextViewOptions(navOptions);
    $state.go('aboutus');
  }

  $scope.goToProfile = function(){
    $ionicHistory.nextViewOptions(navOptions);
    $state.go('profile');
  }
  $scope.goToLogin = function(){
    $ionicHistory.nextViewOptions(navOptions);
    $state.go('login');
  }
})

.controller('LoginCtrl',function($scope, $ionicHistory, UserService ,$state, $ionicLoading){
  $scope.googleSignIn = function(){
    
    $ionicLoading.show({
      template: 'Logging in...'
    });

    window.plugins.googleplus.login({},
    function(user_data){
      console.log(user_data);

      UserService.setUser({
        userID: user_data.userId,
        name: user_data.displayName,
        email: user_data.email,
        picture: user_data.imageUrl,
        accessToken: user_data.accessToken,
        idToken: user_data.idToken
      });
      $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
      })
      $ionicLoading.hide();
      $state.go('tabs.allnews')

    }, function(msg){
      $ionicLoading.hide();
    })
  }

  $scope.Login = function(){
    $state.go('tabs.allnews');
  } 
})

.controller('ProfileCtrl', function($scope, UserService){
  $scope.gotData = UserService.getUser();

  
})

.controller('SettingsCtrl', function($scope, $root, $ionicSideMenuDelegate){
})

.controller('AboutUsCtrl', function($scope, $root, $ionicSideMenuDelegate){
})

.controller('NewsByDateCtrl', function($scope, $rootScope, $ionicSideMenuDelegate, $http){
  $rootScope.dateValue = new Date();
  console.log($rootScope.dateValue);


  $rootScope.go = function(){
    window.open("https://github.com/katemihalikova/ion-datetime-picker", "_blank");
  }
  $scope.news = [];


})

.controller('AllNewsCtrl', function($scope, $http, $cordovaInAppBrowser, $timeout){
  
  $scope.page = 1; 

  $scope.doRefresh = function(){
    $scope.news= [];
    $http({
      method: 'Get',
      url: 'https://newsapi.org/v2/everything?sources=cnn,bbc-news&page=1&sortBy=popularity&apiKey=87238f079d8a4eebbc3b2010c7efbef0'
    }).then(function(newsdata){
      angular.forEach(newsdata.data.articles, function(newsArticle){
        $scope.news.push(newsArticle);
      })
    
    })
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.loadMore = function() {
    $scope.page++;
    var parameter = {
      page: $scope.page
    }
    $http.get('https://newsapi.org/v2/everything?sources=cnn,bbc-news&sortBy=popularity&apiKey=87238f079d8a4eebbc3b2010c7efbef0', {params: parameter}).then(function(newsdata){
      angular.forEach(newsdata.data.articles, function(newsArticle){
        $scope.news.push(newsArticle);
      })
    })
    $scope.$broadcast('scroll.infiniteScrollComplete');
  }

  $scope.news = [];

  $http({
    method: 'Get',
    url: 'https://newsapi.org/v2/everything?sources=cnn,bbc-news&page=1&sortBy=popularity&apiKey=87238f079d8a4eebbc3b2010c7efbef0'
  }).then(function(newsdata){
    angular.forEach(newsdata.data.articles, function(newsArticle){
      $scope.news.push(newsArticle);
    })
    
  
  })


})


