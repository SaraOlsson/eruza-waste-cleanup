import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup(props) {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // const labels = [{value: 'plastic', label: 'Plastic'}, {value: 'receipt', label: 'Receipt'}, {value: 'event', label: 'Event'} ]

  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Type</FormLabel> */}
      <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        {
          props.labels.map((l, idx) => <FormControlLabel key={idx} value={l.value} control={<Radio />} label={l.label} />)
        }
      </RadioGroup>
    </FormControl>
  );
}

{/* <FormControl component="fieldset">
  <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
    <FormControlLabel value="plastic" control={<Radio />} label="Plastic" />
    <FormControlLabel value="receipt" control={<Radio />} label="Receipt" />
    <FormControlLabel value="event" control={<Radio />} label="Event" />
  </RadioGroup>
</FormControl> */}