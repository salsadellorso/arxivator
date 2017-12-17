const app =  angular.module("app", []);

app.controller("Controlla", function ($http) {
    const app = this;
    var tempInput = "https://rateyourmusic.com/";

    $http.get("/api/bookmark").then(function (data) {
        app.bms = data.data.objects;
    });

    app.addBookmark = function () {

        $http.post("api/bookmark", {"title": "default", "content": tempInput})
            .then(function (response) {
                app.bms.push(response);
                tempInput = "";
            })
    };

    app.deleteBookmark = function (bookmark) {
        $http.delete("api/bookmark/" + bookmark.id)
            .then(function (response) {
                app.bms.splice(app.bms.indexOf(bookmark), 1);
                console.log("Delete", response);
            })
    };

    app.updateBookmark = function (bookmark) {
        console.log(bookmark.id);
        $http.put("api/bookmark/" + bookmark.id, bookmark)
            .then(function (response) {
                console.log("update suc", response);
            })
    };
});
