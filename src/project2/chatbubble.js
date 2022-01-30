import React from 'react'
import ReactDOM from 'react-dom'
import ListItem from 'material-ui/List/ListItem'

import Bubble from './bubble'
import Triangle from './triangle'

class ChatBubble extends React.Component {

    componentDidMount = () => {
        let userDOM = ReactDOM.findDOMNode(this);
        userDOM.scrollIntoView({block: "end", behavior: "smooth"});
        userDOM.blur()
    };

    render() {

        let left = (this.props.user === this.props.message.from) ? '35%' : '0';
        left = this.props.message.id === null ? '0' : left;
        let isAdmin = this.props.message.id === null;

        return (
            <div style={{display:'block', width: !isAdmin ? '70%' : '95%', padding: '0'}} >
                <ListItem style={{textAlign: 'left', marginBottom: '5px', left: left, width: '95%'}}
                          disabled={true}>
                    <Bubble message={this.props.message} color={this.props.message.color} user={this.props.user} />

                    {!isAdmin &&
                    <Triangle color={this.props.message.color}/>
                    }
                </ListItem>
                &nbsp;
            </div> )
    }
}
export default ChatBubble
