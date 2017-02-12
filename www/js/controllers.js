myApp.controllers = {
    menuPage: function(page) {
        function bindPage(buttonId, target) {
            document.getElementById(buttonId).onclick = function() {
                var content = document.getElementById('content');
                var menu = document.getElementById('menu');
                content.load(target).then(menu.close.bind(menu));
            };
        }

        bindPage('menu-home', 'html/home.html');
        bindPage('menu-time-challenge', 'html/time_challenge.html');
        bindPage('menu-settings', 'html/settings.html');
        bindPage('menu-todo', 'html/todo.html');
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

    timeChallengePage: function(page) {
        page.querySelector('#btn-splitter-toggle').onclick = function() {
            document.querySelector('#mySplitter').left.toggle();
        };

        page.querySelector('#btn-challenge-start').onclick = function() {
            //TODO Add validation logic
            var taskName = page.querySelector('#input-text-taskname').value;
            var duration = page.querySelector('#input-text-duration').value;
            var reward = page.querySelector('#input-text-reward').value;
            var endTime = moment().add(parseInt(duration), 'm');
            myApp.models.timeChallenge.on(endTime, parseInt(reward), taskName);
            myApp.views.timeChallengePage.render(page);
        };

        page.querySelector('#btn-challenge-complete').onclick = function() {
            var challenge_data = myApp.models.timeChallenge.getData();
            var reward = parseInt(challenge_data.reward_point);
            myApp.models.user.increasePoint(reward);
            myApp.models.timeChallenge.off();
            myApp.views.timeChallengePage.render(page);
        };

        page.querySelector('#btn-challenge-abandon').onclick = function() {
            myApp.models.timeChallenge.off();
            myApp.views.timeChallengePage.render(page);
        };

        myApp.views.timeChallengePage.render(page);
    },

    settingsPage: function(page) {
        page.querySelector('#btn-splitter-toggle').onclick = function() {
            document.querySelector('#mySplitter').left.toggle();
        };

        function bindPromptToData(promptBtnId, storageKey) {
            document.getElementById(promptBtnId).onclick = function() {
                ons.notification.prompt({message: 'New Value'})
                .then(function(value) {
                    if (isNaN(parseInt(value))) {
                        ons.notification.alert('The value must be an integer');
                    } else {
                        myApp.models.set(storageKey, parseInt(value));
                    }
                    myApp.views.settingsPage.render(page);
                });
            };
        }

        bindPromptToData('btn-prompt-point', 'point');
        bindPromptToData('btn-prompt-day', 'day');


        page.querySelector('#btn-reset').onclick = function() {
            ons.notification.confirm({message: 'Really Reset?'})
            .then(function(value) {
                if (value == 1) {
                    myApp.models.set('point', 0);
                    myApp.models.set('today_point', 0);
                    myApp.models.set('day', 0);
                }
                myApp.views.settingsPage.render(page);
            });
        };

        page.querySelector('#btn-random').onclick = function() {
            var min = 1;
            var max = 10;
            var random = Math.floor(Math.random() * (max - min + 1)) + min;
            ons.notification.alert({message: random});
        };

        page.querySelector('#btn-themes').onclick = function() {
            if (myApp.models.get('theme') == "") {
                myApp.models.set('theme', "-dark-theme");
            } else if (myApp.models.get('theme') == "-dark-theme") {
                myApp.models.set('theme', ""); // Can add more themes here
            } else {
                myApp.models.set('theme', "");
            }
            document.getElementById('onsenui-theme').setAttribute("href", "node_modules/onsenui/css/onsen-css-components" + myApp.models.get('theme') + ".css");
        };

        myApp.views.settingsPage.render(page);
    },

    todoPage: function(page) {
        page.querySelector('#btn-splitter-toggle').onclick = function() {
            document.querySelector('#mySplitter').left.toggle();
        };

        page.querySelector('#btn-create-todo').onclick = function() {
            ons.notification.prompt({message: 'New Todo'})
                .then(function(value) {
                    myApp.models.todolist.add(value);
                    myApp.views.todoPage(page);
                });
        };

        myApp.views.todoPage(page);
    }

    // petPage: function(page) {
    //     //Starting from this module, use model.setJSON for model operations
    //     if (!myApp.models.get('pet')) {
    //         myApp.models.setJSON({
    //             "name": "Love",
    //             "food": 50,
    //             "health": 50,
    //             "action_point": 10
    //         });
    //     }
    //     myApp.views.petPage(page);
    // }

};
