import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

import {loadData} from '../redux/user.redux'

@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    
    componentWillMount() {
        let to = ''
        // const arr = ['/login','/register'];
        // const pathaname = this.props.location.pathname;
        // if(arr.indexOf(pathaname)>-1){
        //     return null
        // }
         
        
        axios.get('/users/info').then((res)=>{
            if (res.status==200) {
                if(res.data.code==0){
                    this.props.loadData(res.data)
                    // resolve(res.data.data.type);
                }else{
                    this.props.history.push('/login')
                }
            }
        })
        

        // .then(function (data) {
        //     to = `1+${data}`  
        //     return Promise.resolve(to);                         
        // }).then(function (data) {
        //    console.log(data)                        
        // })
        
    }
    render(){
        return null
    }
    
}

export default AuthRoute;