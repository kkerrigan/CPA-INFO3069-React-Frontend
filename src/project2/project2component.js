import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import io from 'socket.io-client'
import logo from '../images/chat.png'

import TopBar from './topbar'
import RoomsList from './roomslist'
import ChatBubbleList from './chatlist'

class Project2Component extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            socket: null,
            nameError: '',
            chatName: '',
            chatRoom: '',
            msg: '',
            rooms: [],
            users: [],
            messages: [],
            joined: false,
            isTyping: false,
            typeMsg: ''
        };
    }

    componentDidMount = () => {
        // connect to server
        //const socket = io.connect('localhost:5150', {'forceNew': true});
        const socket = io.connect();

        this.setState({socket: socket});

        socket.on('nameExists', this.onNameExists);
        socket.on('welcome', this.onWelcome);
        socket.on('joined', this.onJoined);
        socket.on('currentUsers', this.allUsers);
        socket.on('currentRooms', this.allRooms);
        socket.on('typing', this.onTyping);
        socket.on('sendMessage', this.sendChatMessage);
        socket.on('userDisconnected', this.disconnectUser)
    };

    allUsers = (data) => this.setState({users: data});
    allRooms = (data) => this.setState({rooms: data});

    onNameExists = () => this.setState({nameError: "Name already taken. Enter A different name."});

    // when we join a room
    onWelcome = (serverData) => {

        let messageList = this.state.messages;
        messageList.push(serverData);

        this.setState({messages: messageList});
        this.setState({joined: true});
    };

    // when someone joins the room we're in
    onJoined = (serverData) => {
        let messageList = this.state.messages;

        messageList.push(serverData);
        this.setState({messages: messageList});
    };

    onTyping = (serverData) => {
        if (!this.state.isTyping) {
            this.setState({typeMsg: `${serverData} is typing....`});
            this.setState({isTyping: true});
        }
    };

    sendChatMessage = (serverData) => {
        let messageList = this.state.messages;

        messageList.push(serverData);
        this.setState({messages: messageList});
        this.setState({isTyping: false});
        this.setState({typeMsg: ''});
    };


    updateName = (name) => {
        this.setState({chatName: name});
    };

    sendJoinMessage = () => this.state.socket.emit('join', {
        chatName: this.state.chatName,
        roomName: (this.props.selectedRoom !== undefined && this.props.selectedRoom !== "") ? this.props.selectedRoom : this.state.chatRoom
    });

    disconnectUser = (serverData) => {
        let messageList = this.state.messages;

        messageList.push(serverData);
        this.setState({messages: messageList});
    };

    // handler for name TextField entry
    handleNameChange = (e) => this.setState({chatName: e.target.value, chatNameMsg: ''});

    handleRoomChange = (e) => this.setState({chatRoom: e.target.value, chatNameMsg: ''});

    handleTextChange = (e) => {
        this.setState({msg: e.target.value});
        this.state.socket.emit('typing', {
            chatName: this.state.chatName,
            roomName: (this.props.selectedRoom !== undefined && this.props.selectedRoom !== "") ? this.props.selectedRoom : this.state.chatRoom
        });
    };

    handleNewMessage = (e) => {
        e.preventDefault();
        this.state.socket.emit('createMessage', {
            from: this.state.chatName,
            text: this.state.msg,
            room: (this.props.selectedRoom !== undefined && this.props.selectedRoom !== "") ? this.props.selectedRoom : this.state.chatRoom
        }, (err) => {

        });
        this.setState({msg: ''});
    };


    handleOpenDialog = () => this.setState({open: true});

    handleCloseDialog = () => this.setState({open: false});

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <div>
                        <TopBar viewDialog={this.handleOpenDialog}/>
                        <Dialog title="Current Logged In Users" modal={false} open={this.state.open}
                                onRequestClose={this.handleCloseDialog}>
                            <ul>
                                {this.state.users.map((user, index) => (
                                    <li key={index}>{user.name} is in room: {user.room}</li>
                                ))}
                            </ul>
                        </Dialog>
                    </div>
                    <div className="center">
                        {!this.state.joined &&
                        <Card style={{marginTop: '2%'}}>
                            <CardHeader>
                                <div>
                                    <img src={logo} alt="Logo"/>
                                    <h3 className="header">Sign In</h3>
                                </div>
                            </CardHeader>
                            <CardText>
                                <TextField
                                    hintText='Enter unique name'
                                    value={this.state.chatName}
                                    onChange={this.handleNameChange}
                                    errorText={this.state.nameError}
                                />
                            </CardText>
                        </Card>
                        }
                        {!this.state.joined &&
                        <Card style={{marginTop: '2%'}}>
                            <CardHeader>
                                <div>
                                    <h4 className="header"> Select a Room or Create a new one below</h4>
                                </div>
                            </CardHeader>
                            <CardText>
                                <div>
                                    <RoomsList rooms={this.state.rooms} selectedRoom=""/>

                                    <TextField
                                        hintText='Enter room name'
                                        value={this.props.selectedRoom ? this.props.selectedRoom : this.state.chatRoom}
                                        onChange={this.handleRoomChange}
                                    />
                                    <br/>
                                    <RaisedButton label="Join"
                                                  style={{marginTop: '2%'}}
                                                  labelColor={'#ffffff'}
                                                  backgroundColor={'#11a12b'}
                                                  onClick={this.sendJoinMessage}
                                                  disabled={this.state.chatName === "" || (this.state.chatRoom === "" &&
                                                      (this.props.selectedRoom === undefined || this.props.selectedRoom === ""))}
                                    />

                                </div>
                            </CardText>
                        </Card>
                        }
                    </div>
                    <div>
                        {this.state.joined &&
                        <div>
                            <h5 className="center">You are in
                                room: {(this.props.selectedRoom !== undefined && this.props.selectedRoom !== "") ? this.props.selectedRoom : this.state.chatRoom} </h5>
                            <ChatBubbleList messages={this.state.messages} user={this.state.chatName}/>
                        </div>
                        }
                        {
                            this.state.joined &&
                            <form onSubmit={this.handleNewMessage}>
                                <TextField
                                    hintText="Enter message"
                                    value={this.state.msg}
                                    onChange={this.handleTextChange}
                                />
                            </form>
                        }
                        {
                            this.state.isTyping &&
                            <h6>{this.state.typeMsg}</h6>
                        }
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default Project2Component