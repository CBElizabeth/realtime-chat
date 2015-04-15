angular.module('starter.controllers', ['firebase'])

.controller('ChatsCtrl', ['$scope', '$firebaseArray', '$rootScope',
    function ($scope, $firebaseArray, $rootScope) {
        var ref = new Firebase('https://rt-chat-tut.firebaseio.com/');
        $scope.chats = $firebaseArray(ref);

        $scope.sendChat = function (chat) {
            if ($rootScope.authData) {
                $scope.chats.$add({
                    user: $rootScope.authData.twitter.username,
                    message: chat.message,
                    imgURL: $rootScope.authData.twitter.cachedUserProfile.profile_image_url
                });
                chat.message = "";
            } else {
              alert('You must log in on the account page to chat!')
            }
        }

}])

.controller('AccountCtrl', function ($scope, $rootScope) {
    $scope.login = function () {
      var ref = new Firebase('https://rt-chat-tut.firebaseio.com');
      ref.authWithOAuthPopup('twitter', function (error, authData) {
        if (error) {
          alert('There was an error.');
        } else {
          alert('You have logged in!');
        }
        $rootScope.authData = authData;
        });
    }
});
