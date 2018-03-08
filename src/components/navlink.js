import React, {Component} from 'react'
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(state => state.chat)
class NavLink extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const navList = this
            .props
            .data
            .filter(v => !v.hide);
        const {pathname}=this.props.location
        return (
            <TabBar>
                {
                    navList.map(v => (
                    <TabBar.Item
                        badge={v.path=='/msg'?(this.props.unread):null}
                        title={v.text}
                        key={v.path}
                        icon={< div style = {{ width: '22px', height: '22px', background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center / 21px 21px no-repeat' }}/>}
                        selectedIcon={< div style = {{ width: '22px', height: '22px', background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center / 21px 21px no-repeat' }}/>}
                        selected={pathname==v.path}
                        onPress={() => {
                        this.props.history.push(v.path)
                        }}>
                    </TabBar.Item>
                    ))
                }
            </TabBar>
        )
    }
}

export default NavLink