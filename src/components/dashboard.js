import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUnread, recMsg} from '../redux/chat.redux'
import {NavBar, WhiteSpace} from 'antd-mobile';
import {getcookie} from '../util/util'
import NavLink from './navlink'
import Boss from '../page/boss'
import Genius from '../page/genius'
import Msg from '../page/msg'
import Me from '../page/me'

@connect(state => state, {getUnread, recMsg})
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pos: ''
        }
    }

    async componentWillMount() {
        console.log(this.props.user)
        let type = getcookie('type')
        await this.setState({pos: type})
        if(this.state.pos){
            this.props.history.push(`/${this.state.pos}`)
        }
        this
            .props
            .getUnread();
        if (!this.props.chat.chatMsg.length) {
            this
                .props
                .recMsg()
        }
    }

    render() {
        const user = this.props.user;
        const pathname = `/${this.state.pos}`;

        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: this.state.pos == 'genius'
            }, {
                path: '/genius',
                text: 'BOSS',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: this.state.pos == 'boss'
            }, {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            }, {
                path: '/me',
                text: '个人中心',
                icon: 'me',
                title: '个人中心',
                component: Me
            }
        ]

        return (

            <div>
                {this.state.pos
                    ? (
                        <div>
                            <NavBar mode="dark">{navList
                                    .find(v => v.path == pathname)
                                    .title}</NavBar>
                            <div>
                                <WhiteSpace/>
                                <Switch>
                                    {navList.map(v => (
                                        <Route key={v.path} path={v.path} component={v.component}></Route>
                                    ))}
                                </Switch>
                            </div>
                            <NavLink data={navList}></NavLink>
                        </div>
                    )
                    : <Redirect to='/login'></Redirect>}

            </div>
        )
    }
}

export default Dashboard