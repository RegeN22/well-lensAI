import { Box, Stack, SxProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScanDataListItem from "../../features/product-scan/ScanDataListItem/ScanDataListItem";
import UserSummaryCard from "../../features/user-profile/UserSummaryCard/UserSummaryCard";
import { HistoryProductModel } from "../../models/product-scan.model";
import { getAllScans } from "../../services/scan-service";
import NewScanPage from "../NewScanPage/NewScanPage";

const fabStyle: SxProps = {
  position: "fixed",
  bottom: 16,
  right: 16,
  display: { xs: "block", md: "none" },
};

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
    getAllScans().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "center", md: "start" }}
      sx={{ height: "100vh" }}
    >
      <Box sx={{ height: "100%", overflowY: { xs: "none", md: "auto" } }}>
        <Stack
          sx={{ padding: "1em", maxWidth: "30em" }}
          spacing={1}
          direction="column"
        >
          <Box sx={{ paddingBottom: "1em" }}>
            <UserSummaryCard isInteractive={true} />
          </Box>
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
      {/* <Fab color="secondary" sx={fabStyle} onClick={() => navigate('/new')}>
        <AddAPhotoIcon />
      </Fab> */}
      <Stack sx={{ display: { xs: "none", md: "block" }, flex: 1 }}>
        <NewScanPage />
      </Stack>
    </Stack>
  );
}
