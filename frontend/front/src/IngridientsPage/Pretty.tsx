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
import { Grade } from "./Grade.tsx";
import "./ingredients-page.css";
import { ProgressBar } from "./ProgressBar.tsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ingredients = [
  {
    name: "water",
    description:
      "The primary solvent in most shampoos, providing hydration and helping to dissolve other ingredients.",
    rate: 10,
  },
  {
    name: "sodium lauryl sulfate",
    description:
      "A surfactant that helps create foam and cleanses the hair and scalp by removing oils and dirt.",
    rate: 6,
  },
  {
    name: "cocamidopropyl betaine",
    description:
      "A mild surfactant derived from coconut oil that helps to produce foam and reduce irritation.",
    rate: 8,
  },
  {
    name: "panthenol",
    description:
      "Also known as vitamin B5, it helps to moisturize and strengthen hair, improving its appearance and feel.",
    rate: 7,
  },
  {
    name: "fragrance",
    description:
      "Adds a pleasant scent to the shampoo, enhancing the overall user experience.",
    rate: 2,
  },
];

export type ingredient = {
  name: string;
  rate: number;
  text: string;
};

interface IngredientsProps {
  ingredients: ingredient[];
}

export const Pretty = ({ingridients}) => {
  // State to manage expanded items
  const [expandedItem, setExpandedItem] = useState();

  // Toggle expansion for a specific ingredient
  const handleCardClick = (ingredient) => {
    setExpandedItem(ingredient);
  };

  const getPBarColor = (rating: number): string => {
    if (rating === 0) {
      return "black";
    } else if (rating <= 4) {
      return "rgb(200 7 7)";
    } else if (rating <= 7) {
      return "rgb(211 203 40)";
    } else {
      return "#52af77";
    }
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "400px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ mr: 1 }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
          <Typography>Name</Typography>
        </Box>
        <IconButton aria-label="delete">
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      <Box sx={{ width: "400px", my: 2 }}>
        <ProgressBar
          bgcolor={getPBarColor(8)}
          progress={(8 / 10) * 100}
          height={30}
        />
      </Box>
      {ingredients.map((ingredient) => (
        <Card
          variant="outlined"
          onClick={() => handleCardClick(ingredient.name)}
          sx={{ cursor: "pointer", width: "400px", mt: 2 }}
        >
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">{ingredient.name}</Typography>
              <Grade size={30} grade={ingredient.rate * 10} />
            </Box>
            <Collapse in={expandedItem === ingredient.name}>
              <Typography variant="body2" color="textSecondary">
                {ingredient.description}
              </Typography>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
