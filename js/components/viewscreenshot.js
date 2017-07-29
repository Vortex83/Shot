import  React, { Component } from 'react';
import { View, Text, TextInput, Checkbox, Button, Label } from 'react-desktop/windows';
import ViewSources from './viewsources';
const Process = require('process');
export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'shotcalibration',
			path: Process.env.HOME || Process.env.HOMEDIR,
			sources: [],
			sourceid: '',
			sourcename: ''
		};
		this.props.renderer.fetchSources(this.gatSauces.bind(this));
	}
	render() {
		switch(this.state.view) {
			case 'shotcalibration':
			default:
				return (
					<View layout="vertical">
						<View margin="0 0 20px" layout="vertical">
							<Label>Path:</Label>
							<View layout="horizontal">
								<TextInput onChange={this.updatePath} style={{ width: '300px', marginRight: '10px' }} defaultValue={this.state.path} placeholder="Folder to store screenshot in" />
								<View horizontalAlignment="right">
									<Button onClick={this.chooseFolder} push color style={{ height: '30px' }}>Browse</Button>
								</View>
							</View>
						</View>
						<View layout="vertical">
							<Label>Source (current:  <Label id="currentSource">{this.state.source}</Label>):</Label>
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

	}
	gatSauces(error, sources) {
		this.setState((prevState) => ({view: prevState.view, path: prevState.path, sources: sources, source: prevState.source}));
	}
	sourceChange(e) {
		this.setState((prevState) => ({
			view: prevState.view,
			path: prevState.path,
			sources: prevState.sources,
			sourceid: e.target.id
		}));
		this.state.sources.forEach((source) => ((source.id == e.target.id) ? document.getElementById("currentSource").innerHTML = this.makeShort(source.name) : null));
	}
	updatePath(e) {
		this.setState((prevState) => ({
			view: prevState.view,
			path: e.target.value,
			sources: prevState.sources
		}));
	}
	takeShot() {
		this.props.renderer.screenShot({
			path: this.state.path,
			source: this.state.source
		});
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