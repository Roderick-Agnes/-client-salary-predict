import {
  faFileAlt,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./index.scss";

const FileItem = ({ isLoading, file, deleteFile }) => {
  return (
    <>
      <li className="file-item" key={file.name}>
        <FontAwesomeIcon icon={faFileAlt} />
        <p>{file.name}</p>
        <div className="actions">
          <div className="loading"></div>
          {isLoading && (
            <FontAwesomeIcon
              icon={faSpinner}
              className="fa-spin"
              onClick={() => deleteFile(file.name)}
            />
          )}
          {!isLoading && (
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => deleteFile(file.name)}
            />
          )}
        </div>
      </li>
    </>
  );
};

export default FileItem;
