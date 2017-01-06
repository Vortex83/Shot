//import React from '../react/react'
//import ReactDOM from '../react/react-dom'
(function () {
    class Menu extends React.Component {
        render() {
            return (
                <div class="ui large top fixed menu">
                    <div class="ui container">
                        <a class="active item" id="view-screenshot">Screenshot</a>
                        <a class="item" id="view-screenrecord">Screen Record</a>
                        <a class="item" id="view-about">About</a>
                    </div>
                </div>
            )
        }
    }
})()