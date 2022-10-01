import React, { useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import Head from "next/head";

import Grid from '@material-ui/core/Grid';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import dynamic from "next/dynamic";


import axios from "axios";

import Box from "@mui/material/Box";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Avatar from '@material-ui/core/Avatar'; 
import Rating from '@material-ui/lab/Rating';

import parse from 'html-react-parser';
import { ProgressBar } from 'react-bootstrap';
import { COURSE } from "../../utils/api_routes";
import { useRouter } from 'next/router'
import { parseMagnet } from 'parse-magnet-uri';

const Button =dynamic(()=>import("components/CustomButtons/Button.js"))
const Layout =dynamic(()=>import("components/Layout/index.js"))
const Similar =dynamic(()=>import("components/Popover/index.js"))

const axiosInstance = axios.create({
    validateStatus: function (status)
    {
        return true
    }
});




const Reviews = ({reviews}) =>{
    return reviews.map((review,index)=><AccordionDetails key={index}>
        <div className="single-review">
            <div className="review-title">
                <Avatar src="">{Boolean(review.userName.match(/[a-zA-Z]/))?review.userName.match(/\b\w/g).join('').toUpperCase():review.userName}</Avatar>
                <div className="review-info">
                    <span>{review.userName}</span>
                    <Rating name="half-rating" value={review.rating} precision={0.5} readOnly/>
                </div>
            </div>
            <div className="review-description">
                <p>{review.content}</p>
            </div>
        </div>
    </AccordionDetails>)

}



const Index =({similar,course,menu})=>{
  const [progressValue, setProgressValue] = React.useState(0);
  const [progressOn , setProgressOn] = React.useState(false)
  const [showReviews , setShowReviews] = React.useState(false)
  const [responseError , setRessponseError] = React.useState('')
  const [download,setDownload] = React.useState(false);
  const [selectedTorrent,setSelectedTorrent] = React.useState('');
  const [torrentSize,setTorrentSize] = React.useState('');

  const route = useRouter()

  const startDownload=()=>{
    if(selectedTorrent){
        let torrent = parseMagnet(selectedTorrent);
        const hash = torrent.xt.split(':')[2]
        setDownload(false)
        setSelectedTorrent('')
        setProgressValue(0)
        return route.push(`${hash}.torrent?title=[AZCOURSES.IO - ${course.platForm.toUpperCase()}] - ${course.title}-[${torrentSize}]`)
    }
  }

  const getTorrent = async ()=>{

        if(!selectedTorrent)return setRessponseError('you need to select a torrent file from the box above to proceed')
         
        const body = {
            id:course._id,
            isArchive:false,
        }

        const {data,status} = await axiosInstance.post(`${COURSE}/download`,body,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
        
        if(status===422){
            setRessponseError(data.message)
            return
        }

        if(status===200){
            setProgressOn(true);
        }
    
  }



  const onSelectTorrent=(item)=>{
    setSelectedTorrent(item.magnet)
    setTorrentSize(item.size)
    setRessponseError('')
  }


  useEffect(()=>{
    if(progressOn){
        const progressBar = setInterval(() => {
            setProgressValue(old=>{
                const newValue = old + 5;
                if(newValue===100){
                    setProgressOn(false)
                    setDownload(true)
                    clearInterval(progressBar);
                }
                return newValue
            })
            
        }, 250);
    }
  },[progressOn])
  
  return <>
    <Head>
            <title>{course.title} | {course.platForm.charAt(0).toUpperCase() + course.platForm.slice(1)} premium & free courses </title>
            <meta name="description" content={course.description.substring(0,160)+'...'} />
    </Head>
    <Layout menu={menu}>
        <Grid container>
            <Grid item xs={11} className="container">
                <Grid container justifyContent="center" spacing={5}>
                    <Grid item className="" xs={7}>
                        <div className="course-details">
                            <h1>{course.title}</h1>
                            <h2>{course.sub_title}</h2>
                            <img width="100%" src={`${course.image}`} alt={course.title}/>
                            <div className="course-description">
                                <h3>Instructors:</h3>
                                <span>{course.instructors}</span>
                            </div>
                            <div className="course-description">
                                <h3>Description:</h3>
                                {parse(course.description)}
                            </div>
                            <br/>
                            <div className="content-section">
                                <h3>Course content:</h3>
                                <div className="course-centent">
                                    {course.content?parse(course.content):null}
                                </div>
                            </div>
                            <br/>
                            <div className="download-section">
                                    <h3>Download this course:</h3>
                                        <h6 style={{fontWeight: 'lighter'}}>file type : Torrent</h6>
                                        <div className="download-container">
                                            <h6 style={{fontWeight: 'lighter'}}>Files : </h6>
                                            <ul>
                                                {course.torrents.map((item,index)=><li key={index} onClick={()=>onSelectTorrent(item)}><div className={item.magnet===selectedTorrent?"torrent-item active":"torrent-item"}><span>Torrent {index+1}</span><span>{item.size}</span></div></li>)}
                                            </ul>
                                            <span>*select one of the torrent file above to download the course</span>
                                        </div>
                                        <div className="course-downlaod">
                                            {responseError?<span className="download-response">{responseError}</span>:null}
                                            {progressOn?<div className="torrent-file">
                                            <p>retreive Torrent ...</p>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <ProgressBar now={progressValue} label={`${progressValue}% completed`}/>
                                            </Box></div>:(<div className="download">
                                                    {download?<Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="lg"
                                                                onClick={startDownload}
                                                                startIcon={<CloudDownloadIcon/>}
                                                                >
                                                            download
                                                        </Button>:
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="lg"
                                                            onClick={getTorrent}
                                                        >
                                                            Get The Torrent 
                                                        </Button>
                                                    </>
                                                    }
                                                    
                                                </div>)}

                                        </div>
                                    
                                    <span style={{color: "#a4a4a4c9"}}>source: {course.courseUrl}</span>
                            </div>
                            <br/>
                            <div className="reviews-section">
                                <h3>Top reviews:</h3>
                                <div className="course-reviews">
                                    <Accordion onClick={()=>setShowReviews(!showReviews)} className="reviews-container">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                        <Typography style={{color:'#0058ff'}}>{showReviews?'Hide reviews':'Show reviews'}</Typography>
                                        </AccordionSummary>
                                        {course.reviews.length?<Reviews reviews={course.reviews}/>:<div className="no-review"><span>this course has no reviews yet</span></div>}
                                    </Accordion>
                                </div>
                            </div>
                            <br/>
                            {similar.length?<div className="similar-course-section">
                                <h3>Similar courses:</h3>
                                <Grid container >
                                    {similar.map(item=><Similar key={item._id} course={item}/>)}
                                </Grid>
                            </div>:null}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Layout>
  </>
}


export const getServerSideProps = async ({params}) => {
    const platformsResponse = await axios.get(`process.env.categories`)
    const res = await axios.get(`process.env.course/${params.id.replace(/#/g,'%23')}`)
     
    return {
        props:{
            course:res.data.course,
            similar:res.data.similar_courses,
            menu:platformsResponse.data.platforms,
        }
    }
  
} 


export default Index
