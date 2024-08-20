import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScanDataListItem from "../../features/product-scan/ScanDataListItem/ScanDataListItem";
import { HistoryProductModel } from "../../models/product-scan.model";
import { getUserScans } from "../../services/scan-service";
import NewScanPage from "../NewScanPage/NewScanPage";


export default function ScansPage(): JSX.Element {
  const navigate = useNavigate();
  const [products, setProducts] = useState<HistoryProductModel[]>();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    getUserScans().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "center", md: "start" }}
    >
      <Box sx={{ height: "100%", overflowY: { xs: "none", md: "auto" } }}>
        <Stack
          sx={{ padding: "1em", maxWidth: "30em" }}
          spacing={1}
          direction="column"
        >
          <Typography variant="h5">Products</Typography>
          {products ? (
            products?.map((product: HistoryProductModel) => (
              <ScanDataListItem
                productImage={product?.image}
                product={product?.jsonData}
              />
            ))
          ) : (
            <Typography variant="h6">Begin Searching!</Typography>
          )}
        </Stack>
      </Box>
      <Stack sx={{ display: { xs: "none", md: "block" }, flex: 1 }}>
        <NewScanPage />
      </Stack>
    </Stack>
  );
}
