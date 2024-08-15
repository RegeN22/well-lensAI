import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Typography,
  useTheme,
} from "@mui/material";
import { ProductIngredientModel } from "../../models";

interface ProductIngredientsProps {
  ingredients: ProductIngredientModel[]
}

export const ProductIngridients = ({ ingredients } : ProductIngredientsProps) => {
  const { palette } = useTheme();

  // State to manage expanded items
  const [expandedItem, setExpandedItem] = useState<string|undefined>();
  const errorColor: string =
    palette.mode === "dark" ? palette.error.dark : palette.error.light;
  const warningColor: string =
    palette.mode === "dark" ? palette.warning.dark : palette.warning.light;
  const successColor: string =
    palette.mode === "dark" ? palette.success.dark : palette.success.light;
  // Toggle expansion for a specific ingredient
  const handleCardClick = (ingredient: string) => {
    setExpandedItem(ingredient);
  };

  const getColor = (grade: number) => {
    return grade === 0
      ? "black"
      : grade <= 4
      ? errorColor
      : grade <= 7
      ? warningColor
      : successColor;
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        mx: "auto",
        width: "85%",
        gap: "10px"
      }}
    >
      {ingredients.map((ingredient) => (
        <Card
          elevation={0}
          onClick={() => handleCardClick(ingredient.name)}
          sx={{
            cursor: "pointer",
            width: "100%",
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">{ingredient.name}</Typography>
              {/* <Avatar
                sx={{
                  bgcolor: () => getColor(ingredient.rate),
                  width: 27,
                  height: 27,
                }}
              >
                {ingredient.rate}
              </Avatar> */}
              <Typography
                variant="h6"
                sx={{
                  border: "1 solid",
                  borderRadius: 50,
                }}
                color={() => getColor(ingredient.rate)}
              >
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
