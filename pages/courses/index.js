import React from "react";

export default ()=><></>



export const getServerSideProps = async () => {
    return {
        redirect: {
          permanent: false,
          destination: '/',
        },
    }
} 
