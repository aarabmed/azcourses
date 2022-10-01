import React from "react";

import axios from "axios"
import {Grid,
        Card,
        CardContent,
        CardHeader,
         }from '@material-ui/core';
import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";
const Layout = dynamic(()=>import("components/Layout"));



const Index =({menu})=>{

  return <>
            <Head>
              <title>Sitemap | AZcourses </title>
            </Head>
            <Layout menu={menu}>
                <Grid container>
                    <Grid item xs={8} className="container az-sitemap">
                        <Card className="az-sitemap-card">
                            <CardHeader title="Local pages"></CardHeader>
                            <CardContent className="az-sitemap-card-content">
                                <Grid item container spacing={1} justifyContent="flex-start">
                                    <Grid item xs={4} md={6} xl={8}>
                                        <Link href="/"><a>Home</a></Link>
                                    </Grid>
                                    <Grid item xs={4} md={6} xl={8}>
                                        <Link href="/courses/udemy"><a>Udemy</a></Link>
                                    </Grid>
                                    <Grid item xs={4} md={6} xl={8}>
                                        <Link href="/courses/archive"><a>Archive</a></Link>
                                    </Grid>
                                    <Grid item xs={4} md={6} xl={8}>
                                        <Link href="/courses/udacity"><a>Udacity</a></Link>
                                    </Grid>
                                    <Grid item xs={4} md={6} xl={8}>
                                        <Link href="/contact-us"><a>Contact-us</a></Link>
                                    </Grid>
                                    <Grid item xs={4} md={6} xl={8}>
                                        <Link href="/courses/pluralsight"><a>Pluralsight</a></Link>
                                    </Grid>
                                    <Grid item xs={4} md={6} xl={8}>    
                                        <Link href="/dmca"><a>DMCA</a></Link>
                                    </Grid>
                                    <Grid item xs={4} md={6} xl={8}>
                                        <Link href="/courses/masterclass"><a>Masterclass</a></Link>
                                    </Grid>
                                    <Grid item xs={4} md={6} xl={8}>
                                        <Link href="/privacy-policy"><a>Privacy policy</a></Link>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card className="az-sitemap-card">
                            <CardHeader title="All categories"></CardHeader>
                            <CardContent className="az-sitemap-card-content">
                                <Grid item container spacing={1} justifyContent="flex-start">
                                    {menu.map(e=>e.categories.map(item=><Grid item xs={4} md={6} xl={8} key={item._id}>
                                            <Link href={`/courses/${e.slug}/${item.slug}`}><a>{item.title}</a></Link>
                                        </Grid>)
                                    )} 
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card className="az-sitemap-card">
                            <CardHeader title="All sub-categories"></CardHeader>
                            <CardContent className="az-sitemap-card-content">
                                <Grid item container spacing={1} justifyContent="flex-start">
                                    {menu.map(e=>e.categories.map(item=>item.subcategories.map(sub=><Grid item xs={4} md={6} xl={8} key={sub._id}>
                                            <Link href={`/courses/${e.slug}/${item.slug}/${sub.slug}`}><a>{sub.title}</a></Link>
                                        </Grid>)))
                                    } 
                                </Grid>
                            </CardContent>
                        </Card>
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


