import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import api from '@au/api';



function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'avatar', numeric: false, disablePadding: true, label: '' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'firstname', numeric: false, disablePadding: true, label: 'First Name' },
    { id: 'lastname', numeric: false, disablePadding: true, label: 'Last Name' },
    { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
    { id: 'status', numeric: false, disablePadding: true, label: 'status' }
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, classes } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell className={classes.checkboxcell} >
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                            />
                    </TableCell>
                    
                    {
                        rows.map(row => {
                            return (
                                <TableCell
                                    key={row.id}
                                    numeric={row.numeric}
                                    padding={'none'}
                                    sortDirection={orderBy === row.id ? order : false}
                                    >
                                
                                    <Tooltip
                                        title="Sort"
                                        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                        >
                        
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                            >
                                            {row.label}
                                        </TableSortLabel>
                            
                                    </Tooltip>
                                </TableCell>
                            );

                        }, this)
                    }

                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },

    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (

        <Toolbar
            className={classNames(classes.root, {
                        [classes.highlight]: numSelected > 0,
                    })
                }
                >
        
            <div className={classes.title}>
                {
                    numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography variant="title" id="tableTitle">
                            Users
                        </Typography>
                    )
                }
            </div>
            
            <div className={classes.spacer} />

            <div className={classes.actions}>
                {
                    numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    )
                }
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width    : '100%',
        marginTop: theme.spacing.unit * 3,
    },
    avatar: {
        width        : 40,
        height       : 40,
        margin       : 0,
        padding      : 3,
        borderRadius : 0
    },
    checkboxcell : {
        padding      : 0,
        maxWidth     : 30,
    },
    table        : {
        minWidth     : 1020,
    },
    tableWrapper : {
        overflowX    : 'auto',
    },
    deleteIcon   : {
        color        : '#959595',
        textAlign    : 'center',
        verticalAlign: 'middle',
        '&:hover': {
            color: '#a23333',
        }
    },
    showIcon: {
        color        : '#959595',
        textAlign    : 'center',
        verticalAlign: 'middle',
        '&: hover': {
            color: '#3d6501',
        }
    }
});

class Users extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        isLoaded: false,
        selected: [],
        users: [],
        meta: {},
        page: 0,
        rowsPerPage: 5,
    };
    componentWillMount () {
        api.get('/api/user')
            .then(res => {
                this.setState({
                    users: res.data.data,
                    meta: res.data.meta.pagination,
                    isLoaded: true
                    });
            })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order     = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { users, meta, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

        if (!this.state.isLoaded) {
            return (
                <CircularProgress color="secondary" />
            )
        }

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
            
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                    
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={users.length}
                            classes={classes}
                            />
                        
                        <TableBody>
                            {
                                users.map( n => {
                                    const isSelected = this.isSelected(n.id);
                    
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                                >
                            
                                                <TableCell 
                                                    className={classes.checkboxcell} 
                                                    onClick={event => this.handleClick(event, n.id)}>
                                    
                                                    <Checkbox checked={isSelected} />
                                                </TableCell >
                                    
                                                <TableCell padding="none">
                                                    <Avatar alt="Remy Sharp" src={n.avatar} className={classes.avatar} />
                                                </TableCell>
                                
                                                <TableCell component="th" scope="row" padding="none">
                                                    {n.name}
                                                </TableCell>
                                                <TableCell padding="none">{n.firstname}</TableCell>
                                                <TableCell padding="none">{n.lastname}</TableCell>
                                                <TableCell padding="none">{n.email}</TableCell>
                                                <TableCell padding="none">{n.status}</TableCell>
                                
                                                <TableCell padding="none">                        
                                                        <DeleteForeverIcon className={classes.deleteIcon} /> 
                                                        <VisibilityIcon className={classes.showIcon} />
                                                </TableCell>

                                            </TableRow>
                                        );
                                    }
                                )
                            }
                
                            {
                                emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
        
        
                <TablePagination
                    component="div"
                    count={meta.total}
                    rowsPerPage={10}
                    page={1}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                    
            </Paper>
        );
    }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
