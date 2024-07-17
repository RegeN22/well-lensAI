import React, { useState } from "react";
import { Ingredients, ingredient } from "./IngridientsPage/Ingredients.tsx";
import PictureUpload from "./PictureUpload/PictureUpload.tsx";
import { ProductDescription } from "./IngridientsPage/ProductDescription.tsx";
import "./IngridientsPage/ingredients-page.css"
import { Snackbar } from "@mui/material";

type dataType = ingredient & {
  ingredients: ingredient[]
}

function App() {

  const [isLoading,setIsLoading] = useState(false);
  const [hasError,setHasError] = useState<boolean>(false);
  const [ingredients,setIngredients] = useState<ingredient[]>([]);
  const [currentItem,setCurrentItem] = useState<ingredient>();

  const uploadPicture = async (picture: File) => {
      const formData = new FormData();
      formData.append('file', picture);

      setIsLoading(true);
      setHasError(false)

      let result = await fetch("http://localhost:3000/api/v1/scan",{
        method:"POST",
        body: formData,
      })

      let data :dataType | null = null;

      try {
        data = await result.json();
      } catch {
        setHasError(true)
      }
      
      setIsLoading(false);

      if (!data || !data.ingredients|| !data.rate || !data.name || !data.text) {
        setHasError(true)
        // TODO maybe create a function that tries it again or asks the user if they want to try again
      } else {
        setIngredients(data.ingredients)
        setCurrentItem({
          name: data.name,
          rate: data.rate,
          text: data.text
        })
      }
  }

  return (
      <>
        <ProductDescription grade={currentItem?.rate} name={currentItem?.name} overallAssessment={currentItem?.text} ></ProductDescription>
        <div className="main-flex">
          <Ingredients ingredients={ingredients}/>
          <PictureUpload onUpload={uploadPicture} />
          <Snackbar
            open={isLoading}
            message="Loading..."
            key={"bottom_" + "left"}
          />
          <Snackbar
            open={hasError}
            message="AN ERROR HAS OCCURED! try again later."
            key={"bottom" + "left"}
          />
        </div>
      </>
  );
}

export default App;
