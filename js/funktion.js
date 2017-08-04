function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
$(document).ready(function() {
    $("#search").hide();
    $("#knapp").click(function() {
        $("#search").toggle('1000');
    });
});

// Initialize Firebase

var config = {
  apiKey: "AIzaSyBWqkMwFW8bIZ9-lUl4KFAyQJDD_7nP35g",
  authDomain: "kommentarer-7e551.firebaseapp.com",
  databaseURL: "https://kommentarer-7e551.firebaseio.com",
  projectId: "kommentarer-7e551",
  storageBucket: "kommentarer-7e551.appspot.com",
  messagingSenderId: "813101817572"
};
firebase.initializeApp(config);

var app = angular.module("app", ["firebase"]);

app.factory("kommentarer", function($firebaseArray) {
    var ref = firebase.database().ref().child("kommentarer");
    return $firebaseArray(ref);
  }
);

app.controller("KommentarCtrl", function($scope, kommentarer) {
    $scope.kommentarer = kommentarer;

    $scope.kommentar = {
    text: "",
    skribent: ""
    };
    
    $scope.addComment = function() {
        // Här lägger vi till vår kommentar ($scope.kommentar) till listan med kommentarer.
        // Det sparas automatiskt i Firebase-databasen.
        $scope.kommentarer.$add($scope.kommentar);

        // Tömmer texten i kommentarfältet
        $scope.kommentar = {
            text: "",
            skribent: ""
        };
    };
  }
);