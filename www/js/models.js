myApp.models = {
    initializeStorage: function() {
        var s = window.localStorage;
        s.setItem('point',0);
        s.setItem('today_point',0);
        s.setItem('last_login', new Date().getDate());
        s.setItem('multiplier',1);
    },

    set: function(key, value) {
        var s = window.localStorage;
        s.setItem(key, value);
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
    }
}
