window.myApp = {};

ons.ready(function() {
    document.addEventListener('init', function(event) {
        var page = event.target;
        if (myApp.controllers.hasOwnProperty(page.id)) {
            myApp.controllers[page.id](page);
        }
    });

    //If there's no saved data on this device, then initialize storage
    myApp.models.initializeStorage();


    //Reset day
    if (window.localStorage.getItem('last_login') != new Date().getDate()) {
        myApp.models.user.dailyReset();
    }

    //Initialization of Theme
    document.getElementById('onsenui-theme').setAttribute("href", "node_modules/onsenui/css/onsen-css-components" + myApp.models.get('theme') + ".css");

});
