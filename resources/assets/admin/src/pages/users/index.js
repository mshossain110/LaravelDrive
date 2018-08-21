import React from 'react';
import api from '@au/api';




class Users extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            user: [],
        }
    }

    componentWillMount () {
        api.get('/api/user').then( res => {
            console.log(res);
        })
    }

    render () {
        return (
            <h1>This is users page</h1>
        )
    }
}

export default Users