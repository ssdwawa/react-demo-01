import axios from 'axios';
export function getRd({type,title}){
    let url = (type =='boss')?'/boss':'/genius'
    if(!title){
        url += 'info'
    }
    return url
}

export function getcookie(name){
    
    var strcookie = document.cookie;
    var arrcookie = strcookie.split('; ');
    console.log(strcookie)
    for(let i =0;i<arrcookie.length;i++){
       let cookie= arrcookie[i].split('=');
        if(name == cookie[0]){
            
            return cookie[1]
        }
    }
    return null
}

export async function pageDir(pos){
    let pd =''
    let res = await axios.get('users/info')
    if(res.data.code==0 && res.data.data.type==pos){
        pd = true
    }
    return pd
}