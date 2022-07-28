import React from 'react'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../Components/MainScreen'
import axios from 'axios'
import './LoginPage.css'
import Loading from '../../Components/Loading'

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                "Content-type":"application/json"
                }
            }
            setLoading(true)

            const {data} = await axios.post(`/api/users/login`, {
                email,
                password
                },
                config
            )
            console.log(data, "===> ini dari LoginPage")
            localStorage.setItem('userInfo', JSON.stringify(data) )
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    
  return (<MainScreen title='Login'>
    <div className="loginContainer">
        {loading && <Loading/>}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type='email'
                value={email}
                placeholder="Enter Email.."
                onChange={(e)=>setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                value={password}
                placeholder="Enter Passsword.."
                onChange={(e)=>setPassword(e.target.value)}
                />
            </Form.Group>
            <Button 
            type="submit"
            variant="primary"
            className="mt-3"
            >
                Submit
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer ? <Link to='/register'>Register Here</Link> 
            </Col>
        </Row>
    </div>
  </MainScreen>
  )
}

export default LoginPage