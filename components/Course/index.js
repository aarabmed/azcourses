import React from "react";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import {useRouter} from "next/router";
import { ThreeDots } from 'react-loading-icons'

const Index = (props)=>{
    const [isLoading, setLoading] = React.useState();

    const {
        className,
        data,
        ...rest
    } = props

    const router = useRouter()
    const courseOnclick = ()=>{
        setLoading(true)
        router.push({pathname:`/course/${data.slug.replace(/#/g,'%23')}`})
    }

    return<>
        <Card className={"course-card "+(className?className:null)} onClick={courseOnclick} >
            <CardActionArea className="course-card-container">
                <img
                className="course-image"
                src={data.image}
                alt="Contemplative Reptile"
                width={260}
                height={138}
                />
                <CardContent className="course-card-content">
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.sub_title.length>146?data.sub_title.substring(0,146)+'...':data.sub_title}
                    </Typography>
                    <div className="course-card-rating">
                        <span className="r">{data.rating}</span>
                        <Rating name="half-rating" size="small" defaultValue={data.rating} precision={0.5} readOnly/>
                        <span className="r-am">({data.rating_amount} ratings)</span>
                    </div>
                </CardContent>
            </CardActionArea>

            {isLoading?<div className="route-loading">
            <ThreeDots/>
            </div>:null}
      </Card>
    </>
  }
 
  export default Index