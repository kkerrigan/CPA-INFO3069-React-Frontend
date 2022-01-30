import React from 'react'
import ReactDOM from 'react-dom'
import ListItem from 'material-ui/List/ListItem'

import Bubble from './bubble'
import Triangle from './triangle'

class UserBubble extends React.Component {
    componentDidMount = () => {
        let userDOM = ReactDOM.findDOMNode(this);
        userDOM.scrollIntoView({block: "end", behavior: "smooth"});
        userDOM.blur()
    };

    render() {
        let color = '#9C27B0';
        return (
            <div>
                <ListItem ref='user' style={{textAlign: 'left', marginBottom: '5px'}}
                          disabled={true}>
                    <Bubble user={this.props.user} color={color}/>
                    <Triangle color={color}/>
                </ListItem>
                &nbsp;
            </div> )
    }
}
export default UserBubble