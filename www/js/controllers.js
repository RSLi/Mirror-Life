myApp.controllers = {
    menuPage: function(page) {
        function bindPage(buttonId, target) {
            page.querySelector(buttonId).onclick = function() {
                var content = document.getElementById('content');
                var menu = document.getElementById('menu');
                content.load(target).then(menu.close.bind(menu));
            };
        }

        bindPage('#menu-home', 'html/home.html');
        bindPage('#menu-settings', 'html/settings.html');
    },

    homePage: function(page) {
        page.querySelector('#btn-splitter-toggle').onclick = function() {
            document.querySelector('#mySplitter').left.toggle();
        };

        page.querySelector('#btn-increase-point').onclick = function() {
            var changeAmount = 1 * myApp.models.user.getMultiplier();
            myApp.models.user.increasePoint(changeAmount);
            myApp.views.homePage.render(page);
        };

        page.querySelector('#btn-decrease-point').onclick = function() {
            var changeAmount = -1;
            myApp.models.user.increasePoint(changeAmount);
            myApp.views.homePage.render(page);
        };

        page.querySelector('#btn-increase-multiplier').onclick = function() {
            var original = parseInt(myApp.models.user.getMultiplier());
            var result = original + 1;
            if (result > 3){
                result = 3;
            }
            myApp.models.user.setMultiplier(result);
            myApp.views.homePage.render(page);
        };

        page.querySelector('#btn-decrease-multiplier').onclick = function() {
            var original = parseInt(myApp.models.user.getMultiplier());
            var result = original - 1;
            if (result < 1){
                result = 1;
            }
            myApp.models.user.setMultiplier(result);
            myApp.views.homePage.render(page);
        };

        myApp.views.homePage.render(page);
    },

    settingsPage: function(page) {
        page.querySelector('#btn-splitter-toggle').onclick = function() {
            document.querySelector('#mySplitter').left.toggle();
        };

        
    }

};
