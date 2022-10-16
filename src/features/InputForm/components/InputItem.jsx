import { makeStyles, TextField } from "@material-ui/core";
import React from "react";

import useWindowDimensions from "hooks/useWindowDimensions";
import { Controller } from "react-hook-form";

function InputItem(props) {
  const { label, form, name } = props;
  const { width } = useWindowDimensions();
  const useStyles = makeStyles((theme) => ({
    form__item: {
      width: `${width > 800 ? "400px" : width - 50 + "px !important"}`,
      marginBottom: "20px !important",
    },
  }));
  const classes = useStyles();
  const { errors, formState } = form;
  const hasError = errors[name];

  return (
    <div>
      <Controller
        as={TextField}
        control={form.control}
        name={name}
        label={label}
        // fullWidth
        // id="standard-basic"
        className={classes.form__item}
        placeholder="0 -> 100"
        error={!!hasError}
        helperText={errors[name]?.message}
      />
    </div>
  );
}

export default InputItem;
