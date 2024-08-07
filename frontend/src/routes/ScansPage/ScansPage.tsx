import { Fab, Stack, SxProps } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ProductFromHistoryModel, ProductScanModel, historyProductModel } from "../../models/product-scan.model";
import { useNavigate } from "react-router-dom";
import ScanDataListItem from "../../features/product-scan/ScanDataListItem/ScanDataListItem";
import apiClient from "../../services/api-client";
import { useState,useEffect } from "react";
import "./scan-page.css"
import { motion } from "framer-motion"

const fabStyle: SxProps = {
  position: 'fixed',
  bottom: 16,
  right: 16,
};

export default function ScansPage(): JSX.Element {
  const navigate = useNavigate();
  const [products,setProducts] = useState<historyProductModel[]>();

  useEffect(()=>{
    apiClient.get("/history").then(res => {
      let data : historyProductModel[] = res.data.map((obj:ProductFromHistoryModel) => {
        let newJsonData: ProductScanModel = JSON.parse(JSON.stringify(obj.jsonData));
        const binaryString = window.atob(obj.image.buffer);
        const arrayBuffer = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          arrayBuffer[i] = binaryString.charCodeAt(i);  
        }

        let blob = new Blob([arrayBuffer], {type: obj.image.mimetype});

        let newData: historyProductModel = {
          image : URL.createObjectURL(blob),
          jsonData : newJsonData
        }

        return newData;
      })

      console.log(data)
      setProducts(data)
    })
  },[])
  
  return (
    <motion.div       
    variants={{   
      initial: {
      y: "100vh",
    },
    animate: {
      y: 0,
      transition: {
        duration: 1, // Adjust duration as needed
      },
    },
    exit: {
      x: '-100vw', // Swipe out to the left
      transition: {
        duration: 0.5,
      },
    }}}
    initial="initial"
    animate="animate"
    exit="exit"
    >
      <div className="main-flex">
      <Stack sx={{margin: "1em"}} spacing={1} className="history-products">
        {products ? products?.map((product: historyProductModel) => (
          <ScanDataListItem productImage={product?.image} product={JSON.parse(String(product?.jsonData))} />
          ))
          : <div>Begin Searching!</div>
        }
        <Fab color="secondary" sx={fabStyle} onClick={() => navigate('new')}>
          <AddAPhotoIcon />
        </Fab>
      </Stack>
        <div className="nav-bar">
          <div>Welcome Back, user!</div>
          <button>My Account</button>
          <button>Settings</button>
        </div>
    </div>
    </motion.div>
  );
}
