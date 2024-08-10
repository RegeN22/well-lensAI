import React, { useEffect, useState } from "react";
import { Avatar, useTheme, Typography } from '@mui/material';



interface GradeProps extends Pick<React.ComponentProps<"div">, "className"> {
  grade: number,
  width?: string;
  height?: string;
}

export const Grade = ({ grade, width, height, ...props }: GradeProps) => {
  const [color, setColor] = useState<string>("");
  const { palette } = useTheme();
  const errorColor: string = palette.mode === 'dark' ? palette.error.dark : palette.error.light;
  const warningColor: string = palette.mode === 'dark' ? palette.warning.dark : palette.warning.light;
  const successColor: string = palette.mode === 'dark' ? palette.success.dark : palette.success.light;

  useEffect(() => {
    grade == 0 ? setColor("black") : grade <= 4 ? setColor(errorColor) : grade <= 7 ? setColor(warningColor) : setColor(successColor);
  }, [grade, errorColor, warningColor, successColor]);

  return (
    <Avatar sx={{ bgcolor: color, width: width ?? 56, height: height ?? 56 }} className={props.className}>
      <Typography variant="h6">
        {grade}
      </Typography>
    </Avatar>
  );
};
