import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Grade } from "./Grade.tsx";

const ingredients = {
  water:
    "The primary solvent in most shampoos, providing hydration and helping to dissolve other ingredients.",
  "sodium lauryl sulfate":
    "A surfactant that helps create foam and cleanses the hair and scalp by removing oils and dirt.",
  "cocamidopropyl betaine":
    "A mild surfactant derived from coconut oil that helps to produce foam and reduce irritation.",
  panthenol:
    "Also known as vitamin B5, it helps to moisturize and strengthen hair, improving its appearance and feel.",
  fragrance:
    "Adds a pleasant scent to the shampoo, enhancing the overall user experience.",
};

export const Ingredients = () => {
  // State to manage expanded items
  const [expandedItems, setExpandedItems] = useState({});

  // Toggle expansion for a specific ingredient
  const handleCardClick = (ingredient) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [ingredient]: !prevState[ingredient],
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "700px",
        mx: "auto",
      }}
    >
      <Grade />
      {Object.keys(ingredients).map((ingredient) => (
        <Card
          variant="outlined"
          onClick={() => handleCardClick(ingredient)}
          sx={{ cursor: "pointer", width: "inherit", mt: 2 }}
        >
          <CardContent>
            <Typography variant="h6">{ingredient}</Typography>
            <Collapse in={!!expandedItems[ingredient]}>
              <Typography variant="body2" color="textSecondary">
                {ingredients[ingredient]}
              </Typography>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
