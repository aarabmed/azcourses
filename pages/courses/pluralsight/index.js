import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

import Head from "next/head";

const PlatForm = dynamic(()=>import("components/Platform"));


const Index =({content,menu})=>{
    return <>
            <Head>
                <title> Pluralsight Free Premium Courses | AZcourses </title>
                <meta name="description" content="explore and download premium Pluralsight courses for free, gain technical and technology skills to boost your career to its highest." />
            </Head>
            <PlatForm data={content} menu={menu} name="Pluralsight" />
    </>
}

export default Index;


export const getServerSideProps = async ({req,query,params,resolvedUrl}) => {

    const {sort,page,rating} = query;

    const newSort = sort ? sort : "recent";
    const newPage = page ? page : 1;
    const newRating = rating?rating:""
    const platformsResponse = await axios.get(`process.env.categories`)

    const courses_response = await axios.get(`process.env.pluralsightCourses`)
   

    return {
        props:{
            menu:platformsResponse.data.platforms,
            content:courses_response.data,
        }
    }
} 
