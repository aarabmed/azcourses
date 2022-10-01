import React from "react";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";

const Category = dynamic(()=>import("components/Platform"));


export default ({content,menu,title})=>{
    return <>
      <Head>
        <title>Pluralsight, {title} Free Premium Courses | AZcourses</title>
        <meta name="description" content="explore and download premium Pluralsight courses for free, gain technical and technology skills to boost your career to its highest." />
      </Head>
      <Category menu={menu} data={content} name={title} />
    </>
}




export const getServerSideProps = async ({query,params}) => {

    const {sort,page,rating} = query;

    const newSort = sort ? sort : "recent";
    const newPage = page ? page : 1;
    const newRating = rating?rating:""
    const platformsResponse = await axios.get(`process.env.categories`)

    const category = platformsResponse.data.platforms.find(e=>e.platform==='pluralsight').categories.find(e=>e.slug===params.category)
    
    if(!category){
        return {
          props:{
            menu:platformsResponse.data.platforms,
            content:[],
          }
        }
      }
    
    const courses_response = await axios.get(`process.env.pluralsightCourses.categories`)
   

    return {
        props:{
            menu:platformsResponse.data.platforms,
            content:courses_response.data,
            title:category.title
        }
    }
} 
