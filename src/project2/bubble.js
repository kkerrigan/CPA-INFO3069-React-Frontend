import React from 'react'
import '../App.css'

const Bubble = (props) => {

    return (

        <div className="userBubble" style={{
            backgroundColor: props.color,
            color:'white',
        }}>
            <span style={{fontWeight: 'bold'}}> {props.message.text}</span>
            <br />
            <span style={{fontSize: 'smaller'}}>{props.message.from} at {props.message.createdAt}</span>
        </div>
    )
};

export default Bubble