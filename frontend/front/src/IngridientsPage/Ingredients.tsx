import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Typography,
} from "@mui/material";
import { Grade } from "./Grade.tsx";
import "./ingredients-page.css"
import { ProgressBar } from "./ProgressBar.tsx";

export type ingredient = {
  name: string,
  rate: number,
  text: string
}

interface IngredientsProps {
  ingredients: ingredient[]
}

export const Ingredients = ({ingredients = []}:IngredientsProps) => {
  // State to manage expanded items
  const [expandedItem, setExpandedItem] = useState();

  // Toggle expansion for a specific ingredient
  const handleCardClick = (ingredient) => {
    setExpandedItem(ingredient);
  };

  const getPBarColor = (rating:number):string => {
    if (rating === 0) {
      return "black"
    } else if (rating <= 4) {
      return "rgb(200 7 7)"
    } else if (rating <= 7) {
      return "rgb(211 203 40)"
    } else {
      return "#52af77"
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mx: "auto",
      }}
    >
      {ingredients.map((ingredient) => (
        <Card
          variant="outlined"
          onClick={() => handleCardClick(ingredient.name)}
          sx={{ cursor: "pointer", width: "inherit", mt: 2 }}
        >
          <CardContent className="card-flex">
            <Typography variant="h6">{ingredient.name}</Typography>
            <ProgressBar
                bgcolor={getPBarColor(ingredient.rate)}
                progress={ingredient.rate / 10 * 100}
                height={30}
            />
            <Grade grade={ingredient.rate}/>
            <Collapse in={expandedItem===ingredient.name}>
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
