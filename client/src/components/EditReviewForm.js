import React, { useEffect, useState } from "react";
import { useFormik, resetForm } from "formik";
import * as yup from "yup";

function EditReviewForm( {id, handleNewReview, userStatus} ){
    const [errorMessage, setErrorMessage] = useState("")

    const formSchema = yup.object().shape({
        recommend: yup.string().oneOf(["Y", "N"]).required("Must choose Y or N"),
        text: yup.string().max(500)
    });


    const formik = useFormik({
        initialValues: {
            recommend:"",
            text:"",
        },

        validationSchema: formSchema,
        
        onSubmit: (values) => {
            setErrorMessage("")
            fetch(`/review/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response)=>{
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error with updated review");
                }
            }).then((r)=> {
                handleNewReview();
                formik.resetForm();
            }).catch((error)=> {
                console.error(error);
                setErrorMessage( "Error with updated review, please try again" )
            });
        }
    })

    return(
        <div className="review-form">
            <h2 style={{paddingTop: "20px"}}>Enter your updated review:</h2>
            <h3 style={{color:"red"}}>{errorMessage}</h3>
            <form onSubmit={formik.handleSubmit} style={{margin: "30px"}}>
                <label htmlFor="gametitle">Game Title</label>
                <input 
                    id = "gametitle"
                    name = "gametitle"
                    onChange = {formik.handleChange}
                    value = {formik.values.gametitle}
                />
                <p style={{color:"red"}}>{formik.errors.gametitle}</p>

                <label htmlFor="recommend">Do you recommend the game? Y or N</label>
                <input 
                    id = "recommend"
                    name = "recommend"
                    onChange = {formik.handleChange}
                    value = {formik.values.recommend}
                />
                <p style={{color:"red"}}>{formik.errors.recommend}</p>

                <label htmlFor="text">Review Text (Under 500 characters)</label>
                <input 
                    id = "text"
                    name = "text"
                    onChange = {formik.handleChange}
                    value = {formik.values.text}
                />
                <p style={{color:"red"}}>{formik.errors.text}</p>

                <button className="edit-submit" type="submit">Submit</button>
            </form>

        </div>
    )
}

export default EditReviewForm;