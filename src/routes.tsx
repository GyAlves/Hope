import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import HospitalsMap from './pages/HospitalsMap';
import Hospital from './pages/Hospital';
import CreateHospital from './pages/CreateHospital';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={HospitalsMap} />
                <Route path="/hospitals/create" component={CreateHospital} />
                <Route path="/hospitals/:id" component={Hospital} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

