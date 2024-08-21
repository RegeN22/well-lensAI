import { useState } from "react";
import {
  Card,
  CardContent,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import { ProductIngredientModel } from "../../models";
import Grade from "../../features/product-scan/Grade/Grade";

interface ProductIngredientsProps {
  ingredients: ProductIngredientModel[]
}

export const ProductIngridients = ({ ingredients } : ProductIngredientsProps) => {
  const [expandedItem, setExpandedItem] = useState<string|undefined>();
  const handleCardClick = (ingredient: string) => {
    setExpandedItem(expandedItem === ingredient ? undefined : ingredient);
  };

  return (
    <Stack spacing={1}>
      {ingredients.map((ingredient) => (
        <Card
          onClick={() => handleCardClick(ingredient.name)}
          sx={{cursor: "pointer"}}
        >
          <CardContent>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Typography variant="h6">{ingredient.name}</Typography>
              <Grade grade={ingredient.rate} size={50}></Grade>
            </Stack>
            <Collapse in={expandedItem === ingredient.name}>
              <Typography variant="body1" color="textSecondary">
                {ingredient.text}
              </Typography>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
