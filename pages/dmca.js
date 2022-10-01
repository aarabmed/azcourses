import React from "react";

import axios from "axios"
import Grid from '@material-ui/core/Grid';
import dynamic from "next/dynamic";

const Layout = dynamic(()=>import("components/Layout"));


const Index =({menu})=>{  
  return <>
          <Head>
            <title> DMCA | AZcourses</title>
          </Head>
          <Layout menu={menu}>
            <Grid container>
                <Grid item xs={8} className="container az-privacy">
                    <h1>DMCA Policy</h1>
                    <div className="az-privacy-pg">
                        <h4>Disclaimer</h4>
                        <p>
                          All parts of the azcourses.io Website are for private use only. No files are hosted on our Server, they are Indexed in a similar way to how Google works. The ISP and/or Administrator cannot be held responsible for the contents of any linked sites or any link contained in a Linked Site, or changes/updates to such sites.
                        </p>
                    </div>
                    <div className="az-privacy-pg">
                        <h4>Content Removal</h4>
                        <p>
                         It is however our policy to respond to VALID infringement notices and take appropriate actions under the copyright laws that we are in compliance with. kingtalks.net is in full compliance with the Digital Millennium Copyright Act (“DMCA”) and International Copyright Laws. We only comply with notices provided they take the following steps:
                        </p>
                        <ul>
                          <li>1- Write an email and specify the page on azcourses.io where you believe copyrighted material has been infringed upon.</li>
                          <li>2- Provide us sufficient contact information so that we may contact you (name and email address is required).</li>
                          <li>3- Provide us with evidence that you own the copyright to said.</li>
                        </ul>
                        <br/>
                        <p>If you want to send a DMCA takedown request, please keep in mind these will take 2-4 working days to process.</p>
                        <p><a href="https://www.azcourses.io/contact-us">Contact-us page</a></p>
                        <p>Thank you for understanding</p>
                    </div>
                    <br/><br/>
                    
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


