import React, {useEffect} from 'react'
import {Button, Container, Row} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import './LandingPage.css'
const LandingPage = () => {

    const navigate = useNavigate()

    // useEffect(()=>{

    //     const userInfo = localStorage.getItem("userInfo")
    //     if(userInfo){
    //         navigate('/mynotes')
    //     }

    // },[history])

  return (
    <div className='main'>
        <Container>
            <Row>
                <div className="intro-text">
                    <div>
                        <h1 className='title'>Welcome To Note Zipper</h1>
                        <p className='subtitle'>One Safe Place to Save All Your Notes</p>
                    </div>
                    <div className="buttonContainer">
                        <a href="/login">
                            <Button 
                            size="lg" 
                            className="landingButton" 
                            >Login
                            </Button>
                        </a>
                        <a href="/register">
                            <Button 
                            size="lg" 
                            className="landingButton" 
                            variant="outline-primary">Register
                            </Button>
                        </a>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
  )
}

export default LandingPage