import React, {Component} from 'react'
import {List, InputItem, NavBar} from 'antd-mobile';
import {getcookie} from '../util/util'
import {connect} from 'react-redux'

import {getMsglist, sendMsg, recMsg} from '../redux/chat.redux'
@connect(state => state, {getMsglist, sendMsg, recMsg})
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: [],
            from: sessionStorage.getItem('id'),
            to: this.props.location.state.v._id
        }
    }

    
    componentWillMount(){
        const state = this.state
        console.log(state)
        this
            .props
            .getMsglist(state);
        if (this.props.chat.chatMsg.length==0) {
            this
                .props
                .recMsg()
        }

    }

    handleSumbit() {
        const from = this.props.user._id;
        const to = this.props.location.state.v._id;
        const msg = this.state.text
        this
            .props
            .sendMsg({from, to, msg})
        this.setState({text: ''})
    }

    render() {
        const target = this.props.location.state.v._id;

        return (
            <div className="pad">
                <NavBar mode='dark'>
                    {this.props.location.state.v.user}
                </NavBar>
                <div>{this
                        .props
                        .chat
                        .chatMsg
                        .map(v => {
                            return v.from == target
                                ? (
                                    <List key={v._id}>
                                        <List.Item>
                                            对方说:{v.content}
                                        </List.Item>
                                    </List>
                                )
                                : (
                                    <List key={v._id}>
                                        <List.Item className="chat-me">
                                            我说:{v.content}
                                        </List.Item>
                                    </List>
                                )
                        })}
                </div>
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => this.setState({text: v})}
                            extra={< span onClick = {
                            () => this.handleSumbit()
                        } > 提交 < /span>}></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat