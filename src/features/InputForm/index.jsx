import React, { useState } from "react";
import Typed from "react-typed";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Avatar, Button, Paper, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputItem from "./components/InputItem";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import { useNavigate } from "react-router-dom";

const PUBLIC_URL = "https://salary-predict-server.onrender.com";
const LOCAL_URL = "http://127.0.0.1:8000";

function InputForm(props) {
  const [data, setData] = useState([]);
  const { width } = useWindowDimensions();
  const useStyles = makeStyles((theme) => ({
    form__root: {
      padding: "1.5em 0",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
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
      zIndex: "1000",
      top: 0,
      right: 0,
    },
    backicon: {
      width: "0.7em !important",
      height: "0.7em !important",
      position: "relative",
      zIndex: "9999",
      display: "inline-block",
    },
    results: {
      padding: "1.5em 0",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      width: `${width > 800 ? "50%" : width - 50 + "px"}`,
    },
    main__result: {
      padding: "0.5em 0",
      fontSize: "18px",
    },
    button: {
      margin: theme.spacing(1),
      width: `${width > 800 ? "50%" : width - 50 + "px"}`,
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      minWidth: "50px",
      minHeight: "50px",
    },
  }));
  const classes = useStyles();
  const navigate = useNavigate();

  // formdata hadler
  const schema = yup
    .object({
      knowledge: yup
        .number()
        .required("Please enter your number")
        .min(0)
        .max(100),
      technical: yup
        .number()
        .required("Please enter your number")
        .min(0)
        .max(100),
      logical: yup
        .number()
        .required("Please enter your number")
        .min(0)
        .max(100),
      year_experience: yup
        .number()
        .required("Please enter your number")
        .min(0)
        .max(100),
    })
    .required();

  const form = useForm({
    defaultValues: {
      knowledge: "",
      technical: "",
      logical: "",
      year_experience: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    console.log("form data: ", values);

    axios
      .post(
        PUBLIC_URL + "/salary_with_formdata",
        JSON.stringify({ data: values })
      )
      .then((res) => {
        if (res.data) {
          console.log("data in fileupload: ", res.data);
          setData([res.data]);
        } else {
          console.log("no data returned from server");
        }
      })
      .catch((err) => {
        // inform the user
        console.error(err);
      });
    form.reset();
  };
  const handleChangeMode = () => {
    navigate("/");
  };

  return (
    <div>
      <div className={classes.header}>
        <div className="title">
          <Typed strings={["Data form"]} typeSpeed={40} backSpeed={80} loop />
        </div>
        <div className={classes.modes} onClick={handleChangeMode}>
          <ArrowBackIosOutlinedIcon className={classes.backicon} />
          <span>Change Mode</span>
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={classes.form__root}
      >
        <Avatar className={classes.avatar}>
          <EditOutlinedIcon />
        </Avatar>
        <InputItem label="Knowledge" form={form} name="knowledge" />
        <InputItem label="Technical" form={form} name="technical" />
        <InputItem label="Logical" form={form} name="logical" />
        <InputItem label="Year Experience" form={form} name="year_experience" />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Send
        </Button>
        {data.length > 0 && (
          <div className={classes.results}>
            <Typography className="title">RESULT</Typography>
            <div className={classes.main__result}>
              {data.map((item, idx) => (
                <Alert icon={false} severity="success" key={"item-" + idx}>
                  - Accuracy:
                  {item["accuracy_test_prediction_salary"].toFixed(2) * 100}%
                  <br />- Salary: {item["predicted_salary"]}
                </Alert>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default InputForm;
