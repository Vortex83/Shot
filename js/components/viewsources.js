import React, { Component } from 'react';
import { Radio, View } from 'react-desktop/windows';

export default class extends Component {
	render() {
		const radios = this.props.sources.map((source) => <Radio id={source.id} name="sources" label={this.makeShort(source.name)} onChange={this.props.callback} />);
		return (
			<View layout="vertical" margin="0 0 0 0" padding="0 0 0 0">
				{radios}
			</View>
		);
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