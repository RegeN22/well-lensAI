import { Box, Snackbar, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ingredients } from "../../features/product-scan/IngredientsList/IngredientsList";
import PictureUpload from "../../features/product-scan/PictureUpload/PictureUpload";
import { ProductDescription } from "../../features/product-scan/ProductDescription/ProductDescription";
import {
  ProductIngredientModel,
  ProductScanModel,
} from "../../models/product-scan.model";
import apiClient from "../../services/api-client";
import { scan } from "../../services/scan-service";

export default function NewScanPage(): JSX.Element {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string>("");
  const [ingredients, setIngredients] = useState<ProductIngredientModel[]>([]);
  const [product, setProduct] = useState<ProductScanModel>();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
    }
  }, []);

  const uploadPicture = async (picture: File) => {
    setIsLoading(true);
    setLoadingError("");

    let scanResult: ProductScanModel | null = null;
    try {
      scanResult = await scan(picture);
    } catch (err) {
      setLoadingError((err as Error).message);
    }

    setIsLoading(false);

    if (
      !scanResult ||
      !scanResult.ingredients ||
      !scanResult.rate ||
      !scanResult.name ||
      !scanResult.text
    ) {
      setLoadingError(loadingError + "\n" + "Incomplete response.");
      // TODO maybe create a function that tries it again or asks the user if they want to try again
    } else {
      setIngredients(scanResult.ingredients);
      setProduct(scanResult);

      const data: FormData = new FormData();
      data.append("file", picture);
      data.append("userId", "123");
      data.append("jsonData", JSON.stringify(scanResult));

      apiClient.post("/history", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  };

  return (
    <Box sx={{ margin: "1em" }}>
      {product ? (
        <Stack direction={"column"} spacing={2}>
          <ProductDescription
            grade={product?.rate}
            name={product?.name}
            overallAssessment={product?.text}
          />
          <Ingredients ingredients={ingredients} />
        </Stack>
      ) : (
        <Stack direction={"column"} spacing={3}>
          <Typography variant="h4">Upload a picture of a product</Typography>
          <PictureUpload onUpload={uploadPicture} />
        </Stack>
      )}
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
