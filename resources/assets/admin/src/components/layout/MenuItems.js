import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FingerprintIcon from '@material-ui/icons/Fingerprint';


import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


const menuStyle = (theme) => ({
    menutext: {
        padding: 0,
        display: 'inline-flex',
        verticalAlign: 'top'
    },
    menuItem: {
    },
    menulink: {
        textDecoration: 'none'
    }

});


class MenuItems extends React.Component {

    constructor (props) {
        super(props);
    }
    

    render () {
        let { classes } = this.props;
        return (
            <MenuList>
                <MenuItem className={classes.menuItem} component='a' href="#/">
                    
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                    <ListItemText primary="Dashboard" className={classes.menutext} />
                    
                </MenuItem>
                <MenuItem className={classes.menuItem} component='a' href="#/users">
                    
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                    <ListItemText primary="Users" className={classes.menutext} />
                    
                </MenuItem>
                <MenuItem className={classes.menuItem} component='a' href="#/roles">
                    
                        <ListItemIcon>
                            <FingerprintIcon />
                        </ListItemIcon>
                    <ListItemText primary="Roles" className={classes.menutext} />
                    
                </MenuItem>
            </MenuList>
        )
    }
};


export default withStyles(menuStyle)(MenuItems);;