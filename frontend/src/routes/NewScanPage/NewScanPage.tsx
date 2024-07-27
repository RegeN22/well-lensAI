import { Box, Snackbar, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { ProductIngredientModel, ProductScanModel } from "../../models/product-scan.model";
import { ProductDescription } from "../../features/product-scan/ProductDescription/ProductDescription";
import { Ingredients } from "../../features/product-scan/IngredientsList/IngredientsList";
import PictureUpload from "../../features/product-scan/PictureUpload/PictureUpload";

export default function NewScanPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string>("");
  const [ingredients, setIngredients] = useState<ProductIngredientModel[]>([]);
  const [product, setProduct] = useState<ProductScanModel>();

  const uploadPicture = async (picture: File) => {
    const formData = new FormData();
    formData.append("file", picture);

    setIsLoading(true);
    setLoadingError("");

    let data: ProductScanModel | null = null;
    try {
      const result = await fetch("http://localhost:3000/api/v1/scan", {
        method: "POST",
        body: formData,
      });
      data = await result.json();
    } catch (err) {
      setLoadingError((err as Error).message);
    }

    setIsLoading(false);

    if (!data || !data.ingredients || !data.rate || !data.name || !data.text) {
      setLoadingError(loadingError + '\n' + "Incomplete response.");
      // TODO maybe create a function that tries it again or asks the user if they want to try again
    } else {
      saveToHistory(data, formData);
      setIngredients(data.ingredients);
      setProduct(data);
    }
  };

  const saveToHistory = useCallback(async (data: ProductScanModel, image: FormData) => {
    await fetch("http://localhost:3000/api/v1/history", {
      method: "POST",
      body: JSON.stringify({
        userId: "123",//TODO
        image: image,
        jsonData: data
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }, [])

  return (
    <Box sx={{margin: '1em'}}>
      {product ?
        (
          <Stack direction={"column"} spacing={2}>
            <ProductDescription
              grade={product?.rate}
              name={product?.name}
              overallAssessment={product?.text} />
            <Ingredients ingredients={ingredients} />
          </Stack>
        ) : 
        <Stack direction={"column"} spacing={3}>
          <Typography variant="h4">Upload a picture of a product</Typography>
          <PictureUpload onUpload={uploadPicture} />
        </Stack>
      }
      <Snackbar
        open={isLoading}
        message="Loading..."
        key={"bottom_" + "left"}
      />
      <Snackbar
        open={loadingError !== ""}
        message={"An error has occured! Try again later. " + loadingError}
        key={"bottom" + "left"}
      />
    </Box>
  );
}