import React from 'react'
import List from 'material-ui/List'
import UserBubble from './userbubble'

const UserBubbleList = (props) => {

    const users = props.users.map((user) => {
        return (<UserBubble key={user._id} user={user} />);
    });

    return (
        <List>
            {users}
        </List>
    )
};

export default UserBubbleList