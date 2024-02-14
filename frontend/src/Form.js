import React, { useState, useEffect } from 'react';
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
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);

  // Enable/disable Next button based on form validation
  useEffect(() => {
    setIsNextDisabled(true);
    if (step === 1 && firstName && lastName) {
      setIsNextDisabled(false);
    } else if (step === 2 && wheels) {
      setIsNextDisabled(false);
    } else if (step === 3 && type) {
      setIsNextDisabled(false);
    } else if (step === 4 && model) {
      setIsNextDisabled(false);
    }
  }, [step, firstName, lastName, wheels, type, model]);

  // Fetch vehicle types based on number of wheels
  useEffect(() => {
    if (wheels) {
      let type;
      if(wheels === '2'){
        type = 'bike';
      }
      else{
        type = 'car';
      }
      fetch(`http://localhost:5000/api/vehicles/types/${type}`)
        .then(response => response.json())
        .then(data => setVehicleTypes(data))
        .catch(error => console.error('Error fetching vehicle types:', error));
    }
  }, [wheels]);

  // Fetch vehicle models based on selected type
  useEffect(() => {
    let vehicleType;
    if(wheels === '2'){
      vehicleType = 'bike';
    }
    else{
      vehicleType = 'car';
    }
    if (type) {
      fetch(`http://localhost:5000/api/vehicles/models/${vehicleType}/${type}`)
        .then(response => response.json())
        .then(data => setVehicleModels(data))
        .catch(error => console.error('Error fetching vehicle models:', error));
    }
  }, [type]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    const formData = { firstName, lastName, wheels, type, model, startDate, endDate };
    fetch('http://localhost:5000/api/vehicle/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Form submitted successfully:', data);
    })
    .catch(error => console.error('Error submitting form:', error));
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
              value={firstName}
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
              value={lastName}
              onChange = {(e) => setLastName(e.target.value)}
              required
            />
          </Stack>
        </Box>
        );
      case 2:
        return (
          <FormControl component="fieldset">
            <h2>Number of wheels</h2>
            <RadioGroup aria-label="wheels" name="wheels" value={wheels} onChange={(e) => setWheels(e.target.value)}>
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
            </RadioGroup>
          </FormControl>
        );
      case 3:
        return (
          <FormControl component="fieldset">
            <h2>Type of Vehicle</h2>
            <RadioGroup aria-label="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
              {vehicleTypes.map((vehicleType, index) => (
                <FormControlLabel key={index} value={vehicleType} control={<Radio />} label={vehicleType} />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 4:
        return (
          <FormControl component="fieldset">
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
            <Button variant="contained" onClick={handleNext} disabled={isNextDisabled} style={{ marginLeft: '10px' }}>
              Next
            </Button>
          )}
          {step === 5 && (
            <Button variant="contained" onClick={handleSubmit} disabled={isNextDisabled} style={{ marginLeft: '10px' }}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;


