import React, { useState } from "react";
import "./MiddlePane.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card/Card";
import { Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import {
  useTheme,
  useThemeUpdate,
  useMenuToggle,
} from "../contexts/themeContext";

// New

import moonIcon from '../assets/img/moon.svg'
import sunIcon from "../assets/img/sun.svg"
import gridIcon from "../assets/img/grid.svg"
import gridDarkIcon from "../assets/img/griddark.svg"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const ViewFiles = () => {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const toggleMenu = useMenuToggle();
  const classes = useStyles();

  return (

    <div className={`middlePane ${toggleMenu ? "" : "opened"} ${darkTheme ? "dark-theme" : ""}` }  >
      <div className="middlePane_upper">
        <SearchBar />
        <div
          className={`theme-toggle ${darkTheme ? "dark" : ""}`}
          onClick={() => toggleTheme()}
        >
          <div className="theme-btn">
            <img src={moonIcon} alt="dark" />
            <img src={sunIcon} alt="light" />
          </div>
        </div>
      </div>
      <div
        className="middlePane_cards"
        style={{ background: `${darkTheme ? "#121212" : "#fff"}` }}
      >
        <div className="midPane-header">
          <div className="navigation-container">
            <div className="navigation-subcontainer">
              <h2 style={{ marginRight: "auto" }}>
                Your Files - Secure{" "}
                <span role="img" aria-label="key">
                  🔑
                </span>
              </h2>
              <div style={{ display: "flex" }} className="button_depth">
                <img style={{opacity:"0.5"}} src={gridIcon} alt="grid" />
              </div>
            </div>

            <Navigation />
          </div>

          <div className="layout-toggle">
            {darkTheme ? <img src={gridDarkIcon} alt="grid" /> : <img src={gridIcon} alt="grid" />}
          </div>
        </div>
        <div className="table-header">
          <p>Name</p>
          <p>Size</p>
          <p>Type</p>
        </div>
        <Route path="*" component={Card} />
      </div>
    </div>
  );
};

export default ViewFiles;
