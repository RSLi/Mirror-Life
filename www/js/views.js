myApp.views = {
    homePage: {
        render: function(page) {
            var point = myApp.models.user.getPoint();
            var day = myApp.models.user.getDay();
            var today_point = myApp.models.user.getTodayPoint();
            var multiplier = myApp.models.user.getMultiplier();
            var hour = new Date().getHours();

            page.querySelector('#field-level').innerHTML = Math.floor(point / 10);
            page.querySelector('#field-day').innerHTML = day;
            page.querySelector('#field-exp').value = point % 10 * 10;
            page.querySelector('#field-total-point').innerHTML = point;
            page.querySelector('#field-total-today').innerHTML = today_point;

            //Rendering Achievement Icon (badge)
            if (point < 500) {
                page.querySelector('#field-icon-achievement').setAttribute("icon", "ion-university");
            } else if (point < 1000) {
                page.querySelector('#field-icon-achievement').setAttribute("icon", "ion-ribbon-a");
            } else {
                page.querySelector('#field-icon-achievement').setAttribute("icon", "ion-trophy");
            }

            //Rendering Stamina Icon
            var iconStamina = page.querySelector('#field-icon-stamina');
            if (hour >= 23) {
                iconStamina.setAttribute("icon", "ion-battery-empty");
            } else if (hour >= 18) {
                iconStamina.setAttribute("icon", "ion-battery-low");
            } else if (hour >= 13) {
                iconStamina.setAttribute("icon", "ion-battery-half");
            } else if (hour >= 7) {
                iconStamina.setAttribute("icon", "ion-battery-full");
            } else {
                iconStamina.setAttribute("icon", "ion-battery-charging");
            }

            //Rendering Multiplier Icon
            var iconMultiplier = page.querySelector('#field-icon-multiplier');
            if (multiplier == 1) {
                iconMultiplier.setAttribute("icon", "ion-volume-low");
            } else if (multiplier == 2) {
                iconMultiplier.setAttribute("icon", "ion-volume-medium");
            } else {
                iconMultiplier.setAttribute("icon", "ion-volume-high");
            }
        }
    },

    timeChallengePage: {
        render: function(page) {

            var pullHook = document.getElementById('pull-hook');

            pullHook.addEventListener('changestate', function(event) {
                var message = '';

                switch (event.state) {
                  case 'initial':
                    message = 'Pull to refresh';
                    break;
                  case 'preaction':
                    message = 'Release';
                    break;
                  case 'action':
                    message = 'Loading...';
                    break;
                }

                pullHook.innerHTML = message;
            });

            pullHook.onAction = function(done) {
                setTimeout(done, 1000);
                if (myApp.models.timeChallenge.isOn()) {
                    myApp.views.timeChallengePage.renderChallengeOn(page);
                } else {
                    myApp.views.timeChallengePage.renderChallengeOff(page);
                }
            };

            if (myApp.models.timeChallenge.isOn()) {
                myApp.views.timeChallengePage.renderChallengeOn(page);
            } else {
                myApp.views.timeChallengePage.renderChallengeOff(page);
            }
        },

        renderChallengeOff: function(page) {
            document.getElementById('challenge-off').style.display = 'block';
            document.getElementById('challenge-on').style.display = 'none';
            if (window.temp) {
                if (window.temp.task) {
                    page.querySelector('#input-text-taskname').value = window.temp.task;
                }
                window.temp = null;
            }
        },

        renderChallengeOn: function(page) {
            document.getElementById('challenge-off').style.display = 'none';
            document.getElementById('challenge-on').style.display = 'block';
            var challenge_data = myApp.models.timeChallenge.getData();
            document.getElementById('field-time-challenge-taskname').innerHTML = challenge_data.task;
            document.getElementById('field-time-challenge-reward').innerHTML = parseInt(challenge_data.reward_point);
            document.getElementById('field-time-challenge-endtime').innerHTML = moment(challenge_data.end_time).format('HH:mm');
            document.getElementById('field-time-challenge-fromnow').innerHTML = moment(challenge_data.end_time).fromNow();
        }
    },

    settingsPage: {
        render: function(page) {
            var point = myApp.models.user.getPoint();
            var day = myApp.models.user.getDay();
            document.querySelector('#btn-prompt-point .right').innerHTML = point;
            document.querySelector('#btn-prompt-day .right').innerHTML = day;
        }
    },

    todoPage: function(page) {
        var list = myApp.models.todolist.getData();// a list of todo objects
        var listview = document.querySelector('#field-todo-list');
        listview.innerHTML = ""; // clear all leftover html before appending rendered todos
        var num = 0;
        //loop: create html items for each todo object in the array
        for (i = 0; i < list.length; i++) {
            listview.innerHTML = listview.innerHTML + '<ons-list-item tappable id="todo-item-' + i + '">' +
              '<div class="right endtask" id="'+ i +'">' +
                '<ons-icon icon="md-check"></ons-icon>' +
              '</div>' + '<div class="center start-time-challenge">' + list[i].task + '</div>'
            '</ons-list-item>';
            num++;
        }

        for (i = 0; i < num; i++) {
            page.querySelectorAll('.endtask')[i].addEventListener('click', function(event) {
                //Get selected todo id
                var id = event.currentTarget.id;
                //Delete selected todo object from storage
                myApp.models.todolist.end(id);
                //rerender view
                myApp.views.todoPage(page);
            });
            page.querySelectorAll('.start-time-challenge')[i].addEventListener('click', (function(id) {
                return function(event) {
                //Jump to time challenge only when There's no on-going time challenge
                if (!myApp.models.timeChallenge.isOn()) {
                    //Get data from todo object
                    var list = myApp.models.todolist.getData();
                    var task = list[id].task;
                    //Delete selected todo object from storage
                    myApp.models.todolist.end(id);
                    //Push data to time challenge page
                    window.temp = {};
                    window.temp.task = task;
                    document.getElementById('content').load('html/time_challenge.html').then();
                }
            }})(i));
        }

    }

    // petPage: function(page) {
    //
    // }

}
