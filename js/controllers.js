myApp.controllers = {
    homePage: function(page) {
        page.querySelector('#btn-splitter-toggle').onclick = function() {
            document.querySelector('#mySplitter').left.toggle();
        }
    }
}
