import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Permissions from '@ac/common/Permissions'


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    name: {
        width: '100%',
        marginTop: 0,
    }
});

class RoleList extends React.Component {
    state = {
        checked: false
    }

    openRoleForm = () => {
        this.setState(state => ({ checked: true }));
    };

    render () {
        const { classes } = this.props;
        const { checked } = this.state
        return (
            <Paper className={classes.root}>
                <List>
                    <ListItem button>
    
                        <ListItemText primary="Role" secondary="Description of the role" />
                    </ListItem>
    
                    <ListItem button>
    
                        <ListItemText primary="Role" secondary="Description of the role" />
                    </ListItem>
    
                    <ListItem button>
    
                        <ListItemText primary="Role" secondary="Description of the role" />
                    </ListItem>
    
                    <ListItem>
                        <Collapse in={checked} collapsedHeight="50px">
                            <form >
                                <TextField
                                    id="role"
                                    label="New role"
                                    type="text"
                                    className={classes.name}
                                    margin="none"
                                    onFocus={this.openRoleForm}
                                    />

                                <TextField
                                    id="role"
                                    label="Description"
                                    type="text"
                                    className={classes.name}
                                    margin="none"
                                    />
                                    <Permissions />
                                    <Button variant="contained" color="primary" className={classes.button}>
                                        Add Role
                                    </Button>
                                    <Button variant="contained" color="secondary" className={classes.button}>
                                        Cancel
                                    </Button>

                            </form>
                        </Collapse>
                        
                    </ListItem>
                </List>
            </Paper>
        );
    }
}

RoleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoleList);
