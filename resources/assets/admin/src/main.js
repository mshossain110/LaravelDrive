import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import Layout from '@ac/layout';
import CssBaseline from '@material-ui/core/CssBaseline';



const App = () => {
    return (
        <HashRouter>
            <React.Fragment>
                <CssBaseline />
                <Layout />
            </React.Fragment>
        </HashRouter>
    );
}


ReactDOM.render( <App />, document.getElementById('root'));

