import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import api from '@au/api';

class Permissions extends React.Component {
    
    state = {
        permissions: [],
    }

    componentWillMount () {
        api.get('/api/permissions')
            .then(res => {
                console.log(res);
            })
            .catch( error => {
                console.log(error.response.data)
            })
    }

    render () {
        return (
            <Paper>
                Here will display roes permisssion
            </Paper>
        )
    }
    
}

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });

  Permissions.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(Permissions);