import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TrafficLightComponent from './trafficlightcomponent'

class AllLightsComponent extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <TrafficLightComponent street="Kristian"/>
                    <TrafficLightComponent street="Kerrigan"/>
                    <TrafficLightComponent street="Info3069"/>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default AllLightsComponent