import { Card, CardHeader, Paper, Stack, Typography, styled } from "@mui/material";
import { ProductScanModel } from "../../../models/product-scan.model";
import { Grade } from "../Grade/Grade";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react"
import "./scan-item.css"
interface Props {
  product: ProductScanModel;
  productImage: string
  onSelect?: () => void;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ScanDataListItem({ product, productImage, onSelect }: Props): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardHeader
        avatar={
          <Grade grade={product.rate} size={60} />
        }
        title={product.name}
        subheader={`Contains ${product.ingredients.length} ingredients`}
      />
      <CardMedia
        component="img"
        height="200"
        className="card-image"
        image={productImage}
        alt="Product Image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={() => setExpanded(curr => !curr)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle1">Ingredients:</Typography>
          <Stack spacing={1}>
            {product.ingredients.map(ingredient => {
              return <Stack direction="row" alignItems="center" spacing={1}>
                <Grade size={50} grade={ingredient.rate} />
                <Stack>
                <Typography variant="body1">
                  {ingredient.name}
                </Typography>
                <Typography variant="body2" color='text.secondary'>{ingredient.text}</Typography>
                </Stack>
              </Stack>
            })}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}