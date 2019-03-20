import React from 'react';
import './SkyColorLayer.styl';

class SkyColorLayer extends React.Component {
    contsructor(props) {
        this.backgroundToggle = false;
        this.lastBackground = null;
    }

    render() {
        let color = this.props.color;
        let currentBackground = `linear-gradient(to bottom,rgb(${color.start.red}, ${color.start.green}, ${color.start.blue}) , rgb(${color.end.red}, ${color.end.green}, ${color.end.blue}))`;
        let lastBackground = this.lastBackground;
        this.lastBackground = currentBackground
        this.backgroundToggle = !this.backgroundToggle;

        return (<div className="sky-color-layer">
            <div className="sky-color" style={{
            "backgroundImage": this.backgroundToggle ? lastBackground : currentBackground,
            "opacity": this.backgroundToggle ? 0 : 1,
            // "transitionDelay": "0s"
            }}></div>
            <div className="sky-color" style={{
            "backgroundImage": this.backgroundToggle ? lastBackground : currentBackground,
            "opacity": this.backgroundToggle ? 0 : 1,
            // "transitionDelay": "2s"
            }}></div>
            <div className="sky-color" style={{
            "backgroundImage": this.backgroundToggle ? currentBackground : lastBackground,
            "opacity": this.backgroundToggle ? 1 : 0,
            // "transitionDelay": "0s"
            }}></div>
            <div className="sky-color" style={{
            "backgroundImage": this.backgroundToggle ? currentBackground : lastBackground,
            "opacity": this.backgroundToggle ? 1 : 0,
            // "transitionDelay": "2s"
            }}></div>
        </div>)
    }
}


export default SkyColorLayer;