import React from "react";
import axios from "axios";
import path from "path";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
    
 
    const baseUrl = 'https://azcourses.io';
    const staticUrls = [
        'index',
        '404',
        'contact-us',
        'dmca',
        'privacy-policy',
        'sitemap',
        'courses/udemy',
        'courses/pluralsight',
        'courses/udacity',
        'courses/masterclass',
        'courses/archive',
        'courses/search'
    ].map((path) => {
        return `${baseUrl}/${path}`;
    })



    const MenuRoutes = []
    const {data} = await axios.get(`process.env.categories`)

    data.platforms.forEach(element => {
        MenuRoutes.push(`https://azcourses.io/courses/${element.slug}`);
        if(element.categories.length){
            element.categories.forEach(cat=>{
                MenuRoutes.push(`https://azcourses.io/courses/${element.slug}/${cat.slug}`)
                if(cat.subcategories.length){
                    cat.subcategories.forEach(sub=>{
                        MenuRoutes.push(`https://azcourses.io/courses/${element.slug}/${cat.slug}/${sub.slug}`)
                    })
                }
            })
        }
    });

      

    const dynamicUrlsData = await axios.get(`process.env.dynamic-urls.json`)

    const xmlData =[...dynamicUrlsData.data.data,...MenuRoutes,...staticUrls]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${xmlData.map(page=>{
        return `
                    <url>
                        <loc>${page.replace(/&/g,'and')}</loc>
                        <lastmod>${new Date().toISOString()}</lastmod>
                        <changefreq>weekly</changefreq>
                        <priority>1.0</priority>
                    </url>
                `;
        }).join("")}
    </urlset>
    `; 

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
    
    return {
        props: {},
    };
    
  };
  
  export default Sitemap;
