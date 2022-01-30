import React from 'react'
import List from 'material-ui/List/List'
import ChatBubble from "./chatbubble";

const ChatBubbleList = (props) => {
    const messages = props.messages.map((msg, index) => {
        return (<ChatBubble key={index} message={msg} user={props.user}/>);
    })

    return (
        <List style={{height: '70vh', overflow: 'auto'}}>
            {messages}
        </List>
    )
}
export default ChatBubbleList
