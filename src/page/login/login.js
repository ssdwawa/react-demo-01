import React, { Component } from 'react'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'


import { login } from '../../redux/user.redux'
@connect(
    state=>state.user,
    {login}
)
class Login extends Component{
    constructor(props) {
        super(props)
        this.state={
            user:'',
            pwd:''
        }
    }
    
    register(){
        this.props.history.push('/register')
    }

    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }

    tologin(){
        this.props.login(this.state);
    }

    render(){
        return(
            <div>
                <h2>登录页</h2>
                {this.props.redir?<Redirect to={this.props.redir}></Redirect>:null}
                {this.props.msg?<p>{this.props.msg}</p>:null}
                <WingBlank>
                    <List>
                        <InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
                    </List>
                    <Button type="primary" onClick={()=>this.tologin()}>登陆</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register.bind(this)} type="primary">去注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login