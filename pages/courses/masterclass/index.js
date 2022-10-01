import React from "react";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";

const ComingSoon = dynamic(()=>import("components/Platform/comingsoon.js"));
const PlatForm = dynamic(()=>import("components/Platform"));



const Index =({content,menu})=>{
    //return <PlatForm data={content} menu={menu} name="Masterclass" />
    return <>
        <Head>
            <title>MasterClass Free Premium Courses | AZcourses</title>
            <meta name="description" content="explore and download premium MasterClass courses for free, gain technical and technology skills to boost your career to its highest." />
        </Head>
        <ComingSoon menu={menu} name="MasterClass"/>
    </>
}

export default Index;


export const getServerSideProps = async ({req,query,params,resolvedUrl}) => {

    const {sort,page,rating} = query;

    const newSort = sort ? sort : "recent";
    const newPage = page ? page : 1;
    const newRating = rating?rating:""
    const platformsResponse = await axios.get(`process.env.categories`)

    const courses_response = await axios.get(`process.env.masterclassCourses`)
   

    return {
        props:{
            menu:platformsResponse.data.platforms,
            content:courses_response.data,
        }
    }
} 
