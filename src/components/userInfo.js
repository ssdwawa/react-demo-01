import React,{Component} from 'react'
import {NavBar, Card, WingBlank, List, TextareaItem,Button,WhiteSpace} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
@withRouter
class UserInfo extends Component{
 
    handleClick(v){
        this.props.history.push({ pathname: '/chat', state: { v } });
    }

    render(){
        return(
            <div>
                <WingBlank>
                    {this.props.userInfo.map(v=>(
                        v.title?
                        (<Card 
                            key={v._id} 
                            onClick={()=>this.handleClick(v)}
                            >
                            <Card.Header
                                
                                title={v.user}
                                thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                                extra={<span>{v.title}</span>}
                            />
                            <Card.Body>
                                {
                                    v.type=='boss'?<div>公司:{v.title}</div>:null 
                                    
                                }
                                {
                                    v.desc.split('\n').map(v=>(
                                    <div key={v}>{v}</div>
                                ))}
                                {
                                    v.type=='boss'?<div>薪资:{v.money}</div>:null
                                }
                            </Card.Body>
                        </Card>):null
                    ))}
                </WingBlank>
            </div>
        )
    }
}

export default UserInfo