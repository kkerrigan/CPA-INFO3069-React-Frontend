import React from 'react'

const Triangle = (props) => {
    return (
        <div
            style={{content:"", /* triangle */
                position:'absolute',
                bottom:'-10px', /* value = - border-top-width - border-bottom-width */
                left: '50px', /* controls horizontal position */
                borderWidth: '10px 10px 0', /* vary these values to change the angle of the
vertex */
                borderStyle: 'solid',
                borderColor: `${props.color} transparent`}}
        />
    )
};
export default Triangle