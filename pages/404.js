import React, { useEffect } from "react";
import Head from "next/head";
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import gsap from "gsap";
import Link from "next/link";
import dynamic from "next/dynamic";
import Lost from "components/svg/lost.jsx";

const Layout = dynamic(()=>import("components/Layout"));


const Index = ({menu})=>{
  useEffect(()=>{
    gsap.set("svg", { visibility: "visible" });
    gsap.to("#headStripe", {
      y: 0.5,
      rotation: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1 });

    gsap.to("#spaceman", {
      y: 0.5,
      rotation: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1 });

    gsap.to("#craterSmall", {
      x: -3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut" });

    gsap.to("#craterBig", {
      x: 3,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut" });

    gsap.to("#planet", {
      rotation: -2,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
      transformOrigin: "50% 50%" });

    gsap.to("#starsBig g", {
      rotation: "random(-30,30)",
      transformOrigin: "50% 50%",
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut" });

    gsap.fromTo(
    "#starsSmall g",
    { scale: 0, transformOrigin: "50% 50%" },
    { scale: 1, transformOrigin: "50% 50%", yoyo: true, repeat: -1, stagger: 0.1 });

    gsap.to("#circlesSmall circle", {
      y: -4,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
      repeat: -1 });

    gsap.to("#circlesBig circle", {
      y: -2,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut",
      repeat: -1 });


    gsap.set("#glassShine", { x: -68 });

    gsap.to("#glassShine", {
      x: 80,
      duration: 2,
      rotation: -30,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      repeat: -1,
      repeatDelay: 8,
      delay: 2 
    });

  },[])
 
  return <>
              <Head>
                <title>404 not found | AZcourses </title>
                <meta name="description" content="download free courses of all skill levels, with more than 2000 courses to help advance your career in programming, data science, artificial intelligence, digital marketing, and more." />
              </Head>
              <Layout menu={menu}>
                <Grid container>
                <div className="container-error">
                  <div className="row">
                    <div className="animatedSvg">
                      <Lost/>
                    </div>
                    
                    <div className="content">
                      <div className="body">
                        <h1>404</h1>
                        <h2>UH OH! You're lost.</h2>
                        <p>The page you are looking for does not exist.
                          How you got here is a mystery. But you can click the button below
                          to go back to the homepage.
                        </p>
                        <button className="btn green"><Link href="https://azcourses.io"><a>GO HOME</a></Link></button>
                      </div>
                    </div>
                  </div>
                </div>
                </Grid> 
          </Layout>
        </>
} 

export default Index;

export const getStaticProps = async () => {
  const platformsResponse = await axios.get(`process.env.categories`)
  
  return {
      props:{
        menu:platformsResponse.data.platforms,
      }
  }
} 