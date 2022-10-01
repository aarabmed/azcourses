import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
//import Course from 'components/Course'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import useSWR from "swr";
import {useRouter} from "next/router";
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Rating from '@material-ui/lab/Rating';
import Search from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
//import Button from "components/CustomButtons/Button.js";
import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle.js";
import {SEARCH} from 'utils/api_routes.js'
import Head from "next/head";

//import CustomInput from "components/CustomInput/CustomInput.js";
const Layout = dynamic(()=>import("components/Layout"));
const CustomInput =dynamic(()=>import("components/CustomInput/CustomInput.js"))
const Button =dynamic(()=>import("components/CustomButtons/Button.js"))
const Course = dynamic(()=>import("components/Course"))

const swrConfig = {
    revalidateOnFocus: false,
    refreshWhenHidden: false,
    revalidateIfStale: false,
    refreshInterval: 0
}

const useStyles = makeStyles(styles);



const Index =({menu})=>{
    const router = useRouter();
    const classes = useStyles();

    const [pageNumber, setPage] = useState(1);
    const [qq, setq] = useState('');
    const [platForm, checkPlatform] = useState('all');
    const [ratingValue, setRatingValue] = useState('');
    const [sortValue, setSortValue] = useState('');

    const searchRef = useRef(null);
    const { query,pathname } = router;
    
    const fetcher = (url) => axios.get(url).then(res => res.data)
 
    const { data, error, mutate,isValidating } = useSWR(`${SEARCH}?q=${qq}`, fetcher,swrConfig)
  


    useEffect(()=>{
      const {q,pf,page,r,sort} = query
      if(q){
        setq(q.toString())
        if(searchRef.current){
          searchRef.current.value=q
        }
      }
      if(pf){
        checkPlatform(pf.toString())
      }
      if(page){
        setPage(Number(page))
      }
      if(r){
        setRatingValue(r.toString())
      }
      if(sort){
        setSortValue(sort.toString())
      }


    },[])

    let Courses =[]

    if(data){
        Courses = data.courses.map(course=><Course  key={course._id} data={course} />)
    }
  
  

    const onPageChange =(e,page)=>{
      if(pageNumber!==page){
          setPage(page)
          router.replace({pathname,query:{...query,'page':page}})
      }
    }

    const onChangePlatform =(e)=>{
        checkPlatform(e.target.value)
    }

    const onChangeRating =(e)=>{
        setRatingValue(e.target.value)
    }

    const onChangeSortBy =(e)=>{
      setSortValue(e.target.value)
    }

    const onSearch =()=>{
      if(searchRef.current.value.length){
        setq(searchRef.current.value)
        return router.replace({pathname,query:{q:searchRef.current.value}},null,{shallow:true})
      }
    }

    const Filters = ()=>{
      return <>
            <div className="filter-item">
              <Divider />
              <h3>Sort by</h3>
              <FormGroup >
                  <RadioGroup aria-label="sortBy" name="sortBy1" value={sortValue} onChange={onChangeSortBy}>
                    <FormControlLabel value="relevance" control={<Radio />} label="Relevant"/>
                    <FormControlLabel value="reviews" control={<Radio />} label="Most Reviewed" />
                    <FormControlLabel value="downloads" control={<Radio />} label="Most downloaded" />
                    <FormControlLabel value="recent" control={<Radio />} label="Newest" />
                  </RadioGroup>
              </FormGroup>
              <br/>
              <Divider />
              <h3>Platform</h3>
              <FormGroup >
                  <RadioGroup aria-label="platform" name="platform" value={platForm} onChange={onChangePlatform}>
                    <FormControlLabel value="all" control={<Radio />} label="All"/>
                    <FormControlLabel value="udemy" control={<Radio />} label="Udemy" />
                    <FormControlLabel value="udacity" control={<Radio />} label="Udacity" />
                    <FormControlLabel value="puralsight" control={<Radio />} label="Pluralsight" />
                    <FormControlLabel value="mastercalss" control={<Radio />} label="mastercalss" />
                  </RadioGroup> 
              </FormGroup>
              <br/>
              <Divider />
              <h3>Rating</h3>
              <FormGroup >
                  <RadioGroup aria-label="rating" name="rating" value={ratingValue} onChange={onChangeRating}>
                    <FormControlLabel value="4.5" control={<Radio />} label={<><Rating name="size-small" defaultValue={4.5} precision={0.5} readOnly size="small" /> <span>4.5 & up</span></>}/>
                    <FormControlLabel value="4" control={<Radio />} label={<><Rating name="size-small" defaultValue={4} precision={0.5} readOnly size="small" /> <span>4 & up</span></>} />
                    <FormControlLabel value="3.5" control={<Radio />} label={<><Rating name="size-small" defaultValue={3.5} precision={0.5} readOnly size="small" /> <span>3.5 & up</span></>} />
                    <FormControlLabel value="3" control={<Radio />} label={<><Rating name="size-small" defaultValue={3} precision={0.5} readOnly size="small" /> <span>3 & up</span></>} />
                  </RadioGroup>
              </FormGroup>
            </div>
      </>
    }
   
    const QueryMessage = ()=>{
      if(!data)return <></>
      if(data.numberResults===0){
        return <div className="query-results">
            <h3>Sorry, we couldn't find any results for “{query.q}”</h3>
            <h5>Try adjusting your search. Here are some ideas:</h5>
            <ul>
              <li>Make sure all words are spelled correctly</li>
              <li>Try different search terms</li>
              <li>Try more general search terms</li>
            </ul>
        </div>
      }
      return <div className="query-results">
          <h3>{data.numberResults} results for “<span>{query.q}</span>”</h3>
      </div>
    }
    
    return(
      <>
          <Head>
            <title>Premium Tutorials & Courses | AZcourses </title>
          </Head>
          <Layout menu={menu}>
                  <Grid container justifyContent="center" className="search-container">
                    <div className="course-search">
                      <CustomInput
                          white
                          inputRootCustomClasses={classes.inputRootCustomClasses}
                          formControlProps={{
                            className: classes.formControl,
                          }}
                          inputProps={{
                            placeholder: "Search",
                            inputProps: {
                              ref:searchRef,
                              "aria-label": "Search",
                              className: classes.searchInput +' search-input',
                            },
                          }}
                        />
                        <Button justIcon round color="white" onClick={onSearch}>
                          <Search className={classes.searchIcon}/>
                        </Button>
                    </div>
                  </Grid>
                  <Grid item xs={11} className="container">
                      <Grid container justifyContent="center"> 
                          <QueryMessage/>
                      </Grid>
                      <Grid container justifyContent="center" spacing={5}>
                          <Grid item className="courses-container" xs={3}>
                            <Filters/>
                          </Grid>
                          <Grid item className="courses-container" xs={7}>
                              {Courses}
                              <Stack spacing={2}>
                                    {data&&data.numberResults!==0?<Pagination count={data.totalPages} page={pageNumber} variant="outlined" shape="rounded" className="pagination-list-courses" onChange={onPageChange} />:null}
                              </Stack>    
                          </Grid>
                          {/* <Grid item className="courses-container" xs={2}>
                            <h3>Learn without limits</h3>
                            <p>Start, switch, or advance your career <br/> with more than 5,000 courses, </p>
                          </Grid> */}
                      </Grid>
                  </Grid>
          </Layout>
      </>
    )
}

export default Index;


export const getServerSideProps = async ({query}) => {
    const platformsResponse = await axios.get(`process.env.categories`)

    const {q}= query


    if(!q){
     return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }


    return {
        props:{
          menu:platformsResponse.data.platforms,
        }
    }
} 


