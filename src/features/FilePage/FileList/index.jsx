import axios from "axios";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import FileItem from "./components/FileItem";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  alert: {
    margin: "1em 0",
  },
  sekeleton: {
    // position: "absolute",
    height: "60px",
    width: "100%",
    padding: "0",
  },
}));

const FileList = ({ isLoading, files, removeFile, data }) => {
  const classes = useStyles();
  const deleteFileHandler = (_name) => {
    removeFile(_name);
  };
  return (
    <ul className="file-list">
      {isLoading && (
        <Skeleton animation="pulse" className={classes.sekeleton} />
      )}
      {data.length === 0 && !isLoading && (
        <Alert severity="error" className={classes.alert}>
          File don't correct format!
        </Alert>
      )}
      {data.length > 0 &&
        files.map((f) => (
          <FileItem key={f.name} file={f} deleteFile={deleteFileHandler} />
        ))}
    </ul>
  );
};

export default FileList;
