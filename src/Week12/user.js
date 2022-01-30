import React from 'react'
import ReactDOM from 'react-dom'
import ListItem from 'material-ui/List/ListItem'

class User extends React.Component {

    componentDidMount = () => {
        let messageDOM = ReactDOM.findDOMNode(this)
        messageDOM.scrollIntoView({block: "end", behavior: "smooth"})
        messageDOM.blur()
    };

    render() {
        let user = this.props.user

        return (
            <ListItem ref='user' style={{textAlign: 'left'}} disabled={true}>
                <div>
                    <span style={{fontSize: 'smaller', fontWeight: 'bold'}}>
                        Name: {user.name}
                    </span>
                    <br />
                    <span style={{fontSize: 'smaller'}}>
                        Age: {user.age}
                    </span>
                    <br />
                    <span>Email: {user.email}</span>
                </div>
            </ListItem>
        )
    }
}
export default User