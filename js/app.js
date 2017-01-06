import React from 'react'
import ReactDOM from 'react-dom'
import AppMenu from './components/appmenu'
module.exports = function (renderer) {
    let activeMenuItem = "view-screenshot"
    function menuCallback(activeItem) {
        activeMenuItem = activeItem
        alert(activeItem)
    }
    ReactDOM.render(
        <AppMenu callback={menuCallback} />,
        document.getElementById('menu')
    )
};