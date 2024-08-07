import { ProductFromHistoryModel, ProductScanModel, historyProductModel } from "../../models";
import apiClient from "../../services/api-client";

export const getAllHistory = () => {
    let data = apiClient.get("/history").then(res => {
        let data : historyProductModel[] = res.data.map((obj:ProductFromHistoryModel) => {
          let newJsonData = JSON.parse(JSON.stringify(obj.jsonData));
          let formattedJsonData: ProductScanModel = {_id : newJsonData.id,...newJsonData};
          const binaryString = window.atob(obj.image.buffer);
          const arrayBuffer = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            arrayBuffer[i] = binaryString.charCodeAt(i);  
          }
    
          let blob = new Blob([arrayBuffer], {type: obj.image.mimetype});
    
          let newData: historyProductModel = {
            image : URL.createObjectURL(blob),
            jsonData : formattedJsonData
          }

          console.log(formattedJsonData)
    
          return newData;
        })
        
        return data;
      })

      return data;
}