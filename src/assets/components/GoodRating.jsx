import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import {useState} from "react";

export default function GoodRating(props) {
  // size prop can be small medium or large
  let initialValue = props.rating ?? 0;
  const [value, setValue] = useState(initialValue);

  React.useEffect (() => {
    setValue(initialValue);
  }, [props]);

  React.useEffect(() =>{
    if(props.onRating){
      props.onRating(value);
    }
  }, [value]);

  const handleChangeValue = (ev, newValue) => {
    setValue(newValue);
  }

  return (
      <Rating
        precision={0.5}
        name={props.name || "simple-controlled"}
        value={value}
        defaultValue={0}
        size={props.size}
        readOnly={props.name === "read-only" ? true : false}
        onChange={handleChangeValue}
      />
    )
}