import React from "react";
import { Avatar, Box } from "@mui/material";

const grade = 30;

const gradeColor = (grade: number): string => {
  return grade <= 50 ? "red" : "green";
};

export const Grade = () => {
  return (
    <Avatar sx={{ bgcolor: gradeColor(grade), width: 56, height: 56 }}>
      {grade}
    </Avatar>
  );
};
