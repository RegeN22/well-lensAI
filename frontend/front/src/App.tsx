import React, { useState,useCallback } from "react";
import { Ingredients, ingredient } from "./IngridientsPage/Ingredients.tsx";
import PictureUpload from "./PictureUpload/PictureUpload.tsx";
import { ProductDescription } from "./IngridientsPage/ProductDescription.tsx";
import "./IngridientsPage/ingredients-page.css";
import { Snackbar } from "@mui/material";

type dataType = ingredient & {
  ingredients: ingredient[];
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string>("");
  const [ingredients, setIngredients] = useState<ingredient[]>([]);
  const [currentItem, setCurrentItem] = useState<ingredient>();

  const uploadPicture = async (picture: File) => {
    const formData = new FormData();
    formData.append("file", picture);

    setIsLoading(true);
    setLoadingError("");

    let data: dataType | null = null;
    try {
      const result = await fetch("http://localhost:3000/api/v1/scan", {
        method: "POST",
        body: formData,
      });
      data = await result.json();
    } catch (err) {
      setLoadingError(err.message);
    }

    setIsLoading(false);

    if (!data || !data.ingredients || !data.rate || !data.name || !data.text) {
      setLoadingError("Incomplete response.");
      // TODO maybe create a function that tries it again or asks the user if they want to try again
    } else {
      saveToHistory(data,formData);
      setIngredients(data.ingredients);
      setCurrentItem({
        name: data.name,
        rate: data.rate,
        text: data.text,
      });
    }
  };

  const saveToHistory = useCallback(async (data:dataType, image: FormData) => {
    await fetch("http://localhost:3000/api/v1/history", {
      method:"POST",
      body: JSON.stringify({
        userId: "123",//TODO
        image:image,
        jsonData:data
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  },[])

  return (
    <>
      <ProductDescription
        grade={currentItem?.rate}
        name={currentItem?.name}
        overallAssessment={currentItem?.text}
      ></ProductDescription>
      <div className="main-flex">
        <Ingredients ingredients={ingredients} />
        <PictureUpload onUpload={uploadPicture} />
        <Snackbar
          open={isLoading}
          message="Loading..."
          key={"bottom_" + "left"}
        />
        <Snackbar
          open={loadingError !== ""}
          message={"AN ERROR HAS OCCURED! Try again later. " + loadingError}
          key={"bottom" + "left"}
        />
      </div>
    </>
  );
}

export default App;
