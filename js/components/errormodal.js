import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ErrorModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            message: props.message
        }
    }
}