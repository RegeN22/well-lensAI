import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const ProductIngridients = ({ ingredients }) => {
  // State to manage expanded items
  const [expandedItem, setExpandedItem] = useState();

  // Toggle expansion for a specific ingredient
  const handleCardClick = (ingredient) => {
    setExpandedItem(ingredient);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        mx: "auto",
      }}
    >
      {ingredients.map((ingredient) => (
        <Card
          variant="elevation"
          onClick={() => handleCardClick(ingredient.name)}
          sx={{ cursor: "pointer", width: "100%", borderRadius: 0 }}
        >
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">{ingredient.name}</Typography>
              <Typography variant="h6" sx={{ border: "1 solid" }}>
                {ingredient.rate}
              </Typography>
            </Box>
            <Collapse in={expandedItem === ingredient.name}>
              <Typography variant="body2" color="textSecondary">
                {ingredient.text}
              </Typography>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
