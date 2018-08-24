import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import NewUserForm from './NewUserForm';


const toolbarStyles = theme => ({
    root: {
        flexGrow: 1,
        boxShadow: 'none',
        marginBottom: 16,
      },
      flex: {
        flexGrow: 1,
      },
      button: {

      },
      addCircleOutline : {
        marginRight: 5,
      }
});

class UserTableAppBar extends React.Component {

    state = {
        open: false,
    };



    render () {
        const { classes } = this.props;

        return (
            <div>
                <AppBar position="static" color="default" className={classes.root}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            <PeopleIcon /> Users
                        </Typography>
                        <NewUserForm />
                    </Toolbar>
                    
                </AppBar>
                
                
            </div>
            
        );
    }
    
};

UserTableAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default  withStyles(toolbarStyles)(UserTableAppBar);