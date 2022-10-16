import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import useWindowDimensions from "hooks/useWindowDimensions";

const FileUpload = (props) => {
  const { setLoading, files, setFiles, removeFile, setData } = props;
  const { height, width } = useWindowDimensions();
  const useStyles = makeStyles((theme) => ({
    root: {},
    title: {
      zIndex: 2,
      color: "black",
    },
    cloudicon: {
      fontSize: "100px",
      postion: "absolute",
      zIndex: 3,
      color: "#42a5f5",
    },
    main: {
      color: "#b2d5fa",
      fontSize: `${width >= 480 ? "25px" : width / 22 + "px"}`,
      fontWeight: "bold",
      marginBottom: "0.5em",
      letterSpacing: `${width >= 480 ? "5px" : "2px"}`,
    },
    ortitle: {
      color: "#b2d5fa",
      fontSize: `${width >= 480 ? "18px" : width / 22 - 7 + "px"}`,
      fontWeight: 100,
      marginBottom: "0.5em",
    },
  }));

  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    // reset data
    setData([]);
    const file = acceptedFiles[acceptedFiles.length - 1];
    console.log("file: ", file);
    if (!file) return;
    setLoading(true);
    // setFiles([...files, file]);
    setFiles([file]);

    // upload file
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(
        "https://salary-predict-server.onrender.com/salary_with_singlefile",
        formData
      )
      .then((res) => {
        if (res.data.data) {
          setFiles([...files, file]);
          setData(res.data.data);
          console.log("data in fileupload: ", res.data.data);
        } else {
          console.log("file not correctly formatted");
        }
        setLoading(false);
      })
      .catch((err) => {
        // inform the user
        console.error(err);
        removeFile(file.name);
        setData([]);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <div className="file-card" {...getRootProps()}>
        <div className="file-inputs">
          <input type="file" {...getInputProps()} accept="*" />
          <CloudUploadOutlinedIcon className={classes.cloudicon} />
        </div>
        {isDragActive ? (
          <p className={classes.main}>Drop the files here ...</p>
        ) : (
          <p className={classes.main}>Drag some files to here</p>
        )}
        <p className={classes.ortitle}>OR</p>
        <button>
          <i>
            <FontAwesomeIcon icon={faPlus} />
          </i>
          Click here
        </button>
        <p className="info">
          <span>Supported files: </span>.csv
        </p>
      </div>
    </>
  );
};

export default FileUpload;
