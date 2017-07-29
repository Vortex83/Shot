import React, { Component } from 'react';
import { Text, View } from 'react-desktop/windows';

export default class extends Component {
	render() {
		return (
			<View layout="vertical">
				<View margin="0 0 20px 0">
					<Text>Shot is a simple, flexible screengrab tool with screenshot and screenrecording features.</Text>
				</View>
				<View>
					<Text><b>Made with &lt;3 by Vortex</b></Text>
				</View>
			</View>
			
		);
		/*style={{
					positon: 'absolute',
					top: '25%',
					left: '0px',
					width: '100%',
					textAlign: 'center'
				}}*/
	}
}