import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import LibraryAddCheckRoundedIcon from "@mui/icons-material/LibraryAddCheckRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import "./CheckoutStep.css";

const CheckoutStep = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingRoundedIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckRoundedIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <PaidRoundedIcon />,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{ color: activeStep >= index ? "black" : "#76767696" }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutStep;
