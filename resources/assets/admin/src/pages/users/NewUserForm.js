import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import api from '@au/api';


const newuserstyle = theme => ({
    error: {
        color: '#f44336'
    },
    margin: {
        marginTop: 5
    }
});

class NewUserForm extends React.Component {

    state = {
        firstname: '',
        lastname: '',
        name: '',
        email: '',
        password: '',
        confirmed: '',
        errors: [],
        open: false,
        message: '',
        success: '',
        openSnackbar: false,
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };


    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        let errors = this.state.errors;
        if (errors[event.target.name])
        {
            delete errors[event.target.name];
        }
        this.setState({
            errors: errors,
            [event.target.name]: event.target.value
        })
    }

    handleSnackbarClose = () => {
        this.setState({
            SnaopenSnackbar: false
        })
    }

    handeleSubmit = (event) => {
        event.preventDefault();

        
        let data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.confirmed
        }

        api.post('/api/user', data).then( res => {
            if (res.data) {
                this.setState({
                    firstname: '',
                    lastname: '',
                    name: '',
                    email: '',
                    password: '',
                    confirmed: '',
                    open: false,
                    openSnackbar: false,
                    success: 'Successfully user added'
                })
            }
        }).catch( error => {
            let e = error.response.data
            this.setState({
                errors: e.errors,
                message: e.message
            })
        });
    }


    render () {
        let { classes } = this.props;
        let { errors, message } = this.state
        return (
            <div>
                <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClickOpen}>
                    <AddCircleOutlineIcon className={classes.addCircleOutline} /> Add User
                </Button>

                
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    
                    <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
                    <Divider />

                    <form className={classes.container} onSubmit={this.handeleSubmit} autoComplete="off">
                        <DialogContent>
                            {
                                message &&
                                    <FormHelperText className={classes.error}>{message}</FormHelperText>
                                
                            }

                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel htmlFor="firstname">Frist Name</InputLabel>
                                <Input
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    onChange={this.handleChange}
                                    value={this.state.firstname}
                                />
                                  
                                
                            </FormControl>

                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.lastname}
                                />
                                
                            </FormControl>

                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel htmlFor="name">User Name</InputLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                />
                                {
                                    errors['name'] &&
                                        <FormHelperText className={classes.error}>{errors['name']}</FormHelperText>
                                    
                                } 
                            </FormControl>

                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                />
                                {
                                    errors['email'] &&
                                        <FormHelperText className={classes.error}>{errors['email']}</FormHelperText>
                                    
                                }
                            </FormControl>

                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                />
                                {
                                    errors['password'] &&
                                        <FormHelperText className={classes.error}>{errors['password']}</FormHelperText>
                                    
                                }
                            </FormControl>

                             <FormControl fullWidth className={classes.margin}>
                                <InputLabel htmlFor="confirmed">Confirmed Password</InputLabel>
                                <Input
                                    id="confirmed"
                                    name="confirmed"
                                    type="password"
                                    onChange={this.handleChange}
                                    value={this.state.confirmed}
                                />
                                {
                                    errors['confirmed'] &&
                                        <FormHelperText className={classes.error}>{errors['confirmed']}</FormHelperText>
                                    
                                }
                            </FormControl>

                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel htmlFor="for">Select Role</InputLabel>
                                <Input
                                    id="for"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.firstname}
                                />
                            </FormControl>
                            
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                    
                            <Button type="submit" color="primary">
                                Add User
                            </Button>
                        </DialogActions>
                    </form>

                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.openSnackbar}
                    autoHideDuration={6000}
                    onClose={this.handleSnackbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={this.state.success}
                    
                    />

            </div>  
        )
    }
}

NewUserForm.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(newuserstyle)(NewUserForm);