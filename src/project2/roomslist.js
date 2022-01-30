import React from 'react'
import {RadioButton, RadioButtonGroup} from "material-ui";
import Project2Component from "./project2component";
import ReactDOM from "react-dom";

const RoomsList = (props) => {
    const radioOnCheck = (e) => {
        ReactDOM.render(
            <Project2Component selectedRoom={e.target.value}/>, document.getElementById('root')
        )
    };

    const rooms = props.rooms.map((room, index) => {
        return (<RadioButton key={room} ref='room' disabled={false} label={room} value={room}/>);
    });

    return (
        <div style={{textAlign: 'center', alignContent: 'center', justifyContent: 'center'}}>

            <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <RadioButtonGroup name={"room"} onChange={radioOnCheck}>
                    {rooms}
                </RadioButtonGroup>
            </div>
        </div>
    )
};
export default RoomsList