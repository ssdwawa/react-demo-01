import React, {Component} from 'react'
import {
    NavBar,
    Icon,
    InputItem,
    List,
    TextareaItem,
    Button,
    WhiteSpace
} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {createForm} from 'rc-form';
import axios from 'axios';

import {updata} from '../../redux/user.redux'
import {getcookie} from '../../util/util'
import {pageDir} from '../../util/util'
@connect(state => state.user, {updata})
class GeniusInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            desc: ''
        }
    }

    componentDidMount() {
        let nb = ''
        let userid = getcookie('userid')
        let pd = pageDir('genius');
        pd.then((res) => {
            res
                ? null
                : this
                    .props
                    .history
                    .push('/login')
        })
    }

    handeleEvent(key, val) {
        this.setState({[key]: val})
    }
    save() {}
    render() {
        const {getFieldProps} = this.props.form;
        return (
            <div>
                {this.props.redir
                    ? <Redirect to={this.props.redir}></Redirect>
                    : null}
                <NavBar mode="dark">牛人信息页</NavBar>
                <InputItem
                    onChange={v => {this.handeleEvent('title', v)}}>求职岗位:</InputItem>
                <List renderHeader={() => '个人简介'}>
                    <TextareaItem
                        onChange={v => {
                        this.handeleEvent('desc', v)
                    }}
                        rows={5}
                        count={500}/>
                </List>
                <WhiteSpace/>
                <Button onClick={() => this.props.updata(this.state)} type="primary">保存</Button>
            </div>
        )
    }
}

export default createForm()(GeniusInfo);