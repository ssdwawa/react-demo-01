import React, {Component} from 'react'
import {NavBar, Card, WingBlank, List, TextareaItem,Button,WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux'

import {getUserlist} from '../redux/chat.redux'
import UserInfo from '../components/userInfo'
@connect(
    state=>state.chat,
    {getUserlist}
)
class Genius extends Component {

    componentDidMount() {
        this.props.getUserlist('boss')
        
    }
    
    render(){
       
        return(
                <UserInfo userInfo={this.props.userList}></UserInfo>
        )
    }
}

export default Genius