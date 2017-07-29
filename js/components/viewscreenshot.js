import  React, { Component } from 'react';
import { View, Text, TextInput, Checkbox, Button, Label } from 'react-desktop/windows';
import ViewSources from './viewsources';
const Process = require('process');
const ipc = require('electron').ipcRenderer;
const { dialog } = require('electron').remote;
export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'shotcalibration',
			path: Process.env.HOME || Process.env.HOMEDIR,
			sources: [],
			sourceid: '',
			blob: null,
			dataURI: ''
		};
		this.props.renderer.fetchSources(this.gatSauces.bind(this));
	}
	render() {
		switch(this.state.view) {
			case 'previewshot':
				return (
					<View layout="vertical">
						<img src={this.state.dataURI} style={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto'}} />
						<View layoout="horizontal" horizontalAlignment="right">
						</View>
					</View>
				);
			case 'shotcalibration':
			default:
				return (
					<View layout="vertical">
						<View margin="0 0 20px" layout="vertical">
							<Label>Path:</Label>
							<View layout="horizontal">
								<TextInput onChange={this.updatePath.bind(this)} style={{ width: '300px', marginRight: '10px' }} defaultValue={this.state.path} placeholder="Folder to store screenshot in" />
								<View horizontalAlignment="right">
									<Button onClick={this.chooseFolder.bind(this)} push color style={{ height: '30px' }}>Browse</Button>
								</View>
							</View>
						</View>
						<View layout="vertical">
							<Label>Source (current:  <Label id="currentSource"></Label>):</Label>
							<ViewSources sources={this.state.sources} callback={this.sourceChange.bind(this)} />
						</View>	
						<View horizontalAlignment="right">
							<Button onClick={this.takeShot.bind(this)} color push>Take Screenshot</Button>
						</View>
					</View>
				);
		}
	}
	chooseFolder() {
		let files = dialog.showOpenDialog({
		    title: "Choose a directory to store screenshots in",
		    properties: ['openDirectory']
		});
		this.updatePath({target: {value: files[0] || this.state.path}}); // keeps previous path if user doesn't chosse a file
	}
	gatSauces(error, sources) {
		this.setState((prevState) => ({
			view: prevState.view,
			path: prevState.path,
			sources: sources,
			sourceid: prevState.sourceid, 
			blob: prevState.blob,
			dataURI: prevState.dataURI
		}));
	}
	sourceChange(e) {
		e.persist();
		this.setState((prevState) => ({
			view: prevState.view,
			path: prevState.path,
			sources: prevState.sources,
			sourceid: e.target.id, 
			blob: prevState.blob,
			dataURI: prevState.dataURI
		}));
		this.state.sources.forEach((source) => ((source.id == e.target.id) ? document.getElementById("currentSource").innerHTML = this.makeShort(source.name) : null));
	}
	updatePath(e) {
		e.persist();
		this.setState((prevState) => ({
			view: prevState.view,
			path: e.target.value,
			sources: prevState.sources,
			sourceid: prevState.sourceid,
			sourcename: prevState.sourcename,
			blob: prevState.blob,
			dataURI: prevState.dataURI
		}));
	}
	takeShot() {
		function iAmCallback(error, data) {
			if (Process.env.SHOT_DBG) {
				console.log(error);
				console.log(data);
			}
			if(error) {
				alert("Error: " + data);
				return;
			}
			this.setState(prevState => ({
				view: 'previewshot',
				path: prevState.path,
				sources: prevState.sources,
				sourceid: prevState.sourceid, 
				blob: data.blob,
				dataURI: data.dataURI
			}));
			this.forceUpdate();
		}
		this.props.renderer.screenShot({
			source: this.state.sourceid
		}, iAmCallback.bind(this));
	}
	makeShort(name) {
		if (name.length > 30) {
			return name.substring(0, 30) + "...";
		}
		else {
			return name;
		}
	}
}