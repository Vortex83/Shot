import React from './react/react'
import ReactDOM from './react/react-dom'
import Menu from './components/menu'
module.exports = function (renderer) {


    ReactDOM.render(
        <Menu />,
        document.getElementById('menu')
    )
};