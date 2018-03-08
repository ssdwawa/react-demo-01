import axios from 'axios'

import io from 'socket.io-client'
const socket = io('ws://localhost:9093');  


const initState={
    userList:[],
    chatMsg:[],
    unread:0
}

export function chat (state=initState,action){
    switch (action.type) {
        case 'User_list':
            return{
                ...state,
                userList:action.payload
            }
        case 'Msg_list':
            return{
                ...state,
                chatMsg:action.payload,
                unread:action.payload?(action.payload.filter(v=>!v.read).length): 0
            }
        case 'Msg_rec':
            return{
                ...state,
                chatMsg:[...state.chatMsg,action.payload],
                unread:state.unread+1
            }
        case 'Msg_read':
            return{
                ...state,
                userList:action.payload
            }
        case 'unRead':
            return{
                ...state,
                chatMsg:[...action.payload],
                unread:action.payload?(action.payload.filter(v=>!v.read).length): 0
            }
        
        default:
            return state;
    }
}


function userList (data){
    return {
        type:'User_list',
        payload:data
    }
}

function msgList (msgs){
    return {type:'Msg_list',payload:msgs}
}
function msgRec (msgs){
    return {type:'Msg_rec',payload:msgs}
}
function unRead (msgs){
    return {type:'unRead',payload:msgs}
}

export function recMsg(){
    return dispatch =>{
        socket.on('recvMsg',(data)=>{
            console.log('e1')
            dispatch(msgRec(data))
        })
    }
}

export function sendMsg({from,to,msg}){
    return dispatch=>{
         socket.emit('sendmsg',{from,to,msg})
    }
}

export function getUserlist(type){
    return dispatch =>{
        axios.get('/users/list',{params:{type}}).
        then(res=>{
            if (res.data.code==0){
               dispatch(userList(res.data.data))
            }
        })
    }
}

export function getUnread(){
    return dispatch =>{
        axios.get('/chat/unread').
        then(res=>{
            if (res.data.code==0){
               dispatch(unRead(res.data.msg))
            }
        })
    }
}

export function getMsglist({from,to}){
    const chatId = [from,to].sort().join('_');
   
    return dispatch =>{
        axios.get('/chat/list',{params:{chatid:chatId}}).
        then(res=>{
            if (res.data.code==0){
               dispatch(msgList(res.data.msg))
            }
        })
    }
}

