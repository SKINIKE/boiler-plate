//import axios from 'axios';
//import { response } from 'express';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null){
    //option
    //null > 아무나 출입가능
    //true > 로그인 해야만 출입가능
    //false > 로그인 안된 유저만 출입가능
    //adminRoute = true이면 어드민만 출입가능

    function AthenticationCheck(props){
        
        const dispatch = useDispatch();
        
        useEffect(() => {
            dispatch(auth()).then(response => {
                //console.log(response)
                if(!response.payload.isAuth){
                    //로그인 안된 상태
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    //로그인 된 상태
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])
        return(
            <SpecificComponent />
        )
    }

    return AthenticationCheck
}