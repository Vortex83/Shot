import React, { Component } from 'react';
import { Text, View } from 'react-desktop/windows';

export default class extends Component {
	render() {
		return (
			<View layout="vertical">
				<Text>Shot is a simple, flexible screengrab tool with screenshot and screenrecording features.</Text>
				<Text><b>Made with &lt;3</b></Text>
			</View>
		);
	}
}