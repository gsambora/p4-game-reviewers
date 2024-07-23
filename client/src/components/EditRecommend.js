import React, { useEffect, useState } from "react";
import { useFormik, resetForm } from "formik";
import * as yup from "yup";

function EditRecommend( {id, changeMode, handleChangeRec, handleNewReview} ){
    const [errorMessage, setErrorMessage] = useState("")

    const formSchema = yup.object().shape({
        recommend: yup.string().oneOf(["Y", "N"]).required("Must choose Y or N"),
    });


    const formik = useFormik({
        initialValues: {
            recommend:"",
        },

        validationSchema: formSchema,
        
        onSubmit: (values) => {
            setErrorMessage("")
            fetch(`reviews/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response)=>{
                if (response.ok) {
                    changeMode()
                    handleChangeRec()
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

        <form onSubmit={formik.handleSubmit} style={{margin: "30px"}}>
            <input 
                id = "recommend"
                name = "recommend"
                onChange = {formik.handleChange}
                value = {formik.values.recommend}
            />
            <p style={{color:"red"}}>{formik.errors.recommend}</p>
            <button className="edit-submit" type="submit">Submit edited recommendation</button>
        </form>


    )
}

export default EditRecommend;