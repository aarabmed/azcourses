import React from "react";

import axios from "axios"
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from "next/link";
import Head from "next/head";

import dynamic from "next/dynamic";

const Layout = dynamic(()=>import("components/Layout"));
const Course = dynamic(()=>import("components/Popover/index.js"));





const Index =({menu,content})=>{
  
  return <>
          <Head>
            <title>Free Premium Online Courses | AZcourses </title>
            <meta name="description" content="download free premium courses and level up your skills, advance your career in programming, data science, artificial intelligence, digital marketing, and more." />
          </Head>
          <Layout menu={menu}>
            <Grid container>
              <Grid item className="container" xs={11}>
                  <Grid container>
                    <Grid item xs={7} className="az-description">
                          <img 
                            src="/img/main-image.jpg"
                            alt="search"
                          />
                          <Container maxWidth="sm" className="az-description-content">
                            <p>
                                download premium courses for free <br/>   
                                over thausands of courses from famous e-leaning platforms, <br/>
                                are ready to download instantly
                            </p>
                          </Container>
                    </Grid>

                    <Grid item xs={5} >
                        <Container maxWidth="md" className="bg-white no-padding">
                          <div className="platform-item">
                                <Link href="/courses/udemy">
                                  <a>
                                    <div className="title">
                                      <img 
                                        src="/img/udemy-courses-bg.jpg"
                                        alt="udemy"
                                        width="100%"
                                      />
                                      <h2>Udemy courses</h2>
                                    </div>
                                  </a>
                                </Link>
                            </div>
                            <div className="platform-item">
                                <Link href="/courses/udacity">
                                  <a>    
                                     <div className="title">
                                        <img 
                                          src="/img/udacity-courses-bg.jpg"
                                          alt="udacity"
                                          width="100%"
                                        />
                                        <h2>Udacity courses</h2>
                                      </div>
                                  </a>
                                </Link>
                            </div>   
                            <div className="platform-item">
                              <Link href="/courses/masterclass">
                                <a>
                                  <div className="title">
                                    <img 
                                      src="/img/masterclass-courses-bg.jpg"
                                      alt="masterclass"
                                      width="100%"
                                    />
                                    <h2>Masterclass courses</h2>
                                  </div>
                                </a>
                              </Link>
                            </div>
                            <div className="platform-item">
                                <Link href="/courses/pluralsight">
                                  <a>
                                    <div className="title">
                                        <img 
                                          src="/img/pluralsight-courses-bg.jpg"
                                          alt="pluralsight"
                                          width="100%"
                                        />
                                        <h2>Pluralsight courses</h2>
                                    </div>
                                  </a>
                                </Link>
                            </div>
                        </Container>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={11} className="container">
                  <Grid container >
                    <Grid item xs={12}>
                        <h2>Most popular courses available in platform:</h2>
                        <Grid item xs={12} className="popular-udemy">
                          <h3>Udemy</h3>
                          <Container maxWidth="xl" className="az-popular">
                             {content.udemy.map(course=><Course key={course._id} course={course}/>)}
                          </Container>
                        </Grid>
                        <Grid item xs={12} className="popular-udacity">
                          <h3>Udacity</h3>
                          <Container maxWidth="xl" className="az-popular">
                            {content.udacity.map(course=><Course key={course._id} course={course}/>)}
                          </Container>
                        </Grid>
                        <Grid item xs={12} className="popular-pluralsight">
                          <h3>Pluralsight</h3>
                            <Container maxWidth="xl" className="az-popular">
                            {content.pluralsight.map(course=><Course key={course._id} course={course}/>)} 
                          </Container>
                        </Grid>
                        <Grid item xs={12} className="popular-masterclass">
                          <h3>Masterclass</h3>
                          <Container maxWidth="xl" className="az-popular">
                            {/* {content.masterclass.map(course=><Course key={course._id} course={course}/>)} */} 
                            <></>
                          </Container>
                        </Grid>
                    </Grid>
                  </Grid>
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

