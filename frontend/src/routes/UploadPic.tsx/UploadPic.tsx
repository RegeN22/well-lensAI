import {
  Button,
  CircularProgress,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  ProductIngredientModel,
  ProductScanModel,
} from "../../models/product-scan.model";
import { scan } from "../../services/scan-service";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { ProductInfo } from "./ProductInfo";
import { ProductIngridients } from "./ProductIngridients";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

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

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl: string = URL.createObjectURL(file);
        setImage(imageUrl);
        uploadPicture(file);
      };
      reader.readAsDataURL(file);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const uploadPicture = async (picture: File) => {
    let scanResult: ProductScanModel | null = null;

    try {
      scanResult = await scan(picture);
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
    }
  };

  return (
    <Stack direction='column' alignItems='center' sx={{ padding: '1em' }}>
      {product ? (
        <Stack sx={{ marginBottom: '5em', maxWidth: '30em' }} spacing={3}>
          <ProductInfo
            grade={product?.rate}
            name={product?.name}
            overallAssessment={product?.text}
            image={image}
          />
          <ProductIngridients ingredients={ingredients} />
          <Fab
            color="primary"
            sx={{ position: 'fixed', bottom: '64px', right: '16px' }}
            onClick={() => setProduct(undefined)}>
            <AddPhotoAlternateIcon />
          </Fab>
        </Stack>
      ) : (
        <Stack alignItems='center' justifyContent='center'>
          <Typography
            variant="h4"
            textAlign="center"
          >Scan Product</Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="text.secondary"
          >Upload a picture of the ingredients on the back of your product</Typography>
          <input
            disabled={isLoading}
            accept="image/*"
            id="upload-image"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              handleUploadClick(e?.target?.files?.[0]);
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
        </Stack>
      )}
    </Stack>
  );
}
