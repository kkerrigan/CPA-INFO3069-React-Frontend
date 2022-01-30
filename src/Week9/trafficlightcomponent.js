import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import io from 'socket.io-client'
import '../App.css'

class TrafficLightComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redLamp: '',
            yellowLamp: '',
            greenLamp: ''
        }
    }

    waitSomeSeconds = (wait) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(wait)
            }, wait);
        })
    };

    componentDidMount = async () => {
        //connect to server
        //const socket = io.connect('localhost:5150', {'forceNew': true});

        // connect to the server on Heroku cloud
        const socket = io.connect();

        //send join message to server, pass a payload to it
        socket.emit('join', {street: this.props.street}, (err) => {});

        socket.on('turnLampOn', async (lampData) => {
            for(;;) {
                this.setState({redLamp:'red', yellowLamp:'white', greenLamp:'white'});
                await this.waitSomeSeconds(lampData.red);
                this.setState({redLamp: 'white', yellowLamp: 'yellow', greenLamp:'white'});
                await this.waitSomeSeconds(lampData.yellow);
                this.setState({redLamp: 'white', yellowLamp:'white', greenLamp: 'green'});
                await this.waitSomeSeconds(lampData.green);
            }
        })
    };

    render () {
        return (
            <MuiThemeProvider>
                <div style={{paddingTop: 20}}>
                    {this.props.street}
                    <div style={{border: 'solid', width: '34px', padding: '2px'}}>
                        <div className="lamp" style={{backgroundColor: this.state.redLamp}}/>
                        <div className="lamp" style={{backgroundColor: this.state.yellowLamp}}/>
                        <div className="lamp" style={{backgroundColor: this.state.greenLamp}}/>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default TrafficLightComponent