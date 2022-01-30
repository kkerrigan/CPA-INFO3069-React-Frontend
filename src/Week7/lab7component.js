import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import AutoComplete from 'material-ui/AutoComplete'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem'
import List from 'material-ui/svg-icons/action/list'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import '../App.css'

class Lab7Component extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            usernames: [],
            selectedMsg: '',
            userInfo: '',
            gotData: false,
            snackbarMsg: '',
            addUser: false,
            addUserSuccess: false,
            addUserMsg: '',
            name: '',
            age: 0,
            email: ''
        };

    }
    handleUpdateInput = (searchPick) => {
        this.setState({selectedMsg: searchPick})
    };

    handleSelectedUsername = (searchPick) => {
        let user = this.state.users.find(u => u.name === searchPick);
        this.setState({userInfo: `${user.name} 's email is ${user.email}`});
        this.setState({selectedMsg: `${user.name} selected!`})
    };

    handleRequestClose = () => {
        this.setState({gotData: false});
    };

    addNewUserSelected = () => {
      this.setState({addUser: true});
    };

    updateName = (name) => {
        this.setState({name: name})
    };

    updateAge = (age) => {
      this.setState({age: age})
    };

    updateEmail = (email) => {
      this.setState({email: email});
    };

    fetchUsers = async () => {
        this.setState({addUser: false});
        this.setState({selectedMsg: ''});
        this.setState({userInfo: ''});
        try {
            let response = await fetch('http://127.0.0.1:5150/users');
            let json = await response.json();
            this.setState({users: json});
            this.setState({usernames: []});
            this.state.users.forEach(user => this.state.usernames.push(user.name));
            this.setState({snackbarMsg: 'Server data loaded'});
            this.setState({gotData: true})
        }
        catch (error) {
            this.setState({selectedMsg: 'Problem loading server data'});
            this.setState({gotData: false})
        }
    };

    addNewUser = async () => {
        let user = {
            name: this.state.name,
            age: this.state.age,
            email: this.state.email
        };
        let userStr = JSON.stringify(user);
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        try {
            let response = await fetch('http://localhost:5150/users', {
                method: 'POST',
                headers: myHeaders,
                body: userStr
            });
            let json = await response.json();
            let msg = json.Msg;
            this.setState({addUserMsg: msg});
            this.setState({addUserSuccess: true})
        } catch (error) {
            this.setState({addUserMsg: 'Problem adding a new user'});
            this.setState({addUserSuccess: false})
        }
    };

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="INFO3069 - MaterialUI"
                            iconElementLeft={
                                <IconMenu iconButtonElement={<IconButton><List
                                    color="white"/></IconButton>}>
                                    <MenuItem primaryText="Grab Users"
                                            onClick={this.fetchUsers}/>
                                    <MenuItem primaryText="Add New User"
                                            onClick={this.addNewUserSelected}/>
                                </IconMenu>
                            }>
                    </AppBar>
                    {this.state.addUser === false &&
                    <Card style={{marginTop: '5%', marginLeft: '5%', width: '90%'}}>
                        <CardHeader style={{textAlign: 'center'}}>
                            <div className="blueTitle">
                                Lab 7
                            </div>
                        </CardHeader>
                        <CardText style={{textAlign: 'center'}}>
                            <AutoComplete
                                floatingLabelText="Pick a User"
                                filter={AutoComplete.caseInsensitiveFilter}
                                onUpdateInput={this.handleUpdateInput}
                                dataSource={this.state.usernames}
                                onNewRequest={this.handleSelectedUsername}
                            />
                            <div className="alertText">{this.state.selectedMsg}</div>
                            {this.state.userInfo.length > 0 &&
                            <p className="blueTitle">{this.state.userInfo}</p>
                            }
                        </CardText>
                    </Card>
                    }

                    { this.state.addUser === true &&
                    <Card style={{marginTop: '5%', marginLeft: '5%', width: '90%'}}>
                        <CardHeader style={{textAlign: 'center'}}>
                            <div className="blueTitle">
                                ADD NEW USER - LAB #7
                            </div>
                        </CardHeader>
                        <CardText style={{textAlign: 'center'}}>
                            <TextField hintText="Enter user's name here"
                                onChange={(event) => this.updateName(event.target.value)}/><br/>
                            <TextField hintText="Enter user's age here"
                                onChange={(event) => this.updateAge(event.target.value)}/><br/>
                            <TextField hintText="Enter user's email here"
                                onChange={(event) => this.updateEmail(event.target.value)}/><br/>
                            <RaisedButton label="Add User" primary={true} onClick={this.addNewUser}/>
                        </CardText>
                    </Card>
                    }

                    <Snackbar
                        open={this.state.gotData}
                        message={this.state.snackbarMsg}
                        autoHideDuration={2000}
                        onRequestClose={this.handleRequestClose}
                    />
                    <Snackbar
                        open={this.state.addUserSuccess}
                        message={this.state.addUserMsg}
                        autoHideDuration={2000}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}
export default Lab7Component