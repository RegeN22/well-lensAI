import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useTheme from "@mui/material/styles/useTheme";
import { grey } from "@mui/material/colors";

interface GradeProps {
  grade: number;
  size?: number;
}

// GradientSVG Component: Defines the linear gradient for the CircularProgressbar
const GradientSVG = ({ grade, gradientId }: {grade: number, gradientId: string}) => {
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
  const idCSS = gradientId; // ID for the gradient
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

export const Grade = ({ grade, size = 75 }: GradeProps) => {
  const [color, setColor] = useState<string>("");
  const { palette } = useTheme();
  const errorColor: string =
    palette.mode === "dark" ? palette.error.dark : palette.error.light;
  const warningColor: string =
    palette.mode === "dark" ? palette.warning.dark : palette.warning.light;
  const successColor: string =
    palette.mode === "dark" ? palette.success.dark : palette.success.light;
  const trailColor = palette.mode === 'dark' ? grey[800] : grey[200];
  const gradientId: string = 'gradient' + grade;


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
    <div style={{ width: size, height: size }}>
      <CircularProgressbar
        value={grade * 10} // Multiply by 10 to scale the grade (assuming grade is 0-10)
        text={`${grade}`} // Display the grade as text inside the progress bar
        styles={buildStyles({
          textSize: `${size * 0.6}px`,
          pathColor: `url(#${gradientId})`, // Apply the gradient to the progress path
          textColor: color, // Text color
          trailColor: trailColor, // Trail color (slightly transparent white)
          backgroundColor: "transparent", // Transparent background
          pathTransitionDuration: 2.5,
        })}
        background // Adds a background circle behind the progress bar
      />
      <GradientSVG grade={grade} gradientId={gradientId} />
    </div>
  );
};

export default Grade;
