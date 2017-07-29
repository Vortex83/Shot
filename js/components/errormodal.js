import React from 'react';
import { Window, TitleBar, View, Text, Button } from 'react-desktop/windows';

export default class ErrorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            message: props.message
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
    				title={this.state.title}
    				constrols
    				onCloseClick={this.handleClose.bind(this)}
    			/>
    			<View layout='vertical'>
    				<View horizontalAlignment='center'>
    					<Text>{this.state.message}</Text>
    					<Button onClick={this.handleClose.bind(this)} push>Ok</Button>
    				</View>
    			</View>
    		</Window>
    	);
    }
}