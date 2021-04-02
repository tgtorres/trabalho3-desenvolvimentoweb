import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './Main';

import Member from './Member';

const Routes = () => {
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/members/:id" component={Member}/>
        </Switch>
    </BrowserRouter>
};

export default Routes;