window.myApp = {};

ons.ready(function() {
    document.addEventListener('init', function(event) {
        var page = event.target;
        if (myApp.controllers.hasOwnProperty(page.id)) {
            myApp.controllers[page.id](page);
        }
    });

    //If there's no saved data on this device, then initialize storage
    if (!window.localStorage.getItem('point')) {
        myApp.models.initializeStorage();
    }

    if (!window.localStorage.getItem('time_challenge')) {
        myApp.models.timeChallenge.off(); //TODO: initialize time_challenge update in test, need to be deleted when released
    }

    if (!window.localStorage.getItem('todolist')) {
        window.localStorage.setItem('todolist', JSON.stringify({todolist:[{"task": "Sample Task 1"}, {"task": "Sample Task 2"}]}));; //TODO: initialize todolist update in test, need to be deleted when released
    }

    if (window.localStorage.getItem('last_login') != new Date().getDate()) {
        myApp.models.user.dailyReset();
    }

});
