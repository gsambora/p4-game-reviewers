import React, { useEffect, useState } from "react";
import { useFormik, resetForm } from "formik";
import * as yup from "yup";

function EditReviewText( {id, changeMode, handleChangeText, handleNewReview} ){
    const [errorMessage, setErrorMessage] = useState("")

    const formSchema = yup.object().shape({
        text: yup.string().max(500)
    });


    const formik = useFormik({
        initialValues: {
            text:"",
        },

        validationSchema: formSchema,
        
        onSubmit: (values) => {
            setErrorMessage("")
            fetch(`/reviews/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response)=>{
                if (response.ok) {
                    changeMode()
                    return response.json();
                } else {
                    throw new Error("Error with updated review");
                }
            }).then((r)=> {
                handleChangeText(formik.values.text);
                handleNewReview();
                formik.resetForm();
            }).catch((error)=> {
                console.error(error);
                setErrorMessage( "Error with updated review, please try again" )
            });
        }
    })

    return(
        <form onSubmit={formik.handleSubmit} style={{margin: "30px"}}>

            <label htmlFor="text">Review Text (Under 500 characters)</label>
            <input 
                id = "text"
                name = "text"
                onChange = {formik.handleChange}
                value = {formik.values.text}
            />
            <p style={{color:"red"}}>{formik.errors.text}</p>

            <button className="edit-submit" type="submit">Submit new review text</button>
        </form>

    )
}

export default EditReviewText;