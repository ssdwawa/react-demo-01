import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './redux/reducer';
import './config'
import './index.css'
import Login from './page/login/login';
import Reg from './page/register/register';
import AuthRoute from './components/authroute';
import Dashboard from './components/dashboard';
import BossInfo from './page/bossInfo/bossInfo';
import GeniusInfo from './page/geniusInfo/geniusInfo'
import Chat from './page/chat'
const store = createStore(reducer , applyMiddleware(thunk))

class Root extends React.Component {
    render() {
        return ((
            <Provider store={store}>
                <Router >
                    <div> 
                        <AuthRoute></AuthRoute>
                        <Switch>
                            <Route path='/geniusinfo' component={GeniusInfo}/>
                            <Route path='/bossinfo' component={BossInfo}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/register' component={Reg}/>
                            <Route path='/chat' component={Chat}/>
                            <Route component={Dashboard}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        ))
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
export default store