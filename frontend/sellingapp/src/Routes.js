import React from 'react'
import { Switch , BrowserRouter ,Route} from 'react-router-dom'
import Login from './pages/Login';
import Dashbord from './pages/Dashbord';
import  Registration from './pages/Registration'
import Products from './pages/Products'
import Myproduct from './pages/Myproduct'
export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
         <Route path='/login' exact component={Login}/>
         <Route path='/dashbord' component={Dashbord}/>
         <Route path='/register' exact component={Registration} />
         <Route path='/product'exact component={Products}/>
         <Route path='/myproduct' exact component={Myproduct}/>
        </Switch>
        
        </BrowserRouter>
    )
}
