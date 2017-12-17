const app =  angular.module("app", []);

app.controller("Controlla", function ($scope, $http) {
    const app = this;

    $http.get("/api/bookmark").then(function (data) {
        app.bms = data.data.objects;
    });

    app.addBookmark = function () {

        $http.post("api/bookmark", {"title": $scope.title, "content": $scope.content})
            .then(function (response) {
                app.bms.push(response);
                console.log("Added: ", response);
            })
    };

    app.deleteBookmark = function (bookmark) {
        $http.delete("api/bookmark/" + bookmark.id)
            .then(function (response) {
                app.bms.splice(app.bms.indexOf(bookmark), 1);
                console.log("Deleted: ", response);
            })
    };

    app.updateBookmark = function (bookmark) {
        console.log(bookmark.id);
        $http.put("api/bookmark/" + bookmark.id, bookmark)
            .then(function (response) {
                console.log("Updated: ", response);
            })
    };
});
