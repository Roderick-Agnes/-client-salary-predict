import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useWindowDimensions from "hooks/useWindowDimensions";
import FilePage from "features/FilePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import InputForm from "features/InputForm";
import "./App.scss";
import { Paper } from "@material-ui/core";

function App() {
  const { height, width } = useWindowDimensions();

  const useStyles = makeStyles((theme) => ({
    app: {
      display: "flex",
      flexDirection: "column",
      padding: `${width > 830 ? "1em" : "1.5em"}`,
      width: `${width > 830 ? "830px" : width + "px"}`,
      backgroundColor: "#fff",
      minHeight: `${width > 830 ? height - 40 + "px" : height + "px"}`,
      margin: `${width > 830 ? "20px 0" : "0"}`,
      borderRadius: 0,
    },
  }));
  const classes = useStyles();

  return (
    <Paper className={classes.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FilePage />} exact />
          <Route path="/salary-with-input" element={<InputForm />} />
        </Routes>
      </BrowserRouter>
    </Paper>
  );
}

export default App;
