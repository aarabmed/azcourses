import React from "react";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";

const PlatForm = dynamic(()=>import("components/Platform"));



export default ({content,menu})=>{
    return <>
        <Head>
            <title> Udemy Free Premium Courses | AZcourses</title>
            <meta name="description" content="explore and download premium Udemy courses for free, gain technical and technology skills, learn business and boost your career to its highest." />
        </Head>
        <PlatForm data={content} menu={menu} name="Udemy" />
    </>
}

export const getServerSideProps = async ({query}) => {

    const {sort,page,rating} = query;

    const newSort = sort ? sort : "recent";
    const newPage = page ? page : 1;
    const newRating = rating?rating:""
    const platformsResponse = await axios.get(`process.env.categories`)

    const courses_response = await axios.get(`process.env.udemyCourses`)
   

    return {
        props:{
            menu:platformsResponse.data.platforms,
            content:courses_response.data,
        }
    }
} 
