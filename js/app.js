import React from 'react';
import ReactDOM from 'react-dom';
import { Window, TitleBar, Text } from 'react-desktop/windows';
import AppMenu from './components/appmenu';
const {BrowserWindow} = require('electron');
module.exports = function (renderer) {
	let mainWindow = renderer.getMainWindow();
	let isMaximized = mainWindow.isMaximized();
    let activeMenuItem = "view-screenshot";
    function menuCallback(activeItem) {
        activeMenuItem = activeItem;
    }
    function closeWindow() {
    	mainWindow.close();
    }
    function minimizeWindow() {
    	mainWindow.minimize();
    }
    function toggleMaximize() {
    	(isMaximized) ? mainWindow.unmaximize() : mainWindow.maximize();
    	isMaximized = !isMaximized;
    }
    ReactDOM.render(
        <Window
        	color='#cc7f29'
        	theme='light'
        	chrome
        	padding='12px'
        >
        	<TitleBar
        		title="Shot"
        		controls
        		isMaximized={isMaximized}
        		theme='light'
        		onCloseClick={closeWindow}
        		onMinimizeClick={minimizeWindow}
        		onMaximizeClick = {toggleMaximize}
        		onRestoreDownClick = {toggleMaximize}
        	/>
        	<AppMenu
        		color='#cc7f29'
        		theme='light'
        		callback={menuCallback}
        		renderer={renderer} />
        </Window>,
        document.getElementById('container')
        //
    );
};