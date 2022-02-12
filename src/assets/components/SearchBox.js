import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';


const options = ['Option 1', 'Option 2'];

export default function CustomInputAutocomplete() {
  return (
    <label>
      <Autocomplete
        sx={{
          display: 'inline-block',
          '& input': {
            width: 300,
            height: 20,
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },
        }}
        id="custom-input-demo"
        options={options}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input type="text" placeholder="Search books" {...params.inputProps} />
            
          </div>
        )}
      />
    </label>
  );
}
