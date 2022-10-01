import React, { useEffect, useRef, useState } from "react";
import Layout from "components/Layout"
import Grid from '@material-ui/core/Grid';
import Course from 'components/Course'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useRouter} from "next/router";
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Rating from '@material-ui/lab/Rating';
import Empty from "components/Empty";




const Index =({data,name,menu})=>{
    const router = useRouter();

    const [pageNumber, setPage] = useState(1);
    const [ratingValue, setRatingValue] = useState('');
    const [sortValue, setSortValue] = useState('');

    const { query,pathname } = router;
    

    useEffect(()=>{
      const {q,page,rating,sort} = query
    
      if(page){
        setPage(Number(page))
      }
      if(rating){
        setRatingValue(rating.toString())
      }
      if(sort){
        setSortValue(sort.toString())
      }

    },[])

    let Courses =[]

    if(data){
        Courses = data.courses.map(course=><Course key={course._id} data={course} />)
    }
  

    const onPageChange =(e,page)=>{
      if(pageNumber!==page){
          setPage(page)
          router.replace({pathname,query:{...query,'page':page}})
      }
    }


    const onChangeRating =(e)=>{
        setRatingValue(e.target.value);
        setPage(1);
        console.log('e.target.value:',e.target.value)
        if(e.target.value === 'none'){
          return router.replace({pathname,query:{...query.sort,'page':1}})
        }

        return router.replace({pathname,query:{...query,'page':1,'rating':e.target.value}})

    }

    const onChangeSortBy =(e)=>{
      setSortValue(e.target.value)
      setPage(1);
      router.replace({pathname,query:{...query,'page':1,'sort':e.target.value}})
    }

    const Filters = ()=>{
      return <> 
            <div className="filter-item">
              <Divider />
              <h3>Sort by</h3>
              <FormGroup >
                  <RadioGroup aria-label="sortBy" name="sortBy1" value={sortValue} onChange={onChangeSortBy}>
                    <FormControlLabel value="recent" control={<Radio checked={sortValue==="recent"} />} label="Newest" />
                    <FormControlLabel value="popular" control={<Radio checked={sortValue==="popular"}/>} label="Most Reviewed" />
                    <FormControlLabel value="downloads" control={<Radio checked={sortValue==="downloads"} />} label="Most downloaded" />
                  </RadioGroup>
              </FormGroup>
              <br/>
              <Divider />
              <h3>Rating</h3>
              <FormGroup >
                  <RadioGroup aria-label="rating" name="rating" value={ratingValue} onChange={onChangeRating}>
                    <FormControlLabel value="4.5" control={<Radio checked={ratingValue==="4.5"}/>} label={<><Rating name="size-small" defaultValue={4.5} precision={0.5} readOnly size="small" /> <span>4.5 & up</span></>}/>
                    <FormControlLabel value="4" control={<Radio checked={ratingValue==="4"} />} label={<><Rating name="size-small" defaultValue={4} precision={0.5} readOnly size="small" /> <span>4 & up</span></>} />
                    <FormControlLabel value="3.5" control={<Radio checked={ratingValue==="3.5"}/>} label={<><Rating name="size-small" defaultValue={3.5} precision={0.5} readOnly size="small" /> <span>3.5 & up</span></>} />
                    <FormControlLabel value="3" control={<Radio checked={ratingValue==="3"}/>} label={<><Rating name="size-small" defaultValue={3} precision={0.5} readOnly size="small" /> <span>3 & up</span></>} />
                    <FormControlLabel value="none" control={<Radio checked={ratingValue==="none"}/>} label={<><span>None</span></>} />
                  </RadioGroup>
              </FormGroup>
            </div>
      </>
    }
   
    
    
    return <Layout menu={menu}>
                <Grid container>   
                    <Grid container className="container" justifyContent="center">
                        <Grid xs={10} item className="course-title"><h1>{name} Courses</h1></Grid>
                        <Grid container justifyContent="center" className="courses-container" spacing={5}>
                            <Grid item xs={3}>
                              <Filters/>
                            </Grid>
                            <Grid item xs={7}>
                                {Courses.length?Courses:<Empty/>}
                                <Stack spacing={2}>
                                    {data&&data.numberResults!==0?<Pagination  page={pageNumber} count={data.totalPages} variant="outlined" shape="rounded" className="pagination-list-courses" onChange={onPageChange} />:null}
                                </Stack>    
                            </Grid>
                            {/* <Grid item xs={2}>
                              <h3>Learn without limits</h3>
                              <p>Start, switch, or advance your career <br/> with more than 2,000 courses, </p>
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Layout>
}

export default Index;