import { Button } from "@mui/material";
import React from "react";

const CommonButton = ({ buttonName, handlesubmit, design, hoverStyles }) => {
  return (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="mt-4"
        sx={{
          ...design,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            ...hoverStyles,
          },
        }}
        fullWidth
        onClick={handlesubmit}
      >
        {buttonName}
      </Button>
    </>
  );
};

export default CommonButton;
