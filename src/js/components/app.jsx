import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Header from './header.jsx';
import Input from './input.jsx';
import Success from './success.jsx';
import Groups from './groups.jsx';
import Admin from './admin.jsx'

function App() {
    
    return (
        <>
            <Router>
            <Header />
                <Route exact path="/">
                    <Input />
                </Route>
                <Route exact path="/success">
                    <Success />
                </Route>
                <Route exact path="/groups">
                    <Groups
                    />
                </Route>
                <Route exact path="/admin">
                    <Admin
                    />
                </Route>
            </Router>
        </>
    )
};

export default App;
