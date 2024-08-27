import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScanDataListItem from "../../features/product-scan/ScanDataListItem/ScanDataListItem";
import { HistoryProductModel } from "../../models/product-scan.model";
import { getUserScans } from "../../services/scan-service";
import NewScanPage from "../NewScanPage/NewScanPage";
import ImageSearchTwoToneIcon from '@mui/icons-material/ImageSearchTwoTone';

export default function ScansPage(): JSX.Element {
  const navigate = useNavigate();
  const [products, setProducts] = useState<HistoryProductModel[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    setIsLoading(true);
    getUserScans().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Stack
      direction="column"
      alignItems="center"
    >
      <Box sx={{ height: "100%", overflowY: "none" }}>
        <Stack
          sx={{ padding: "1em", maxWidth: "30em", marginBottom: '5em' }}
          spacing={2}
          direction="column"
          alignItems='center'
        >
          <Typography variant="h4">Your Product Scans</Typography>
          {products?.length ? (
            products?.map((product: HistoryProductModel) => (
              <ScanDataListItem
                key={product.image}
                productImage={product?.image}
                product={product?.jsonData}
              />
            ))
          ) : (
            isLoading ? <CircularProgress size={50} /> :
            <Stack alignItems='center' spacing={3} sx={{ paddingTop: '10em' }}>
              <ImageSearchTwoToneIcon sx={{ fontSize: 100 }} />
              <Typography variant="subtitle1">Oops! Looks like you didn't scan anything yet!</Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/new-scan')}>
                Begin Scanning
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
