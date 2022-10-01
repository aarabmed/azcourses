/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "styles/jss/nextjs-material-kit/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer>
      <div className="footer-conainer">
        <div className="footer-mapping">
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <span>Company</span>
              <List>
                <ListItem>
                    <a
                    href="/"
                    className={classes.block}
                  >
                    AZcourses.io
                  </a>
                </ListItem>
              </List>
              <br/>
              <span>Explore</span>
              <List>
                <ListItem>
                    <a
                    href="/courses/archive"
                    className={classes.block}
                  >
                    archive
                  </a>
                </ListItem>
              </List>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <span>Platforms</span>
              <List>
                <ListItem>
                    <a
                      href="/courses/udemy"
                      className={classes.block}
                    >
                      Udemy
                    </a>
                </ListItem>
                <ListItem>
                    <a
                      href="/courses/udacity"
                      className={classes.block}
                    >
                      Udacity
                    </a>
                </ListItem>
                <ListItem>
                    <a
                      href="/courses/pluralsight"
                      className={classes.block}
                    >
                      Pluralsight
                    </a>
                </ListItem>
                <ListItem>
                    <a
                      href="/courses/masterclass"
                      className={classes.block}
                    >
                      Mastercalss
                    </a>
                </ListItem>
              </List>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <span>SUPPORT</span>
              <List>
                <ListItem>
                  <a
                    href="/contact-us"
                    className={classes.block}
                  >
                    Contact-us
                  </a>
                </ListItem>

                <ListItem>
                  <a
                    href="/privacy-policy"
                    className={classes.block}
                  >
                    Privacy policy
                  </a>
                </ListItem>
                <ListItem>
                  <a
                    href="/dmca"
                    className={classes.block}
                  >
                    DMCA
                  </a>
                </ListItem>
                <ListItem>
                  <a
                    href="/sitemap"
                    className={classes.block}
                    >
                    Sitemap
                  </a>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </div>
        <div className='footer-reference'>
          &copy; {1900 + new Date().getYear()} , made with{" "}
          <Favorite className={classes.icon} /> by{" "}
          <span
            style={{color: "#ffbf00"}}
          >
            Orenji
          </span>{" "}
          for a better web.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
