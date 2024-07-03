import {cookies} from "next/headers";
export  function isLogin (){
    let cookie=cookies();
    let token=cookie.get("token");
    return typeof token !== 'undefined';
}

export async  function getCookies (){
    let cookie=cookies();
    let token=cookie.get("token");
    if(typeof token === 'undefined'){
        return false
    }else{
        return 'token='+token.value
    }
}

/// user for SWR data fetching 
export async  function Fetcher (url){
    const res = await fetch(url);
    return await res.json();
};