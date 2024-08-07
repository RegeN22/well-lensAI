import { Box, Fab, Stack, SxProps, Typography } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ProductFromHistoryModel, HistoryProductModel } from "../../models/product-scan.model";
import { useNavigate } from "react-router-dom";
import ScanDataListItem from "../../features/product-scan/ScanDataListItem/ScanDataListItem";
import apiClient from "../../services/api-client";
import { useState, useEffect } from "react";
import NewScanPage from "../NewScanPage/NewScanPage";

const fabStyle: SxProps = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  display: { xs: 'block', md: 'none' }
};

export default function ScansPage(): JSX.Element {
  const navigate = useNavigate();
  const [products, setProducts] = useState<HistoryProductModel[]>();

  useEffect(() => {
    apiClient.get("/history").then(res => {
      const data: HistoryProductModel[] = res.data.map((obj: ProductFromHistoryModel) => {
        const binaryString = window.atob(obj.image.buffer);
        const arrayBuffer = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          arrayBuffer[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: obj.image.mimetype });

        const newData: HistoryProductModel = {
          image: URL.createObjectURL(blob),
          jsonData: obj.jsonData
        }

        return newData;
      })

      setProducts(data);
    })
  }, [])

  return (
    <Stack direction={{ xs: "column", md: 'row' }} alignItems={{ xs: "center", md: 'start' }} sx={{ height: "100vh" }}>
      <Box sx={{ height: "100%", overflowY: {xs: 'none', md: 'auto'} }}>
        <Stack sx={{ padding: "1em", maxWidth: "30em" }} spacing={1} direction="column">
          <Typography variant="h4">Previous searches</Typography>
          {products ? products?.map((product: HistoryProductModel) => (
            <ScanDataListItem productImage={product?.image} product={product?.jsonData} />
          ))
            : <Typography variant="h4">Begin Searching!</Typography>
          }
        </Stack>
      </Box>
      <Fab color="secondary" sx={fabStyle} onClick={() => navigate('new')}>
        <AddAPhotoIcon />
      </Fab>
      <Stack sx={{ display: { xs: 'none', md: 'block' }, flex: 1 }}>
        <NewScanPage />
      </Stack>
    </Stack>
  );
}
