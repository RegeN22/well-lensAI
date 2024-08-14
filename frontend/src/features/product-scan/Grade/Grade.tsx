import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useTheme from "@mui/material/styles/useTheme";

interface GradeProps {
  grade: number;
}

// GradientSVG Component: Defines the linear gradient for the CircularProgressbar
const GradientSVG = ({ grade }: GradeProps) => {
  const [color, setColor] = useState<string>("");
  const { palette } = useTheme();
  const errorColor: string =
    palette.mode === "dark" ? palette.error.dark : palette.error.light;
  const warningColor: string =
    palette.mode === "dark" ? palette.warning.dark : palette.warning.light;
  const successColor: string =
    palette.mode === "dark" ? palette.success.dark : palette.success.light;

  // Start with the end color and transition to transparent
  const startColor = "rgba(255, 255, 255, 0)"; // Start color of the gradient
  const endColor = color; // End color (transparent)
  const idCSS = "gradient"; // ID for the gradient
  const rotation = 70; // Rotation angle for the gradient

  useEffect(() => {
    grade === 0
      ? setColor("black")
      : grade <= 4
      ? setColor(errorColor)
      : grade <= 7
      ? setColor(warningColor)
      : setColor(successColor);
  }, [grade, errorColor, warningColor, successColor]);

  return (
    <svg style={{ height: 0, visibility: "collapse" }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={`rotate(${rotation})`}>
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
    </svg>
  );
};
// =======
// import { Avatar, useTheme, Typography } from '@mui/material';

// interface GradeProps extends Pick<React.ComponentProps<"div">, "className"> {
//   grade: number,
//   width?: string;
//   height?: string;
// }

// export const Grade = ({ grade, width, height, ...props }: GradeProps) => {
//   const [color, setColor] = useState<string>("");
//   const { palette } = useTheme();
//   const errorColor: string = palette.mode === 'dark' ? palette.error.dark : palette.error.light;
//   const warningColor: string = palette.mode === 'dark' ? palette.warning.dark : palette.warning.light;
//   const successColor: string = palette.mode === 'dark' ? palette.success.dark : palette.success.light;

//   useEffect(() => {
//     grade == 0 ? setColor("black") : grade <= 4 ? setColor(errorColor) : grade <= 7 ? setColor(warningColor) : setColor(successColor);
//   }, [grade, errorColor, warningColor, successColor]);

//   return (
//     <Avatar sx={{ bgcolor: color, width: width ?? 56, height: height ?? 56 }} className={props.className}>
//       <Typography variant="h6">
//         {grade}
//       </Typography>
//     </Avatar>
// >>>>>>> 9b8be5cf6c94e05484f4aeffdce7840219a3d0ab
//   );
// };

// Grade Component: Uses CircularProgressbar with custom styles and gradient
export const Grade = ({ grade }: GradeProps) => {
  const [color, setColor] = useState<string>("");
  const { palette } = useTheme();
  const errorColor: string =
    palette.mode === "dark" ? palette.error.dark : palette.error.light;
  const warningColor: string =
    palette.mode === "dark" ? palette.warning.dark : palette.warning.light;
  const successColor: string =
    palette.mode === "dark" ? palette.success.dark : palette.success.light;

  useEffect(() => {
    grade === 0
      ? setColor("black")
      : grade <= 4
      ? setColor(errorColor)
      : grade <= 7
      ? setColor(warningColor)
      : setColor(successColor);
  }, [grade, errorColor, warningColor, successColor]);

  return (
    <div style={{ width: 75, height: 75 }}>
      <CircularProgressbar
        value={grade * 10} // Multiply by 10 to scale the grade (assuming grade is 0-10)
        text={`${grade}`} // Display the grade as text inside the progress bar
        styles={buildStyles({
          textSize: "35px",
          pathColor: `url(#gradient)`, // Apply the gradient to the progress path
          textColor: color, // Text color
          trailColor: "rgba(255, 255, 255, 0.3)", // Trail color (slightly transparent white)
          backgroundColor: "rgba(255, 255, 255, 0)", // Transparent background
          pathTransitionDuration: 2.5,
        })}
        background // Adds a background circle behind the progress bar
      />
      <GradientSVG grade={grade} />
    </div>
  );
};

export default Grade;
