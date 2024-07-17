import React, { useEffect, useState } from "react";
import { Avatar, Box } from "@mui/material";



interface GradeProps extends Pick<React.ComponentProps<"div">,"className"> {
  grade: number,
  width?:string;
  height? :string;
}

export const Grade = ({grade,width,height, ...props}:GradeProps) => {
  const [color, setColor] = useState<string>("");

  useEffect(()=>{
    grade == 0 ? setColor("black"):grade <= 4 ? setColor("hsl(354, 100%, 50%)") : grade <= 7 ? setColor("hsl(41, 100%, 50%)") :  setColor("hsl(100, 100%, 23%)");
  },[grade])

  return (
    <Avatar sx={{ bgcolor: color, width: width ?? 56, height: height ?? 56 }} className={props.className}>
      {grade}
    </Avatar>
  );
};
