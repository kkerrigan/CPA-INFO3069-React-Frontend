import React from 'react'
import '../App.css'

//An example of a React Functional Component using JSX syntax
const FunctionalJSX = ({somedata}) => { // ES6 way of doing props.somedata
    if(!somedata) {
        return <div></div>
    }
    return (
        <div className="bigred">{somedata}</div>
    )
};

export default FunctionalJSX