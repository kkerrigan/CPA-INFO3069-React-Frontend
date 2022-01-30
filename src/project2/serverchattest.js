import React from 'react'
import io from 'socket.io-client'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class ServerTestComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            nameError: "",
            chatName: '',
            chatRoom: '',
            msg: '',
            joined: false,
            isTyping: false
        }
    }
    componentDidMount = () => {
        // connect to server
        const socket = io.connect('localhost:5150', {'forceNew': true});
        this.setState({socket: socket});

        socket.on('nameexists', this.onNameExists);
        socket.on('welcome', this.onWelcome);
        socket.on('joined', this.onJoined);
        socket.on('currentusers', this.allUsers);
        socket.on('currentrooms', this.allRooms);
        socket.on('typing', this.onTyping);
        socket.on('sendMessage', this.sendChatMessage);
        socket.on('userDisconnected', this.disconnectUser)
    };

    allUsers = (data) => console.log(data);
    allRooms = (data) => console.log(data);

    onNameExists = () => this.setState({nameError: "Name already taken. Enter A different name."});

    // when we join a room
    onWelcome = (dataFromServer) => {

        console.log(`From: ${dataFromServer.from}\nRoom:${dataFromServer.room}
                                                \nMessage: ${dataFromServer.text}
                                                \nSocket Id: ${dataFromServer.id}
                                                \nColour:${dataFromServer.color}
                                                \nTime: ${dataFromServer.createdAt}`);
        this.setState({joined: true});
    };

    // when someone joins the room we're in
    onJoined = (dataFromServer) => console.log(`From: ${dataFromServer.from}
                                               \nRoom:${dataFromServer.room}
                                               \nMessage: ${dataFromServer.text}
                                               \nColour: ${dataFromServer.color}
                                               \nTime:${dataFromServer.createdAt}`);
    onTyping = (serverData) => {
      if(!this.state.isTyping){
          console.log(`${serverData} is typing...`);
          this.setState({isTyping: true});
      }
    };

    sendChatMessage = (serverData) => {
        console.log(serverData);
    };


    updateName = (name) => {
        this.setState({chatName: name});
    };

    sendJoinMessage = () => this.state.socket.emit('join', {chatName: this.state.chatName, roomName: this.state.chatRoom});

    disconnectUser = (serverData) => {
        console.log(serverData);
    };

    // handler for name TextField entry
    handleNameChange = (e) => this.setState({chatName: e.target.value, chatNameMsg: ''});

    handleRoomChange = (e) => this.setState({chatRoom: e.target.value, chatNameMsg: ''});

    handleTextChange = (e) => {
        this.setState({msg: e.target.value});
        this.state.socket.emit('typing', {chatName: this.state.chatName, roomName: this.state.chatRoom});
    };

    handleNewMessage = (e) => {
        e.preventDefault();
        this.state.socket.emit('createMessage', {from: this.state.chatName, text: this.state.msg, room: this.state.chatRoom}, (err) => {

        });
        this.setState({msg: ''});
    };

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <TextField
                        hintText='Enter unique name'
                        value={this.state.chatName}
                        onChange={this.handleNameChange}
                        errorText={this.state.nameError}
                    />
                    <TextField
                        hintText='Enter room name'
                        value={this.state.chatRoom}
                        onChange={this.handleRoomChange}
                    />
                    <br />
                    {this.state.chatName !== '' && this.state.chatRoom !== '' &&
                    <RaisedButton label="Join"
                                  labelColor={'#ffffff'}
                                  backgroundColor={'#0D47A1'}
                                  onClick={this.sendJoinMessage}
                    />
                    }
                    {this.state.joined &&
                        <form onSubmit={this.handleNewMessage}>
                        <TextField
                            hintText="Enter message"
                            value={this.state.msg}
                            onChange={this.handleTextChange}
                        />
                        </form>
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}
export default ServerTestComponent
