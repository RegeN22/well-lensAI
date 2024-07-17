import React from "react"
import { Grade } from "./Grade.tsx"
import { ProgressBar } from "./ProgressBar.tsx";

interface ProductDescriptionProps {
    grade?: number,
    name?:string,
    overallAssessment?: string
}


 
export const ProductDescription = ({grade=0,name = "The Product's name",overallAssessment = "overall"} : ProductDescriptionProps) => {
    return (
        <div className="product-flex">
            <div className="highlighted-text title">
                {name}
            </div>
        
            <div className="highlighted-text subtitle">
                {overallAssessment}
            </div>
            <Grade grade={grade} className="rating"/>
        </div>
    )
}