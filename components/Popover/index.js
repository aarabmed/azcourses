import React from "react";
import dynamic from "next/dynamic";

const RecommendedCourse = dynamic(()=>import("./recommended"));
const Popover = dynamic(()=>import("./popover"));

const Index = ({course})=>{
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return <>
        <RecommendedCourse course={course} onMouseEnter={handlePopoverOpen}/>
        <Popover course={course} isOpen={open} anchorEl={anchorEl} onMouseLeave={handlePopoverClose}/>
    </>

}

export default Index;