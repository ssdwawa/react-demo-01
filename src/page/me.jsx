import React, {Component} from 'react'
import { Result, Icon, WhiteSpace,List } from 'antd-mobile';
import {connect} from 'react-redux'

@connect(
    state=>state.user
)
class Me extends Component {
    haha(){
        console.log('31313131')
    }
    render(){
        const props= this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        console.log(this.props)
        return props.title?(
            <div>
                <div onClick = {
                            () => this.haha()
                        }>123</div>
                <Result
                    img={<img src={'https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg'} style={{width: 60+'px',height: 60+'px'}}/>}
                    title={props.user}
                    message={props.type=='boss'?props.compant:null}
                />
                <List renderHeader={() => '个人简介'} >
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                    {props.title} 
                    {props.desc.split('\n').map(v=>{
                       return <Brief key={v}>{v}</Brief>
                    })}
                    {props.money?props.money:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>   
                <List >
                    <Item >
                    退出登陆
                    </Item>
                </List> 
            </div>
        ):null
    }
}

export default Me