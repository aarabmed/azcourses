import React, { useState } from "react";
import Layout from "components/Layout"
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Rating from '@material-ui/lab/Rating';




const Index =({name,menu})=>{

    const [ratingValue, setRatingValue] = useState('');
    const [sortValue, setSortValue] = useState('');


    const Filters = ()=>{
      return <>
            <div className="filter-item">
              <Divider />
              <h3>Sort by</h3>
              <FormGroup >
                  <RadioGroup aria-label="sortBy" name="sortBy1" value={sortValue}>
                    <FormControlLabel value="recent" control={<Radio />} label="Newest" />
                    <FormControlLabel value="popular" control={<Radio />} label="Most Reviewed" />
                    <FormControlLabel value="downloads" control={<Radio />} label="Most downloaded" />
                  </RadioGroup>
              </FormGroup>
              <br/>
              <Divider />
              <h3>Rating</h3>
              <FormGroup >
                  <RadioGroup aria-label="rating" name="rating" value={ratingValue}>
                    <FormControlLabel value="4.5" control={<Radio />} label={<><Rating name="size-small" defaultValue={4.5} precision={0.5} readOnly size="small" /> <span>4.5 & up</span></>}/>
                    <FormControlLabel value="4" control={<Radio />} label={<><Rating name="size-small" defaultValue={4} precision={0.5} readOnly size="small" /> <span>4 & up</span></>} />
                    <FormControlLabel value="3.5" control={<Radio />} label={<><Rating name="size-small" defaultValue={3.5} precision={0.5} readOnly size="small" /> <span>3.5 & up</span></>} />
                    <FormControlLabel value="3" control={<Radio />} label={<><Rating name="size-small" defaultValue={3} precision={0.5} readOnly size="small" /> <span>3 & up</span></>} />
                  </RadioGroup>
              </FormGroup>
            </div>
      </>
    }
   
    
    
    return <Layout menu={menu}>
                <Grid container>   
                    <Grid item xs={11} className="container">
                        <Grid xs={10} className="course-title"><h1>{name} courses</h1></Grid>
                        <Grid container justifyContent="center" className="courses-container" spacing={5}>
                            <Grid item  xs={3}>
                              <Filters/>
                            </Grid>
                            <Grid item xs={7}>
                              <div style={{textAlign:'center'}}>
                                <h2 style={{fontWeight:'bold'}}>Coming Soon :{')'}</h2>   
                              </div>
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