import React, {Component} from 'react'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {connect} from 'react-redux';
import {getUnread} from '../redux/chat.redux'

@connect(state => state, {getUnread})
class Msg extends Component {

    componentWillMount() {
        getUnread()
    }

    handleClick(v){
        v._id = v.from
        this.props.history.push({ pathname: '/chat', state: { v } });
    }

    render() {
        const talkList = {};
        this.props.chat.chatMsg.forEach((v)=>{
            talkList[v.chatid]= talkList[v.chatid] || [];
            talkList[v.chatid].push(v)
        });
        const chatlist = Object.values(talkList);
        console.log(chatlist)
        return (
            <div>
                <WingBlank>
                    {chatlist
                        ? (chatlist.map((v,i) => (
                            <Card key={i} onClick={() => this.handleClick(v[0])}>
                                <Card.Header
                                    title={v[0].from}
                                    thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                                    />
                                <Card.Body>
                                    <div>
                                        {v[v.length-1].content}
                                    </div>
                                </Card.Body>
                            </Card>
                        )))
                        : null}
                </WingBlank>
            </div>
        )
    }
}

export default Msg