myApp.models = {
    "initializeStorage": function() {
        var s = window.localStorage;
        if (!window.localStorage.getItem('point')) {
            s.setItem('point',0);
            s.setItem('today_point',0);
            s.setItem('last_login', new Date().getDate());
            s.setItem('multiplier',1);
            s.setItem('theme', '');
            s.setItem('time_challenge', JSON.stringify({on:false}));//time challenge default to off
            s.setItem('day', 0);
            s.setItem('todolist', JSON.stringify({todolist:[{"task": "Sample Task 1"}, {"task": "Sample Task 2"}]}));
            window.localStorage.setItem('day', 0);
        }

    },

    "set": function(key, value) {
        var s = window.localStorage;
        s.setItem(key, value);
    },

    "get": function(key) {
        var s = window.localStorage;
        return s.getItem(key);
    },

    "setJSON": function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },

    "getJSON": function(key, value) {
        return JSON.parse(window.localStorage.getItem(key));
    },

    "user": {
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

        getDay: function() {
            var s = window.localStorage;
            return s.getItem('day');
        },

        dailyReset: function() {
            var s = window.localStorage;
            s.setItem('today_point', 0);
            s.setItem('day', parseInt(s.getItem('day')) + 1);
            s.setItem('last_login', new Date().getDate());
        }
    },

    "timeChallenge": {
        getData: function() {
            return JSON.parse(myApp.models.get('time_challenge'));
        },

        isOn: function() {
            return myApp.models.timeChallenge.getData().on;
        },

        off: function() {
            myApp.models.set('time_challenge', JSON.stringify({on:false}));
        },

        on: function(endTime, reward_point, task) {
            //endTime is MomentJS
            myApp.models.set('time_challenge', JSON.stringify(
                {
                    "on": true,
                    "end_time": endTime,
                    "reward_point": reward_point,
                    "task": task
                }
            ));
        }

    },

    "todolist": {

        getData: function() {
            var list = JSON.parse(myApp.models.get('todolist')).todolist;
            if (list == null) {
                myApp.models.todolist.save([]);
                list = JSON.parse(myApp.models.get('todolist')).todolist;
            }
            return list;
        },

        add: function(task) {
            var list = myApp.models.todolist.getData();
            if (!list) {
                list = [{"task": "Sample Task 1"}, {"task": "Sample Task 2"}];
            }
            list.push({"task": task});
            myApp.models.todolist.save(list);
        },

        end: function(id) {
            var list = myApp.models.todolist.getData();
            list.splice(id, 1);
            myApp.models.todolist.save(list);
        },

        save: function(list) {
            myApp.models.set('todolist', JSON.stringify({'todolist': list}));
        }

    }

}
