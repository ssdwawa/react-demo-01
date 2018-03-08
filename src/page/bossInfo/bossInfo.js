import React, {Component} from 'react'
import {NavBar, Icon, InputItem, List, TextareaItem,Button,WhiteSpace} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { createForm } from 'rc-form';

import { updata } from '../../redux/user.redux'
@connect(
    state=>state.user,
    {updata}
)
class BossInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            company: '',
            money: '',
            require: ''
        }
    }
    handeleEvent(key, val) {
        this.setState({[key]: val})
    }
    save(){
        console.log()
    }
    render() {
        const { getFieldProps } = this.props.form;        
        return (
            <div>
                 {this.props.redir?<Redirect to={this.props.redir}></Redirect>:null}
                <NavBar mode="dark">Boss信息页</NavBar>
                <InputItem onChange={v => {this.handeleEvent('title', v)}}>招聘职位:</InputItem>
                <InputItem onChange={v => {this.handeleEvent('company', v)}}>公司名称:</InputItem>
                <InputItem onChange={v => {this.handeleEvent('money', v)}}>薪资:</InputItem>
                <List renderHeader={() => '职位要求'}>
                <TextareaItem onChange={v=>{this.handeleEvent('require',v)}}   rows={5} count={500} />
                </List>
                <WhiteSpace/>
                    <Button onClick={()=>this.props.updata(this.state)} type="primary">保存</Button>
            </div>
        )
    }
}


export default createForm()(BossInfo);
