import {  BrowserRouter, Switch, Route } from 'react-router-dom';

import Site from './pages/index';

export default function Rotes() {
    return (
        <BrowserRouter>
            <Switch> 
                <Route  path="/" exact={true} component={Site} />
            </Switch>
        </BrowserRouter> 
    )
}