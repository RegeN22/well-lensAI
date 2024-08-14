import {
  Box,
  Button,
  CircularProgress,
  imageListClasses,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  ProductIngredientModel,
  ProductScanModel,
} from "../../models/product-scan.model";
import { scan } from "../../services/scan-service";
import apiClient from "../../services/api-client";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { ProductInfo } from "./ProductInfo";
import { ProductIngridients } from "./ProductIngridients";
import { log } from "console";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function UploadPic(): JSX.Element {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string>("");
  const [ingredients, setIngredients] = useState<ProductIngredientModel[]>([]);
  const [product, setProduct] = useState<ProductScanModel>();
  const [image, setImage] = useState<string>("");

  const handleUploadClick = (file: File | undefined) => {
    setIsLoading(true);

    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl: string = URL.createObjectURL(file);
        // setImage(imageUrl);
        setImage(imageUrl);
        uploadPicture(file);
      };
      reader.readAsDataURL(file);
    } else {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   enqueueSnackbar(image ?? "no image", { variant: "error" });
  // }, [image]);
  // const [{ data: scanData, isFetching: scanDataFetching }] = useQuery({
  //   queryKey: ["todos", image],
  //   queryFn: async () => await scan(image),
  // });

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
    }
  }, []);

  const uploadPicture = async (picture: File) => {
    let scanResult: ProductScanModel | null = null;

    try {
      scanResult = await scan(picture);
      console.log(scanResult);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      if (error?.response?.status === 400)
        enqueueSnackbar("Bad request", { variant: "error" });
      else if (error?.response?.status === 500)
        enqueueSnackbar("Bad request", { variant: "error" });
      else enqueueSnackbar("Unknown error", { variant: "error" });
    }

    console.log(scanResult);
    setIsLoading(false);
    document.getElementById("upload-image").value = "";

    if (!scanResult) {
      enqueueSnackbar(loadingError + "\n" + "Incomplete response.", {
        variant: "error",
      });
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {product ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <ProductInfo
            grade={product?.rate}
            name={product?.name}
            overallAssessment={product?.text}
            ingridients={ingredients}
            image={image}
          />
          <ProductIngridients ingredients={ingredients} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            mt: 10,
          }}
        >
          <Typography
            variant="h6"
            textAlign="center"
            color={"primary"}
            fontWeight={"bold"}
          >
            Upload a picture of the ingredients on the back of your product
          </Typography>

          <input
            disabled={isLoading}
            accept="image/*"
            id="upload-image"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              handleUploadClick(e?.target?.files[0]);
            }}
          />
          <label htmlFor="upload-image">
            <LoadingButton
              disabled={isLoading}
              loadingIndicator={<CircularProgress color="inherit" size={50} />}
              loading={isLoading}
              variant="outlined"
              aria-label="upload"
              sx={{
                borderRadius: "50%",
                p: 2,
                width: 300,
                height: 300,
                mt: 10,
                border: 3,
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }}
              size="large"
              component="span"
            >
              <AddPhotoAlternateIcon fontSize="large" />
            </LoadingButton>
          </label>
          <Button
            size="large"
            disabled={isLoading}
            sx={{ fontSize: "20px", mt: 5 }}
            onClick={() => enqueueSnackbar("ddddd", { variant: "info" })}
          >
            Previous scans
          </Button>
        </Box>
      )}
    </Box>
  );
}
