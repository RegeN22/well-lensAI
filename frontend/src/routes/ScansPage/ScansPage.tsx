import { Fab, Stack, SxProps } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ProductScanModel } from "../../models/product-scan.model";
import { useNavigate } from "react-router-dom";
import ScanDataListItem from "../../features/product-scan/ScanDataListItem/ScanDataListItem";

const fabStyle: SxProps = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

export default function ScansPage(): JSX.Element {
  const navigate = useNavigate();
  //TODO load history of scans
  const products: ProductScanModel[] = [
    {name: 'bla bla', rate: 9, text: 'very good', ingredients: []},
    {name: 'bla bla bla', rate: 4, text: 'not good', ingredients: []}
  ];

  return (
    <Stack sx={{margin: "1em"}} spacing={1}>
      {products.map((product: ProductScanModel) => (<ScanDataListItem product={product} />))}
      <Fab color="secondary" sx={fabStyle} onClick={() => navigate('new')}>
        <AddAPhotoIcon />
      </Fab>
    </Stack>
  );
}
