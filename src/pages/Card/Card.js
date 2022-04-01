import React, { Component, useState, useEffect } from "react";
import "./Card.css";
import { connect } from "react-redux";
import md5 from "md5";
import SEO from "../../components/SEO";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { showPathEntries, entriesAreSame } from "../../utils/fileSystem";
import { FOLDER } from "../../utils/constants";
import { addEntry, deleteEntry, setEntry } from "../../actions/fileSystem";
import Axios from "axios";
import axios from "axios";
import fileDownload from "js-file-download";

import Icon from "../../components/Icon";
import Add from "../../components/Add";
import FolderIcon from "../../assets/img/folder-icon.png";
import { useTheme } from "../../contexts/themeContext";
import emptyIcon from "../../assets/img/empty.svg";
import binIcon from "../../assets/img/bin.svg";
import closeIcon from "../../assets/img/close.svg";
import previewFileBg from "../../assets/img/preview_file_bg.svg";
import previewFileBgGradient from "../../assets/img/preview_file_bg_gradientbar.svg";
import openExternal from "../../assets/img/open_external.svg";

const useUpgradeStyles = makeStyles((theme) => ({
  paper: {
    top: "20%",
    color: " black",
    width: "70%",
    height: "75%",
    padding: "16px 32px 24px",
    position: "relative",
    textAlign: "center",
    alignItems: "center",
    borderRadius: "1%",
    justifyItems: "center",
    justifyContent: "center",
    borderRadius: "45px",
    margin: "0 auto",
    backgroundColor: "white",
    flexDirection: "column",
    display: "flex",
  },
}));

const Card = (props) => {
  const [entryState, setEntryState] = useState(props.entry);
  const [openFilePreview, setOpenFilePreview] = useState(false);
  const [previewEntry, setPreviewEntry] = useState(props.entry[0]);
  const classesUpgrade = useUpgradeStyles();

  const darkTheme = useTheme();

  useEffect(() => {
    console.log(props.fileSystem[md5("/SarvvidBox" + FOLDER)]);
    console.log("Entry...", props.entry);
    if (
      !Object.keys(props.fileSystem).includes(
        md5(props.location.pathname + FOLDER)
      )
    ) {
      props.history.push("/");
    }
    console.log(props.entry);
  }, [entryState, props.entry]);

  function handlePreview(entry) {
    setOpenFilePreview(true);
    setPreviewEntry(entry);
  }

  function handleClose() {
    console.log("close");
    setOpenFilePreview(false);
  }

  function handleDownload(entry) {
    //setLoading(true);
    axios
      .request({
        method: "get",
        url: `https://api.sarvvid-ai.com/cat?filehash=${
          entry.name
        }&IMEI=${localStorage.getItem("IMEI")}&ping=${localStorage.getItem(
          "ping"
        )}`,
        headers: {
          Accept: "application/json, text/plain, */*",
          Authtoken: localStorage.getItem("authtoken"),
          "Content-Type": "application/json",
        },
        responseType: "blob",
      })
      .then((response) => {
        //setLoading(false);
        fileDownload(response.data, entry.name);

        console.log("Download resp...", response);
      });
  }

  return (
    <div>
      {props.entry[0] ? (
        <div className={`midPane_cards ${darkTheme ? "dark-theme" : ""}`}>
          <SEO
            url={props.match.url}
            title={props.match.url}
            image={FolderIcon}
            description={props.match.url}
          />

          {props.entry.map((entry, _) => (
            <div
              onClick={() => {
                handlePreview(entry);
              }}
              style={{ width: "100%" }}
            >
              <Icon
                entry={entry}
                index={_}
                key={`${entry.path}_${entry.type}`}
                deleteFn={() => {
                  props.deleteEntry(md5(entry.path + entry.type));
                }}
                setEntry={(val) => props.setEntry(val)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="show_empty_section">
          <img src={emptyIcon} alt="empty" />
          <p>Feels empty over here, Upload some files 😉</p>
          <div className="upload_card">Upload your first file</div>
        </div>
      )}
      <div className="Detail-Modal">
        <Modal
          open={openFilePreview}
          onClose={() => {
            setOpenFilePreview(!openFilePreview);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="upgrade_modal"
          style={{ borderRadius: "40px" }}
        >
          {/*
              onClick={() => {
                    setOpenFilePreview(!openFilePreview);
                  }}*/}
          <div className={classesUpgrade.paper}>
            <div className="preview_card">
              <div className="preview_card_header">
                <div className="preview_header_icon">
                  <img src={binIcon} alt="recyclebin" />
                </div>
                <div
                  onClick={() => {
                    handleClose();
                  }}
                  className="preview_header_icon"
                >
                  <img src={closeIcon} alt="close" />
                </div>
              </div>
              <div className="preview_file_detail">
                <div className="file_detail_name">
                  <div
                    className="preview_view"
                    style={{ background: `url(${previewFileBg})` }}
                  >
                    <div className="preview_subview_two">
                      <img src={openExternal} alt="documents" />
                      <h4>{previewEntry.name.split(".")[1]}</h4>
                    </div>
                  </div>
                  <div className="preview_file_details">
                    <h4>{previewEntry.name}</h4>
                    <p>filetype {previewEntry.type}</p>
                    <p>filesize {previewEntry.size}</p>
                    <p>Secured with SarvvidBox</p>
                    <div className="file_details_btn_section">
                      <button
                        onClick={() => {
                          handleDownload(previewEntry);
                        }}
                        className="download_btn"
                      >
                        Download
                      </button>
                      <button className="share_btn">Share</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.url);
  const path = ownProps.match.url;
  console.log(state.fileSystem);

  return {
    entry: state.fileSystem[md5(path + FOLDER)]
      ? state.fileSystem[md5(path + FOLDER)].children.map(
          (childrenID) => state.fileSystem[childrenID]
        )
      : [],
    fileSystem: state.fileSystem,
  };
};

export default connect(mapStateToProps, { addEntry, deleteEntry, setEntry })(
  Card
);
