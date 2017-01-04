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

    if (window.localStorage.getItem('last_login') != new Date().getDate()) {
        myApp.models.user.dailyReset();
    }
});
