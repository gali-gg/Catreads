import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import books from "../../data/books";
import "./styles.css";
import Title from './Title';
import authors from '../../data/authors';
import { Stack } from '@mui/material';
import serachIcon from "../images/icn_nav_search.svg";


export default function CustomInputAutocomplete(props) {
  return (
    <label>
      <Autocomplete
        sx={{
          display: 'inline-block',
          '& input': {
            width: props.width || 300,
            height: 20,
            border: "1px solid #ddd",
            padding: "5px",
            borderRadius: "3px",
            fontFamily: "Lato Regular",
            fontSize: "0.95em"
          }
        }}
        id="custom-input-demo"
        options={books}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option) => (
          <Stack 
            alignItems="center" 
            direction="row" 
            spacing={1} 
            key={option.uuid} 
            sx={{borderBottom: "1px solid #ddd"}} 
            component="li" 
            {...props}>
              <img
                loading="lazy"
                width="30"
                src={option.cover}
                alt={option.title}
              />
              <Stack direction="column" alignItems="flex-start">
                <Title title={option.title} className="meriB grBrown f-09"></Title>
                <span className="meriR grBrown f-08">by {authors.filter(author => author.uuit === option.autor)[0].name}</span>
              </Stack>
          </Stack>
        )}
        renderInput={(params) => (
          <Stack ref={params.InputProps.ref}>
            <input 
              type="text" 
              placeholder="Search books" 
              className="latoB f-1"
              {...params.inputProps}
              />
          </Stack>
        )}
      />
    </label>
  );
}
