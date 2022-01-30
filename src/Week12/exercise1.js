import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import '../App.css'

import UserList from './userlist'

class Exercise1Component extends React.Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        let response = await fetch('http://localhost:5150/users');
        let json = await response.json();
        this.setState({users: json});
    }

    render() {

        return (
            <MuiThemeProvider>
                <Card style={{marginTop: '10%', marginLeft: '10%', width: '80%'}}>
                    <CardHeader>
                        <div>
                            React List Exercise
                        </div>
                    </CardHeader>
                    <CardText style={{textAlign: 'center'}}>
                        <div className="usersList">
                            <UserList users={this.state.users}/>
                        </div>
                    </CardText>
                </Card>
            </MuiThemeProvider>
        )
    }
}
export default Exercise1Component