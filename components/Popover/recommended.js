import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



const Index = ({course,onMouseEnter})=>{
    return<>
      <Card className="course-recommended" onMouseEnter={onMouseEnter} >
        <CardActionArea>
          <img
            className="course-recommended-image"
            src={course.image}
            alt={course.title}
          />
          <CardContent className="course-popular-title">
            <Typography component="h2">
             {course.sub_title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  }

  export default Index