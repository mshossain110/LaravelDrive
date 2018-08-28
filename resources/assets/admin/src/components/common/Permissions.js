import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import api from '@au/api';
import { Hidden } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 20,
  },
  underline: {
      width: '100%',
      hight: 2,
      marginTop: 5,
      borderBottom: '1px solid #eee'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class SelectItems extends React.Component {
    state = {
        open : false,
    }
    handleExpand = () => {
        let open = this.state.open; 
        this.setState({ open: !open  });
    }
    render () {
        const { index, permissions } = this.props;
        let group = Object.keys(permissions)[0];
        let items = permissions[group];

        return (
            <div>
            
                <ListItem button   onClick={ this.handleExpand} key={ group + 11}>
                    <ListItemText inset primary={group} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit key={ group + 13}>
                        {
                            items.map( item  => {
                                return (
                                <ListItem key={item}>
                                    <ListItemText inset primary={item} />
                                </ListItem>
                                )
                            }) 
                        }
                        
                </Collapse>
            </div>
        )
    }
}

class Permissions extends React.Component {
    state = {
        name: [],
        permissions: [],
        open: false,
        loaded: false
    };

    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    componentWillMount () {
        api.get('/api/permissions')
            .then(res => {
                this.setState({
                    permissions: res.data.data,
                    loaded: true,  
                });
            })
            .catch( error => {
                console.log(error.response.data)
            });
    }

    renderItems = () => {
        const {permissions, loaded } = this.state;
        let renders = []
        if (!loaded) {
            return (
                <MenuItem>
                       <ListItemText primary={'No Permission Found'} />
                </MenuItem>
            );
        }
        return permissions.map ((value, index) => {
            return (
                <List component="nav" key={index} >
                    <SelectItems permissions={value}  index={index} />
                </List>
            )
        });
    }

    openPermissionDilog = () => {
        let open = this.state.open;
        this.setState( { open: !open} );
    }

    render() {
        const { classes, theme } = this.props;


        return (
            <div className={classes.root}>
                <Button variant="contained" size="small" className={classes.button} onClick={ this.openPermissionDilog }>
                Add permissions
                </Button>
                <span className={classes.underline}></span>

                <Dialog maxWidth="xs" open={this.state.open} onClose={ this.openPermissionDilog }>
                    
                    <DialogTitle id="select permissions">Select Permissions</DialogTitle>
                    
                    
                    <DialogContent>
                        Hello dirol
                    </DialogContent>
                    
                    
                    <DialogActions>
                        <Button  color="primary" onClick={ this.openPermissionDilog }>
                            Cancel
                        </Button>
                        
                        <Button  color="primary">
                            Select
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Permissions.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Permissions);


// selected => (
//     <div className={classes.chips}>
//       {selected.map(value => (
//         <Chip key={value} label={value} className={classes.chip} />
//       ))}
//     </div>
//   )}