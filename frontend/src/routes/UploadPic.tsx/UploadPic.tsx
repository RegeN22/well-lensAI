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

export default function NewScanPage(): JSX.Element {

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string>("");
  const [ingredients, setIngredients] = useState<ProductIngredientModel[]>([]);
  const [product, setProduct] = useState<ProductScanModel>();
  const [image, setImage] = useState<File>();

  const handleUploadClick = (file: File | undefined) => {
    setIsLoading(true);

    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl: string = URL.createObjectURL(file);
        // setImage(imageUrl);
        setImage(file);
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
      console.log(err);
      // enqueueSnackbar(.message, { variant: "error" });
    }

    console.log(scanResult);
    setIsLoading(false);

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
        mt: 10,
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
          }}
        >
          <ProductInfo
            grade={product?.rate}
            name={product?.name}
            overallAssessment={product?.text}
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
          }}
        >
          <Typography variant="body1" textAlign="center">
            Upload a picture of the ingredients on the back of your product
          </Typography>

          <input
            disabled={isLoading}
            accept="image/*"
            id="upload-image"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleUploadClick(e?.target?.files[0])}
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
            sx={{ fontSize: "20px", mt: 10 }}
          >
            Previous scans
          </Button>
        </Box>
      )}
    </Box>
  );
}
