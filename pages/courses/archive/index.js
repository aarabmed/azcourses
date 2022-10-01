import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";

const Layout = dynamic(()=>import("components/archive/layout.js"));



const Index =({content,menu})=>{
    //return <PlatForm data={content} menu={menu} name="Masterclass" />
    return <>
        <Head>
            <title>Azcourses archive | Tutorials, Premium Courses & Lessons</title>
            <meta name="description" content="Premium tutorials, MasterClass, udemy, pluralsight and udacity courses for free, gain technical and technology skills to boost your career to its highest." />
        </Head>
        <Layout menu={menu} name="AZcourses Archive"/>
    </>
}

export default Index;


export const getServerSideProps = async ({req,query,params,resolvedUrl}) => {

    const {sort,page,rating} = query;

    const newSort = sort ? sort : "recent";
    const newPage = page ? page : 1;
    const newRating = rating?rating:""
    const platformsResponse = await axios.get(`process.env.categories`)
   

    return {
        props:{
            menu:platformsResponse.data.platforms,
            content:[],
        }
    }
} 
