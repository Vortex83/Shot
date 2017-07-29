(function () {
	const {BrowserWindow} = require('electron').remote;
	const electron = require('electron');
	const desktopCapturer = electron.desktopCapturer;
	const electronScreen = electron.screen;
	const shell = electron.shell;
    let renderer = {};

    renderer.sceenShot = function (options) {
        if(!options) {
            return;
        }
        else {

        }
    };

    renderer.fetchSources = function(callback, types) {
    	if(!types) types = ['window', 'screen'];
    	desktopCapturer.getSources({types: types}, callback);
    };

    renderer.getMainWindow = function () {
    	return BrowserWindow.getAllWindows()[0];
    };

    module.exports = renderer; 
})();