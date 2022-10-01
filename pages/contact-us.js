import React,{useState} from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import axios from "axios"
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  makeStyles
} from '@material-ui/core';

import * as Yup from "yup"
import { Formik, Form, Field,useField } from "formik"
import { TextField } from "formik-material-ui"

import dynamic from "next/dynamic";
import Head from "next/head";
import { CONTACT } from "../utils/api_routes";
import ReCAPTCHA from "react-google-recaptcha";

const Layout = dynamic(()=>import("components/Layout"));


const useStyle = makeStyles((theme) => ({
    padding: {
      padding: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1),
    },
}))

const initialValues = {
  name: "",
  subject: "",
  message: "",
  email: "",
}


let validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Required"),
    subject: Yup.string().trim().required("Required"),
    email: Yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'enter a valid email').required("Required"),
    message: Yup.string().max(1000).required("Required"),
})


const MyTextArea = ({label,...props}) => {
    const [field,meta] = useField('message');
    return (
        <>  
            <div className="MuiInputBase-fullWidth MuiInputBase-formControl message-text-area">
                <label htmlFor={props.id || props.name}>{label}</label>
                <textarea {...field} {...props} className={ meta.error?'message-error':null}/>
                    
            {meta.touched && meta.error ? (
                <p className="Mui-error">{meta.error}</p>
            ) : null}
            </div>
        </>
    );
};


const axiosInstance = axios.create({
  validateStatus: function (status)
  {
      return true
  }
});

const Index =({menu,content})=>{
  const [message,setMessage] = useState('');
  const [captcha,setCaptcha] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const recaptchaRef = React.createRef();

  const classes = useStyle()

  const axiosHeader = ()=>{
    const config = {
        headers: { 'Content-type': 'application/json' },
    };
    return config
  }
  
  const onReCAPTCHAChange = (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if(!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the 
    // alert
    setError('')
    setCaptcha(captchaCode)
    // Reset the reCAPTCHA so that it can be executed again if user 
    // submits another email.
    
  }

  const onSubmit = (data) => {
    if(!captcha){
      setError('Validate the captcha check box, than click submit')
      return
    }
    setLoading(true);
    axiosInstance.post(
      CONTACT,
      {captcha,...data},
      axiosHeader()
   ).then(res=>{
        
        if (res.status===200) {
            setMessage(res.data.message)
            setLoading(false);
            recaptchaRef.current.reset();
        }else if(res.status===422){
            setLoading(false);
            setError(res.data.message)
            recaptchaRef.current.reset();
        }
        }).catch(e=>{      
            setLoading(false);
            if(recaptchaRef.current)recaptchaRef.current.reset();
        })                                  
  }

  return <>
            <Head>
              <title>Contact us | AZcourses </title>
            </Head>
            <Layout menu={menu}>
                    <Grid container>
                        <Grid item xs={8} className="container az-privacy">
                            <h1> Contact us</h1>            
                            {message?<Card className={classes.padding}><div className="contact-thankyou"><p><strong>{message}</strong></p></div></Card>:<Card className={classes.padding}>
                                <CardHeader title="Write to us, if you have any question or suggestion related to our service."></CardHeader>
                                  {error?<div className="contact-message"><p><strong>{error}</strong></p></div>:null}
                                  <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}>
                                    {({ dirty, isValid, values, handleChange, handleBlur }) => {
                                    return (
                                        <Form>
                                        <CardContent className="az-contact-form">
                                            <Grid item container spacing={1} justifyContent="flex-start">
                                              <Grid item xs={7} md={7}>
                                                  <Field
                                                  label="Name"
                                                  variant="outlined"
                                                  fullWidth={true}
                                                  name="name"
                                                  value={values.name}
                                                  component={TextField}
                                                  />
                                              </Grid>
                                              <Grid item xs={7} md={7}>
                                                  <Field
                                                  label="Email"
                                                  variant="outlined"
                                                  fullWidth={true}
                                                  name="email"
                                                  value={values.email}
                                                  component={TextField}
                                                  />
                                              </Grid>
                                              <Grid item xs={7} md={7}>
                                                  <Field
                                                  label="Subject"
                                                  variant="outlined"
                                                  fullWidth={true}
                                                  name="subject"
                                                  value={values.subject}
                                                  component={TextField}
                                                  />
                                              </Grid>
                                              
                                              <Grid item xs={12} md={12}>
                                                  <Field
                                                  label="Your message"
                                                  variant="outlined"
                                                  name="massage"
                                                  as="textarea"
                                                  value={values.message}
                                                  rows="6"
                                                  component={MyTextArea}
                                                  />
                                                      
                                                  
                                              </Grid>
                                            </Grid>
                                            <ReCAPTCHA
                                              ref={recaptchaRef}
                                              size="normal"
                                              sitekey='6LdxipMhAAAAAEBS5lO6UBsaHtd6ioGqU5yBHEkl'
                                              onChange={onReCAPTCHAChange}
                                            />  
                                        </CardContent>
                                                           
                                         <CardActions>
                                            <LoadingButton
                                              disabled={!dirty || !isValid}
                                              variant="contained"
                                              color="primary"
                                              type="Submit"
                                              endIcon={<span></span>}
                                              loading={loading}
                                              loadingPosition="end"
                                              className={classes.button}>
                                              Submit
                                            </LoadingButton>
                                        </CardActions>
                                        </Form>
                                    )
                                    }}
                                </Formik>
                            </Card>}
                        </Grid>
                    </Grid> 
              </Layout>
        </>
}

export default Index

export const getServerSideProps = async (ctx) => {
  const platformsResponse = await axios.get(`process.env.categories`)
  
  
  const popularCourses = await axios.get(`process.env.popularCourses`)




  return {
    props:{
      menu:platformsResponse.data.platforms,
      content:popularCourses.data.courses
  }}
}


