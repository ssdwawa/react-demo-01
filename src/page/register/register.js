import React, { Component } from 'react'
import {List,Radio,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'


import {register} from '../../redux/user.redux'
@connect(
    state=>state.user,
    {register}
)
class Register extends Component{
    constructor(props) {
        super(props)
        this.state={
            user:'',
            pwd:'',
            repwd:'',
            type:'genius'
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
       
    } 
    register(){
        this.props.register(this.state);
    }
    render(){
        const RadioItem = Radio.RadioItem
        return(
            <div>
                <h2>注册页</h2>
                {this.props.redir?<Redirect to={this.props.redir}></Redirect>:null}
                {this.props.msg?<p>{this.props.msg}</p>:null}
                <WingBlank>
                    <List>
                        <InputItem onChange={v=> this.handleChange('user',v)}>用户名称</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={v=> this.handleChange('pwd',v)}>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={v=> this.handleChange('repwd',v)}>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <RadioItem onChange={()=> this.handleChange('type','genius')} checked={this.state.type=='genius'}>牛人</RadioItem>
                    <RadioItem onChange={()=> this.handleChange('type','boss')} checked={this.state.type=='boss'}>Boss</RadioItem>
                    <Button type="primary" onClick={()=>{this.register()}}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register