import React, { useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
  Collapse,
} from "@mui/material";
import { Grade } from "../../features/product-scan/Grade/Grade";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { ThemeContext } from "@emotion/react";

interface ProductDescriptionProps {
  grade?: number;
  name?: string;
  overallAssessment?: string;
}

export const ProductInfo = ({
  grade = 0,
  name = "The Product's name",
  overallAssessment = "overall",
}: ProductDescriptionProps) => {
  const [productName, setProductName] = useState<string>(name);
  const [editName, setEditName] = useState<boolean>(false);
  const [openDesc, setOpenDesc] = useState<boolean>(false);

  const handleEditName = () => {
    setEditName(false);
    // TODO: add changing name in db + loading till changed
  };
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      {editName ? (
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField value={productName}>{name}</TextField>
          <IconButton onClick={handleEditName}>
            <CheckCircleOutlineRoundedIcon fontSize="large" />
          </IconButton>
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h5">{productName}</Typography>
          <IconButton
            onClick={() => {
              setEditName(true);
            }}
          >
            <EditOutlinedIcon fontSize="large" />
          </IconButton>
        </Stack>
      )}
      <Grade grade={9} />
      <Card
        variant="outlined"
        onClick={() => setOpenDesc((open) => !open)}
        sx={{ cursor: "pointer", width: "100%", borderRadius: 0 }}
      >
        <CardContent>
          <Typography variant="h6">Description</Typography>
          <Collapse in={!openDesc}>
            <Typography variant="body2" color="textSecondary">
              {overallAssessment}
            </Typography>
          </Collapse>
        </CardContent>
      </Card>
    </Stack>
  );
};
