import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography, Stack } from '@mui/material';
import './App.css'
import { Box } from "@mui/system";

function Form() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [wheels, setWheels] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Submit form data to the backend
    console.log('Form submitted:', { firstName, lastName, wheels, type, model, startDate, endDate });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Box className="content">
          <Stack spacing={2} className="form">
          <h2 className="title">What is your name?</h2>
            <TextField
              id="firstName"
              label="firstName"
              variant="outlined"
              title="firstName"
              name="firstame"
              placeholder="Enter firstName"
              fullWidth
              onChange = {(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              id="lastName"
              variant="outlined"
              label="lastName"
              name="lastName"
              type="lastName"
              fullWidth
              onChange = {(e) => setLastName(e.target.value)}
              required
            />
            {/* <Button className="button" variant="contained" onClick={handleNext}>
              Next
            </Button> */}
          </Stack>
        </Box>
        );
      case 2:
        return (
          <FormControl component="fieldset">
            {/* <FormLabel component="legend">Number of Wheels</FormLabel> */}
            <h2>Number of wheels</h2>
            <RadioGroup aria-label="wheels" name="wheels" value={wheels} onChange={(e) => setWheels(e.target.value)}>
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
            </RadioGroup>
          </FormControl>
        );
      case 3:
        // Fetch vehicle types based on number of wheels from API
        const vehicleTypes = wheels === '2' ? ['bike1', 'bike2'] : ['car1', 'car2']; // Sample data
        return (
          <FormControl component="fieldset">
            {/* <FormLabel component="legend">Type of Vehicle</FormLabel> */}
            <h2>Type of Vehicle</h2>
            <RadioGroup aria-label="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
              {vehicleTypes.map((vehicleType, index) => (
                <FormControlLabel key={index} value={vehicleType} control={<Radio />} label={vehicleType} />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 4:
        // Fetch vehicle models based on selected type from API
        const vehicleModels = type === 'bike1' ? ['model1', 'model2'] : ['model3', 'model4']; // Sample data
        return (
          <FormControl component="fieldset">
            {/* <FormLabel component="legend">Specific Model</FormLabel> */}
            <h2>Specific Model</h2>
            <RadioGroup aria-label="model" name="model" value={model} onChange={(e) => setModel(e.target.value)}>
              {vehicleModels.map((vehicleModel, index) => (
                <FormControlLabel key={index} value={vehicleModel} control={<Radio />} label={vehicleModel} />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 5:
        return (
          <div>
            {/* <Typography variant="h6">Date Range Picker</Typography> */}
            <h2>Date Range Picker</h2>
            {/* Implement date range picker component */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='wrapper'>
      <h1>Vehicle Booking</h1>
      <div className='form '>
        {renderStep()}
        <div style={{ marginTop: '20px' }}>
          {step !== 1 && (
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}
          {step !== 5 && (
            <Button variant="contained" onClick={handleNext} style={{ marginLeft: '10px' }}>
              Next
            </Button>
          )}
          {step === 5 && (
            <Button variant="contained" onClick={handleSubmit} style={{ marginLeft: '10px' }}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
    
  );
}

export default Form;

