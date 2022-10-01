import React from "react";

import Popover from '@material-ui/core/Popover';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Link from "next/link";

const PopoverCourse = ({course,isOpen,anchorEl,onMouseLeave})=>{    

    return<>
      <Popover
        id="mouse-over-popover"
        open={isOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={onMouseLeave}
        disableRestoreFocus
      >
        <Link href={`/course/${course.slug.replace(/#/g,'%23')}`} >
          <a>
            <Card className="popover-card" onMouseLeave={onMouseLeave}>
              <CardActionArea className="popover-card-container">
                  <div className="popover-img-container">
                      <img
                          className="popover-image"
                          src={course.image}
                          alt={course.title}
                      />
                  </div>
                <CardContent className="popover-card-content">
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.title}
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" component="p">
                        {course.sub_title}
                    </Typography>
                    <div className="course-card-rating">
                        <span className="r">{course.rating}</span>
                        <Rating name="half-rating" size="small" defaultValue={course.rating} precision={0.5} readOnly/>
                        <span className="r-am">({course.rating_amount} ratings)</span>
                    </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </a>
        </Link>
      </Popover>
    </>
  }


  export default PopoverCourse