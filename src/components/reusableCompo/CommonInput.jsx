import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CommmonTextField = ({ fields, formik }) => {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full">
      <Box key={fields.id} sx={{ minWidth: "96%" }} className="flex flex-col">
        {fields.type === "checkbox" ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values[fields.name]}
                onChange={formik.handleChange}
                name={fields.name}
                sx={{ color: "white" }}
              />
            }
            label={fields.label}
            className="text-sm text-white"
          />
        ) : (
          <>
            <label className="text-sm flex justify-start font-medium mb-2 text-white">
              {fields.label}
            </label>
            <TextField
              id={fields.id}
              variant={screenWidth > 640 ? "outlined" : "standard"}
              name={fields.name}
              type={
                fields.type === "password" && showPassword
                  ? "text"
                  : fields.type === "password"
                  ? "password"
                  : fields.type
              }
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={fields.placeholder}
              error={Boolean(
                formik.touched[fields.name] && formik.errors[fields.name]
              )}
              helperText={
                formik.touched[fields.name] && formik.errors[fields.name]
              }
              FormHelperTextProps={{
                sx: {
                  color: "white",
                  fontSize: "0.75rem",
                  position: "absolute",
                  bottom: -20,
                  left: 0,
                  margin: 0,
                },
              }}
              value={formik?.values[fields.name]}
              multiline={false}
              InputProps={{
                startAdornment: fields.icon && (
                  <div className="px-4 max-md:text-sm text-white">
                    {fields.icon}
                  </div>
                ),
                endAdornment: fields.type === "password" && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              sx={{
                color: "white",
                position: "relative",
                marginBottom: "30px",
                "& .MuiInputBase-root": {
                  color: "white",
                  backgroundColor:
                    fields.design === "transparent" ? "transparent" : undefined,
                },
                "& input": {
                  color: "white",
                  fontSize: {
                    xs: "0.80rem",
                    sm: "0.80rem",
                    md: "0.90rem",
                    lg: "0.95rem",
                  },
                  "&::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root": {
                  width: fields.width,
                  borderRadius: "10px",
                  padding: "10px",
                  height: "2.9rem",
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "#51a2ff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                    borderWidth: "2px",
                  },
                  "& svg": {
                    color: "white",
                  },
                },
                "& .MuiInputAdornment-root": {
                  color: "white",
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                  WebkitTextFillColor: "white",
                  transition: "background-color 5000s ease-in-out 0s",
                  caretColor: "white",
                },
                "& .MuiFormHelperText-root": {
                  color: "white",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white",
                },
              }}
            />
          </>
        )}
      </Box>
    </div>
  );
};

export default CommmonTextField;
