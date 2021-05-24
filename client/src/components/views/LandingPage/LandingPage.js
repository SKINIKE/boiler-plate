import React, {useEffect} from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

    useEffect(() =>{
        Axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {
        Axios.get('/api/users/logout')
            .then(response => {
                console.log(response.data)
                if(response.data.success){
                    alert('Success to Logout')
                    props.history.push('/Login')
                }else{
                    alert('Failed to Logout')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>
               Logout
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
