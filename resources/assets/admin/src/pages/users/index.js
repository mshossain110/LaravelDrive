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
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import UserTableAppBar from './UserTableAppBar';
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
                <TableRow className={classes.headerrow}>
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

                    <TableCell>
                        
                    </TableCell>

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
    },
    headerrow: {
        height: 30,
        borderTop: '2px solid #929292',
        borderBottom: '2px solid #929292'
    },
    actiontoolbar : {
        flexGrow: 1,
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
            <div className={classes.root}>
                <UserTableAppBar />    

                <Toolbar className={classes.actiontoolbar}>
                    <NativeSelect className={classes.actiontoolbar}>
                        <option value="Actions" > Bulk Actions </option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                    <Input
                        placeholder="Search ..."
                        id="adornment-password"
                        type="Search"
                        endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                        }
                    />       

                </Toolbar>

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
                    
            </div>
        );
    }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
