import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import MainScreen from '../../Components/MainScreen'
import ErrorMessage from '../../Components/ErrorMessage'
import Loading from '../../Components/Loading'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import './RegisterPage.css'
const RegisterPage = () => {
  

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [picMessage, setPicMessage] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(password, "password biasa");
    console.log(confirmPassword, "confirm password");
    if(password !== confirmPassword){
      setMessage("Password does not match")
    } else {
      setMessage(null)
      try {
        const config = {
          headers : {
            "Content-type" : "application/json"
          }
        }

        setLoading(true)

        const {data} = await axios.post('/api/users', 
          {name, pic, email, password},
          config,
        )

        setLoading(false)
          localStorage.setItem('userInfo', JSON.stringify(data))
          console.log(data, "==>");
        } catch (error) {
          setError(error.response.data.message)
        }
        
      } 

    }
  
    const postDetails = (pics) => {
      if(!pics){
        return setPicMessage("Please Pick an Image")
      }
      setPicMessage(null)
      if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
        const data = new FormData()
        data.append('file', pics)
        data.append('upload_preset', 'notezipper-ian')
        data.append('cloud_name', 'cloudinaryian')
        axios.post("https://api.cloudinary.com/v1_1/cloudinaryian/image/upload", {
          method: 'post',
          body: data,
        })
        .then((res)=>{
          res.json()
        })
        .then((data)=>{
          console.log(data.response);
          setPic(data.url.toString())
        })
        .catch((err)=> console.log(err))

      }
    }
      

      // const uploadImage = (files) => {
      //   const formData = new FormData()
      //   formData.append('file', files[0])
      //   formData.append('upload_preset', "notezipper-ian")
      //   Axios.post("https://api.cloudinary.com/v1_1/cloudinaryian/image/upload", formData)
      //   .then((response)=>{
      //     console.log(response);
      //   })
      // }
  

  return (
    <MainScreen title='REGISTER'>
        <div className="loginContainer">
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
        {loading && <Loading/>}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='name'
                value={name}
                placeholder="Enter Name.."
                onChange={(e)=>setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                type='email'
                value={email}
                placeholder="Enter Email.."
                onChange={(e)=>setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='formPasswordBasic'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                value={password}
                placeholder="Enter Passsword.."
                onChange={(e)=>setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='formConfirmPasswordBasic'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type="password"
                value={confirmPassword}
                placeholder="Confirm Passsword.."
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
            </Form.Group>
            {picMessage && (<ErrorMessage variant='danger'>{picMessage}</ErrorMessage>)}
            <Form.Group controlId="pic" className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <div className="custom-file mb-3">
            <input 
            type="file" 
            className="custom-file-input" 
            id="customFile" 
            name="filename"
            onChange={(e)=> postDetails(e.target.files[0])}
            />
            <label className="custom-file-label" for="customFile">Upload Profile Picture</label>
            </div>
            </Form.Group>
              <Button 
              type="submit"
              variant="primary"
              className="mt-3"
              >
                  Register
              </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have An Account ? <Link to='/login'>Login</Link> 
            </Col>
        </Row>
    </div>
    </MainScreen>
  )
}

export default RegisterPage