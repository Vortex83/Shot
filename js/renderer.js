(function () {
	const {BrowserWindow} = require('electron').remote;
    let renderer = {};

    renderer.sceenShot = function (options) {
        if(!options) {
            
        }
    };

    renderer.getMainWindow = function () {
    	return BrowserWindow.getAllWindows()[0];
    }

    module.exports = renderer; 
})();