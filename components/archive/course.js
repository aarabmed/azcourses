import React from "react";
import dynamic from "next/dynamic";
import Card from '@material-ui/core/Card';
import axios from "axios";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useRouter} from "next/router";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import ReCAPTCHA from "react-google-recaptcha";

import {COURSE } from "../../utils/api_routes";


const Button =dynamic(()=>import("components/CustomButtons/Button.js"))

const axiosInstance = axios.create({
    validateStatus: function (status)
    {
        return true
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    textAlign:'center',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};

const Index = (props)=>{
    const {
        className,
        data,
        ...rest
    } = props

    const [responseError , setRessponseError] = React.useState('')
    const [captcha,setCaptcha] = React.useState('');
    const [success,setSuccess] = React.useState(false);
    const [downloadModal, setDownloadModal] = React.useState(false)
    const router = useRouter()
    const recaptchaRef = React.createRef();

    const downloadTorrent = async (item)=>{
        if(captcha){        
            const body = {
                id:item._id,
                captcha,
                isArchive:true
            }

            const {data,status} = await axiosInstance.post(`${COURSE}/download`,body,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            
            if(status===422){
                setRessponseError(data.message)
                if(recaptchaRef.current)recaptchaRef.current.reset(); 
                return
            }

            if(status===200){
                if(recaptchaRef.current)recaptchaRef.current.reset();        
                router.push(`https://itorrents.org/torrent/${data.hashCode}.torrent?title=[ ${item.platForm.toUpperCase()} ] - ${item.title}`)
                setSuccess(true)
            }
        }else{
            setRessponseError('check the captcha box to download the torrent')
        }
    }

    const courseOnclick = ()=>{
        setDownloadModal(true)
    }

    const onCloseModal = ()=>{
        setDownloadModal(false)
        if(recaptchaRef.current)recaptchaRef.current.reset();
        setRessponseError('')
        setSuccess(false)
    }

    const onReCAPTCHAChange = (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if(!captchaCode) {
          return;
        }
        // Else reCAPTCHA was executed successfully so proceed with the 
        // alert
        setRessponseError('')
        setCaptcha(captchaCode)
        // Reset the reCAPTCHA so that it can be executed again if user 
        // submits another email.
        
      }

    return<>
        <Card className={"course-card "+(className?className:null)}>
            <CardActionArea className="course-card-container">
                <CardContent className="course-card-content">
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.title}
                    </Typography>
                    <div className="course-card-rating">
                        <span className="r">Platform : {data.platForm.charAt(0).toUpperCase() + data.platForm.slice(1)}</span>
                        <span className="archive-fsize">Size : {data.size}</span>
                    </div>
                </CardContent>
            </CardActionArea>
            <Button
                    variant="contained"
                    color="primary"
                    className="archive-getLink"
                    size="lg"
                    onClick={courseOnclick}
                    >
                    Get Torrent
            </Button>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={downloadModal}
        onClose={onCloseModal}
      >
          <Box sx={style}>
            {!success?<div>

                {responseError?<span className="archive-response-error">* {responseError}</span>:null}
                <Button
                    variant="contained"
                    color="primary"
                    size="lg"
                    onClick={()=>downloadTorrent(data)}
                    startIcon={<CloudDownloadIcon/>}
                    >
                    DOWNLOAD
                </Button>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="normal"
                    sitekey='6LdxipMhAAAAAEBS5lO6UBsaHtd6ioGqU5yBHEkl'
                    onChange={onReCAPTCHAChange}
                    className='archive-captcha'
                />  
            </div>:<div className="archive-success-download">
                <img src="/img/success.png" alt='success'/>
                <p>Torrent has been download successfully</p>
            </div>}
          </Box>
      </Modal>
    </>
  }
 
  export default Index