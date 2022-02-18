import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function GoodRating(props) {
  // size prop can be small medium or large
  const [value, setValue] = React.useState(props.rating);

  return (
      <Rating
        precision={0.5}
        name={props.name || "simple-controlled"}
        value={value}
        defaultValue={0}
        size={props.size}
        onChange={(event, newValue) => {
          setValue(newValue);
          if(props.onRating){
            props.onRating();
          }
        }}
      />
    )
}