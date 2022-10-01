import React, { useState,useRef,useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Search from "@material-ui/icons/Search";
import useSWR from "swr";
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle.js";
import { useRouter } from "next/router";
import {ARCHIVE,COURSE} from 'utils/api_routes.js'


const Button =dynamic(()=>import("components/CustomButtons/Button.js"))
const CustomInput =dynamic(()=>import("components/CustomInput/CustomInput.js"))
const Layout = dynamic(()=>import("components/Layout"));
const Course = dynamic(()=>import("components/archive/course"))


const swrConfig = {
  revalidateOnFocus: false,
  refreshWhenHidden: false,
  revalidateIfStale: false,
  refreshInterval: 0
}

const useStyles = makeStyles(styles);


const Index =({name,menu})=>{

    const [platform, setPlatform] = useState('all');
    const router = useRouter();
    const classes = useStyles();
    const [pageNumber, setPage] = useState(1);
    const [qq, setq] = useState('');

    const searchRef = useRef(null);

    const { query,pathname } = router;
    const fetcher = (url) => axios.get(url).then(res => res.data)
 
    const { data, error, mutate,isValidating} = useSWR(`${ARCHIVE}?q=${qq}`, fetcher,swrConfig)  

    const onSearch =()=>{
      if(searchRef.current.value.length>1){
        setq(searchRef.current.value)
        return router.replace({pathname,query:{q:searchRef.current.value}},null,{shallow:true})
      }
    }




    const onPageChange =(e,page)=>{
      if(pageNumber!==page){
          setPage(page)
          router.replace({pathname,query:{...query,'page':page}})
      }
    }

    let Courses =[]

    if(data){
        Courses = data.courses.map(course=><Course  key={course._id} data={course} className="archive-single-item" />)
    }
  

    useEffect(()=>{
      const {q,pf,page} = query
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

    },[])

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

    const Filters = ()=>{
      return<ul>
              <li onClick={()=>setPlatform('all')} className={platform==='all'?'active':undefined} key='all'>All</li>
              <li onClick={()=>setPlatform('udemy')} className={platform==='udemy'?'active':undefined} key='udemy'>Udemy</li>
              <li onClick={()=>setPlatform('pluralsight')} className={platform==='pluralsight'?'active':undefined} key='pluralsight'>Pluralsight</li>
              <li onClick={()=>setPlatform('udacity')} className={platform==='udacity'?'active':undefined} key='udacity'>Udacity</li>
              <li onClick={()=>setPlatform('masterclass')} className={platform==='masterclass'?'active':undefined} key='masterclass'>Masterclass</li>
      </ul>      
    }
   
    
    
    return <Layout menu={menu}>
                <Grid container justifyContent="center" className="archive-search-container">
                  <div className="archive-search">
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
                            className: `${classes.searchInput} archive-input`,
                          },
                        }}
                      />
                      <Button justIcon round color="white" onClick={onSearch}>
                        <Search className={classes.searchIcon}/>
                      </Button>
                  </div>
                </Grid>
                <Grid container>   
                    <Grid item xs={11} className="container">
                        <Grid container justifyContent="center" className="courses-container" spacing={5}>
                            
                            <Grid item lg>
                              <div className="archive-filters">
                                <div className="wrapper">
                                  <div className="keyword">
                                    {query.q?<p><span>Search results for :</span> <span>{query.q}</span></p>:null}
                                  </div>
                                  <div className="filters">
                                      <Filters/>
                                  </div>
                                </div>
                              </div>
                            </Grid>
                            <Grid item xs={11}>
                              {query.q>1?<Grid container justifyContent="center"> 
                                  <QueryMessage/>
                              </Grid>:null}
                              <Grid container justifyContent="center" spacing={5}>                     
                                <Grid item className="courses-container" xs={10}>
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
                        </Grid>
                    </Grid>
                </Grid>
            </Layout>
}

export default Index;