import { Stack, Typography } from "@mui/material";
import { Grade } from "../Grade/Grade.tsx";

interface ProductDescriptionProps {
  grade?: number;
  name?: string;
  overallAssessment?: string;
}

export const ProductDescription = ({
  grade = 0,
  name = "The Product's name",
  overallAssessment = "overall",
}: ProductDescriptionProps) => {
  return (
    <Stack direction={"column"} alignItems={"center"} spacing={2}>
      <Typography variant="h2">{name}</Typography>

      <Typography variant="subtitle1">{overallAssessment}</Typography>
      <Grade grade={grade} />
    </Stack>
  );
};
