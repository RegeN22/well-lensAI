import {
  Card,
  CardContent,
  Stack,
  Typography,
  CardMedia
} from "@mui/material";
import { Grade } from "../../features/product-scan/Grade/Grade";

interface ProductDescriptionProps {
  grade?: number;
  name?: string;
  overallAssessment?: string;
  image: string;
}


export const ProductInfo = ({
  grade = 0,
  name = "The Product's name",
  overallAssessment = "overall",
  image,
}: ProductDescriptionProps) => {

  return (
    <Stack spacing={1}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          className="card-image"
          image={image} // Assuming productImage is a variable holding the image URL
          alt="Product Image"
        />
        <CardContent>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{marginBottom: '1em'}}>
            <Typography variant="h4">{name}</Typography>
            <Grade grade={grade} />
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {overallAssessment}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};
