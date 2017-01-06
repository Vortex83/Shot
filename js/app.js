import React from 'react'
import ReactDOM from 'react-dom'
import Menu from './components/menu'
module.exports = function (renderer) {
    ReactDOM.render(
        <Menu />,
        document.getElementById('menu')
    )
};