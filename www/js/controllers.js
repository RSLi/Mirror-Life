myApp.controllers = {
    homePage: function(page) {
        page.querySelector('#btn-splitter-toggle').onclick = function() {
            document.querySelector('#mySplitter').left.toggle();
        }

        page.querySelector('#btn-increase-point').onclick = function() {
            var changeAmount = 1 * myApp.models.user.getMultiplier();
            myApp.models.user.increasePoint(changeAmount);
            myApp.views.homePage.render(page);
        }

        page.querySelector('#btn-decrease-point').onclick = function() {
            var changeAmount = -1;
            myApp.models.user.increasePoint(changeAmount);
            myApp.views.homePage.render(page);
        }

        page.querySelector('#btn-increase-multiplier').onclick = function() {
            var original = parseInt(myApp.models.user.getMultiplier());
            var result = original + 1;
            if (result > 3){
                result = 3;
            }
            myApp.models.user.setMultiplier(result);
            myApp.views.homePage.render(page);
        }

        page.querySelector('#btn-decrease-multiplier').onclick = function() {
            var original = parseInt(myApp.models.user.getMultiplier());
            var result = original - 1;
            if (result < 1){
                result = 1;
            }
            myApp.models.user.setMultiplier(result);
            myApp.views.homePage.render(page);
        }

        myApp.views.homePage.render(page);
    }
}
