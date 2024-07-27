import { Paper, Stack, Typography } from "@mui/material";
import { ProductScanModel } from "../../../models/product-scan.model";
import { Grade } from "../Grade/Grade";

interface Props {
  product: ProductScanModel;
  onSelect?: () => void;
}

export default function ScanDataListItem({product, onSelect}: Props): JSX.Element {
  return (
    <Paper sx={{padding: "0.25em"}} onClick={() => onSelect && onSelect()}>
      <Stack direction={"row"} spacing={2}>
        <Grade grade={product.rate}/>
        <Stack direction={"column"}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="subtitle1">{product.text}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}