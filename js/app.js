import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Window, TitleBar, Text } from 'react-desktop/windows';
import AppMenu from './components/appmenu';
const {BrowserWindow} = require('electron');
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeMenuItem: 'view-screenshot',
			isMaximized: this.props.mainWindow.isMaximized()
		};
	}
	render() {
		return (
			<Window
	        	color='#cc7f29'
	        	theme='light'
	        	chrome
	        	padding='12px'
	        >
	        	<TitleBar
	        		title="Shot"
	        		controls
	        		isMaximized={this.state.isMaximized}
	        		theme='light'
	        		onCloseClick={this.closeWindow.bind(this)}
	        		onMinimizeClick={this.minimizeWindow.bind(this)}
	        		onMaximizeClick = {this.toggleMaximize.bind(this)}
	        		onRestoreDownClick = {this.toggleMaximize.bind(this)}
	        	/>
	        	<AppMenu
	        		color='#cc7f29'
	        		theme='light'
	        		callback={this.menuCallback.bind(this)}
	        		renderer={this.props.renderer} />
	        </Window>);
	}
	menuCallback(activeItem) {
        this.setState((prevState) => ({
        	activeMenuItem: activeItem,
        	isMaximized: prevState.isMaximized
        }));
    }
    closeWindow() {
    	this.props.mainWindow.close();
    }
    minimizeWindow() {
    	this.props.mainWindow.minimize();
    }
    toggleMaximize() {
    	(this.state.isMaximized) ? this.props.mainWindow.unmaximize() : this.props.mainWindow.maximize();
    	this.setState((prevState) => ({
    		activeMenuItem: prevState.activeMenuItem,
    		isMaximized: !prevState.isMaximized
    	}));
    }	
}
module.exports = function (renderer) {
	let mainWindow = renderer.getMainWindow();
    
    ReactDOM.render(
        <App
        	mainWindow={mainWindow}
        	renderer={renderer}
        />,
        document.getElementById('container')
        //
    );
};