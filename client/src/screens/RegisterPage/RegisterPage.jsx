import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import MainScreen from '../../Components/MainScreen'
import ErrorMessage from '../../Components/ErrorMessage'
import Loading from '../../Components/Loading'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import './RegisterPage.css'
import { useRef } from 'react'
const RegisterPage = () => {
  
  const fileInputRef = useRef()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
  const [password, setPassword] = useState("")
  const [imgDetails, setImgDetails] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [picMessage, setPicMessage] = useState(null)
  const [preview, setPreview] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const navigate = useNavigate()
    
    const handlePic = (e, uploadImage) => {
      
        if(e.target.files[0]){
          const file = e.target.files[0]
          setImgDetails(file)
          console.log(file, "==> ini file");
          const reader = new FileReader()
          reader.onloadend = () => {
            console.log(reader.result, "==> ini result reader");
            setImage(reader.result)
          }
          reader.readAsDataURL(file)
          console.log(image, "==> image handle");



        } else {
          return setPicMessage("Please Pick an Image")
        }

        
        // return setPicMessage("Please Pick an Image")
      // }
      // setPicMessage(null)
      // if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      //   console.log(pics, "===> ini pics");
      //   setImage(pics)
      //   console.log(pic, "==> ini pic ajah");
      //   console.log(image, "===> ini image");
      //   const data = new FormData()
      //   data.append('file', pics)
      //   data.append('upload_preset', 'notezipper-ian')
        // Axios.post("https://api.cloudinary.com/v1_1/cloudinaryian/image/upload", data)
        // .then((res)=>{
        //   console.log(res, "===> ini res");
        //   setPic(res.config.url.toString())
        //   console.log(pic, "===> ini pic");
        // })
        // .catch((err)=> console.log(err))


        // setImage(null)
      
    }

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
  
          const {data} = await Axios.post('/api/users', 
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

    useEffect(()=>{
      if(image){
        setPreview(image)
        console.log(preview, '===> dari use Effect')
        console.log(imgDetails, '===> dari use Effect')

      }
      else {
        setPreview(null)
      }
    },[image])
      

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
            <Form.Group controlId="pic" className="justify-content-evenly">
            <Form.Label>Pick Avatar</Form.Label>
            <Row>
              <Col md={6}>
              {preview ? <Image 
              style={{width:300, height:300, borderRadius: 8, objectFit:"cover", cursor:"pointer"}} 
              src={preview} 
              onClick={()=>{
                setImage(null)
              }}/> : 
              (<Button style={{width:300, height:300, borderRadius: 8}} onClick={(e) => {
                e.preventDefault()
                fileInputRef.current.click()}}>
              </Button>)}
              </Col>
              <Col style={{alignSelf:"center"}} md={6}>
              <input 
              type="file" 
              accept='image/*'
              ref={fileInputRef}
              onChange={handlePic}
              /> 
              </Col>
            </Row>
            </Form.Group>
            <Form.Group 
            style={{textAlign: "center"}}
            >
              <Col>
              <Button 
              type="submit"
              variant="primary"
              className="mb-3"
              size="lg"
              >
                  Register
              </Button>
              </Col>
              <span>
              Have An Account ? <Link to='/login'>Login</Link> 
              </span>
            </Form.Group>
        </Form>
        
    </div>
    </MainScreen>
  )
}

export default RegisterPage