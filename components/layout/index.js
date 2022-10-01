import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  MenuItem,
  ControlledMenu,
  SubMenu
} from '@szhsin/react-menu';


import List from "@material-ui/core/List";
import Grid from '@material-ui/core/Grid';
import ListItem from "@material-ui/core/ListItem";
import Search from "@material-ui/icons/Search";
import {useRouter} from "next/router";
import ArchiveIcon from '@material-ui/icons/Archive';
import { Apps } from "@material-ui/icons";
import Link from "next/link";

import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle.js";
import Head from "next/head";

import dynamic from "next/dynamic";
const Header =dynamic(()=>import("components/Header/Header.js"))
const CustomInput =dynamic(()=>import("components/CustomInput/CustomInput.js"))
const Button =dynamic(()=>import("components/CustomButtons/Button.js"))
const Footer = dynamic(()=>import("components/Footer/Footer"));


const useStyles = makeStyles(styles);



const Index =({children,menu})=>{

  const refSearch = React.useRef(null)
  const [isOpen, setOpen] = React.useState(null);
  const [classFocus, setClassFocus] = React.useState('');


  const router = useRouter()
  const {pathname} = router
  const classes = useStyles();
  const pageName = pathname.split('/')[2]
  const ref = React.useRef(null);

  


  const Menu = (data)=>{
    return data.map(el=>{
      if(el.categories && el.categories.length){
        return <SubMenu align="end" className={!el.url?'no-link':'with-link'} key={el._id} label={el.url?<Link href={'/courses'+el.url}><a>{el.title}</a></Link>:el.title}>
                {Menu(el.categories)}
        </SubMenu>
      }
      if(el.subcategories && el.subcategories.length){
        return <SubMenu align="end" className={!el.url?'no-link':'with-link'} key={el._id} label={<Link href={'/courses'+el.url}><a>{el.title}</a></Link>}>
                {Menu(el.subcategories)}
        </SubMenu>
      }
      return <MenuItem  className={!el.url?'no-link':'with-link child'} key={el._id}> <Link href={'/courses'+el.url}><a>{el.title}</a></Link></MenuItem>
    })
  }

  const onClickSearch =()=>{
    if(refSearch.current.value.trim().length>0 ){
      return router.push({pathname:'/courses/search',query:{q:refSearch.current.value}})
    }
  }

  const onKeyEnterPress=(e)=>{
      if(e.key === 'Enter' && refSearch.current.value.trim().length>0 ){
          return router.push({pathname:'/courses/search',query:{q:refSearch.current.value}})
      }
  }

  const onSearchFocus = ()=>{
      setClassFocus('nav-search-input')
  }

  const onSearchBlur = ()=>{
    if(refSearch.current.value.trim().length===0){
      setClassFocus('')
    }
  }

 

  return <>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  </Head>
  <Header
    brand={<img alt="az-courses" src="/img/az-logo-white.png"/>}
    className="az-nav-menu"
    leftLinks={
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <div ref={ref} className="btn" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
            >
              <Apps className={classes.icons} />
              Platforms
            </Button>
            <ControlledMenu
              state={isOpen ? 'open' : 'closed'}
              anchorRef={ref}
              onMouseLeave={() => setOpen(false)}
              onClose={() => setOpen(false)}
              direction='bottom'
              align="start"
              position="auto"
              viewScroll="initial"
              arrow={false}
              offsetY={12}

            >
              {Menu(menu)}
            </ControlledMenu>
          </div>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link href="/courses/archive" >    
              <Button
                className={classes.navLink}
                color="transparent"
                startIcon={<ArchiveIcon/>}
              >
                Archive
              </Button>
            </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link href="/contact-us" >    
              <Button
                className={classes.navLink}
                color="transparent"
              >
                Contact us
              </Button>
            </Link>
        </ListItem>
      </List>
    }
    rightLinks={
       pageName === 'search'?null:<>
        <CustomInput
          white
          inputRootCustomClasses={classes.inputRootCustomClasses}
          formControlProps={{
            className: classes.formControl+" "+classFocus,
          }}
          inputProps={{
            onKeyDown:onKeyEnterPress,
            placeholder: "Search",
            inputProps: {
              ref:refSearch,
              "aria-label": "Search",
              className: classes.searchInput,
              onFocus:onSearchFocus,
              onBlur:onSearchBlur
            },
          }}
        />
        <Button justIcon round color="white" onClick={onClickSearch} >
          <Search className={classes.searchIcon} />
        </Button>
      </>
    }
  />

  {children}
  <Grid container className="footer">
        <Grid item xs={11} className="container">
            <Footer/>
        </Grid>
  </Grid>
</>
  
}

export default Index
