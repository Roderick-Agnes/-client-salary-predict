import { makeStyles } from "@material-ui/core";
import useWindowDimensions from "hooks/useWindowDimensions";
import React, { useState } from "react";
import FileList from "./FileList";
import FileUpload from "./FileUpload";
import SalaryTable from "./SalaryTable";
import Typed from "react-typed";

import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";

function FilePage() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };
  const useStyles = makeStyles((theme) => ({
    title: {
      borderLeft: "3px solid #2196f3",
      paddingLeft: "0.5em",
      textTransform: "uppercase",
      fontWeight: 500,
      fontSize: "1rem",
      marginBottom: "1em",
      letterSpacing: "3px",
    },
    header: {
      display: "flex",
      justifyContent: "space-around",
      position: "relative",
      marginBottom: "2em",
    },
    modes: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      fontSize: "1em",
      // fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1px",
      cursor: "pointer",
    },
    backicon: {
      width: "0.7em !important",
      height: "0.7em !important",
      position: "relative",
      zIndex: "9999",
      display: "inline-block",
    },
  }));
  const classes = useStyles();

  const handleChangeMode = () => {
    navigate("/salary-with-input");
  };

  return (
    <div>
      <div className={classes.header}>
        <div className="title">
          <Typed
            strings={["Salary predict with file"]}
            typeSpeed={40}
            backSpeed={80}
            loop
          />
        </div>
        <div className={classes.modes} onClick={handleChangeMode}>
          <ArrowBackIosOutlinedIcon className={classes.backicon} />
          <span>Change Mode</span>
        </div>
      </div>
      <FileUpload
        setLoading={setLoading}
        files={files}
        setFiles={setFiles}
        removeFile={removeFile}
        setData={setData}
      />
      <FileList
        isLoading={isLoading}
        files={files}
        removeFile={removeFile}
        data={data}
      />
      <SalaryTable data={data} isLoading={isLoading} />
    </div>
  );
}

export default FilePage;
