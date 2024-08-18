import React, { useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
  Collapse,
  CardHeader,
  CardMedia,
  CardActions,
  styled,
  IconButtonProps,
  Box,
} from "@mui/material";
import { Grade } from "../../features/product-scan/Grade/Grade";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { ThemeContext } from "@emotion/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ProductScanModel } from "../../models/product-scan.model";
import useTheme from "@mui/material/styles/useTheme";

interface ProductDescriptionProps {
  grade?: number;
  name?: string;
  overallAssessment?: string;
  ingridients: any;
  image: any;
}

interface Props {
  product: ProductScanModel;
  productImage: string;
  onSelect?: () => void;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const ProductInfo = ({
  grade = 0,
  name = "The Product's name",
  overallAssessment = "overall",
  ingridients,
  image,
}: ProductDescriptionProps) => {
  const [productName, setProductName] = useState<string>(name);
  const [editName, setEditName] = useState<boolean>(false);
  const [openDesc, setOpenDesc] = useState<boolean>(false);

  const handleEditName = () => {
    setEditName(false);
    // TODO: add changing name in db + loading till changed
  };
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "85%",
      }}
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
        elevation={1}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">{name}</Typography>
          <Grade grade={grade} />
        </CardContent>
      </Card>
      <Card
        elevation={1}
        sx={{ borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {overallAssessment}
          </Typography>
        </CardContent>
      </Card>
      <Card elevation={1} sx={{ borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="200"
          className="card-image"
          image={image} // Assuming productImage is a variable holding the image URL
          alt="Product Image"
        />
      </Card>
    </Box>
  );
};
