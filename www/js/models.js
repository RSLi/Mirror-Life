myApp.models = {
    initializeStorage: function() {
        var s = window.localStorage;
        s.setItem('point',0);
        s.setItem('today_point',0);
        s.setItem('last_login', new Date().getDate());
        s.setItem('multiplier',1);
        s.setItem('time_challenge', JSON.stringify({on:false}));//time challenge default to off
    },

    set: function(key, value) {
        var s = window.localStorage;
        s.setItem(key, value);
    },

    get: function(key) {
        var s = window.localStorage;
        return s.getItem(key);
    },

    user: {
        getPoint: function() {
            var s = window.localStorage;
            return s.getItem('point');
        },

        increasePoint: function(num) {
            var s = window.localStorage;
            s.setItem('point', parseInt(s.getItem('point')) + num);
            s.setItem('today_point', parseInt(s.getItem('today_point')) + num);
        },

        setPoint: function(num) {
            var s = window.localStorage;
            s.setItem('point', num);
        },

        getMultiplier: function() {
            var s = window.localStorage;
            return s.getItem('multiplier');
        },

        setMultiplier: function(num) {
            var s = window.localStorage;
            s.setItem('multiplier', num);
        },

        getTodayPoint: function() {
            var s = window.localStorage;
            return s.getItem('today_point');
        },

        dailyReset: function() {
            var s = window.localStorage;
            s.setItem('today_point', 0);
            s.setItem('last_login', new Date().getDate());
        }
    },

    timeChallenge: {
        isOn: function() {
            return JSON.parse(myApp.models.get('time_challenge')).on;
        },

        off: function() {
            myApp.models.set('time_challenge', JSON.stringify({on:false}));
        },

        on: function(endTime, reward_point, task) {
            myApp.models.set('time_challenge', JSON.stringify(
                {
                    "on": true,
                    "reward_point": reward_point,
                    "task": task
                }
            ));
        }

    }

}
