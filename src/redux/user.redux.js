import axios from 'axios';
import {getRd} from '../util/util'

const initState = {
    redir: '',
    isAuth: '',
    msg: '',
    user: '',
    pwd: '',
    type: ''
}

//控制函数
export function user(state = initState, action) {
    switch (action.type) {
        case 'success':
            return {
                from:'login',
                ...state,
                msg: '',
                redir: getRd(action.payload),
                isAuth: true,
                ...action.payload
            };
        case 'loadData':
            return {
                from:'load',
                ...action.payload.data
            }
        case 'login_success':
            return {
                ...state,
                msg: '',
                redir: getRd(action.payload),
                isAuth: true,
                ...action.payload,
                pwd: ''
            };
        case 'update_success':
        return {
            redir: getRd(action.payload),
            ...action.payload
        };    
        case 'err':
            return {
                ...state,
                msg: action.msg,
                isAuth: false
            };
        default:
            return state;
    }

}

//如果错误向控制函数传入的actio.type
function errMsg(msg) {
    return {type: 'err', msg}
}

//如果正确执行的函数
function reqSucess(data) {
    return {type: 'success', payload: data}
}

function loginSucess(data) {
    return {type: 'login_success', payload: data}
}

function updateSucess(data){
    return {type: 'update_success', payload: {...data,avatar:true}}
}


//外部调用执行

export function loadData(data) {
    return {type: 'loadData', payload: data}
}
export function register({user, pwd, repwd, type}) {
    if (!user || !pwd) {
        return errMsg('请输入用户名和密码')
    }
    if (pwd != repwd) {
        return errMsg('密码不一致')
    }
    //异步请求
    return dispatch => {
        axios
            .post('/users/register', {user, pwd, type})
            .then((res) => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(reqSucess({user, pwd, type}))
                } else {
                    dispatch(errMsg('连接错误'))
                }
            })
    }

}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errMsg('请输入用户名和密码')
    }
    return dispatch => {
        axios
            .post('/users/login', {user, pwd})
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    sessionStorage.setItem('id',res.data.data._id)
                    console.log(res.data.data)
                    dispatch(loginSucess(res.data.data))
                } else {
                    dispatch(errMsg('连接错误'))
                }
            })
    }
}

export function updata({title, company, money, require,desc}) {
    return dispatch => {
    axios.post('/users/updata',{title, company, money, require,desc})
    .then(res => {
        if (res.status == 200 && res.data.code == 0) {
            dispatch(updateSucess(res.data.data))
        } else {
            dispatch(errMsg('连接错误'))
        }
    })
    }
}