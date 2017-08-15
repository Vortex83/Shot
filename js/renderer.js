(function () {
	const {BrowserWindow} = require('electron').remote;
	const electron = require('electron');
	const desktopCapturer = electron.desktopCapturer;
	const electronScreen = electron.screen;
	const shell = electron.shell;
    const process = require('process');
    let renderer = {};

    renderer.screenShot = function (options, callback) {
        if(!options) {
            callback(true, "No options specified!");
        }
        else {
        	function gatStream(stream) {
        		console.log("We have a stream!", stream);
        		let video = document.createElement("video");
                if(process.env.SHOT_DBG) document.body.appendChild(video);
                video.addEventListener('loadeddata', () => {
                    let canvas = document.createElement("canvas");
                    console.log(canvas.width = video.videoWidth);
                    console.log(canvas.height = video.videoHeight);
                    let ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0);
                    let dataURI = canvas.toDataURL('image/png');
                    let data = atob(dataURI.substring("data:image/png;base64,".length)),
                        asArray = new Uint8Array(data.length);
                    for (var i=0, len=data.length; i < len; i++) {
                        asArray[i] = data.charCodeAt(i);
                    }
                    let blob = new Blob([asArray.buffer], {type:'image/png'});
                    callback(false, {blob: blob, dataURI: dataURI});                    
                })
        		video.src = URL.createObjectURL(stream);
        		
        	}
        	function noStream(err) {
        		console.log("Shit!", err);
        		callback(true, err);
        	}
        	navigator.mediaDevices.getUserMedia({
        		audio: false,
        		video: {
        			mandatory: {
        				chromeMediaSource: 'desktop',
        				chromeMediaSourceId: options.source,
        			}
        		}
        	}).then(gatStream).catch(noStream);
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