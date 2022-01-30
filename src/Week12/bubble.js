import React from 'react'
import '../App.css'

const Bubble = (props) => {

    return (
        <div className="userBubble" style={{backgroundColor: props.color, color: 'white'}}>
            <span style={{fontSize:'smaller', fontWeight:'bold'}}>Name: {props.user.name}</span>
            <br />
            <span style={{fontSize: 'smaller'}}>Age: {props.user.age}</span>
            <br />
            <span>Email: {props.user.email}</span>
        </div>
    )
};

export default Bubble