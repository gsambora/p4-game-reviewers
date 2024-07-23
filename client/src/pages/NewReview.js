import React, { useEffect, useState } from "react";
import { useFormik, resetForm } from "formik";
import * as yup from "yup";

function NewReview( {userStatus} ){
    const [errorMessage, setErrorMessage] = useState("")

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username"),
    });


    const formik = useFormik({
        initialValues: {
            username: "",
        },

        validationSchema: formSchema,
        
        onSubmit: (values) => {
            setErrorMessage("")
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response)=>{
                if (response.ok) {
                    return response.json();
                } else if (response.status === 404){
                    setErrorMessage("User not found, please sign up instead.")
                    throw new Error("User not found, please sign up.");
                } else {
                    throw new Error("Error with login");
                }
            }).then((user)=> {
                formik.resetForm();
            }).catch((error)=> {
                console.error(error);
                setErrorMessage( "Error with log in, please try again" )
            });
        }
    })

    return(
        <div className="login-form">
            <h2 style={{paddingTop: "20px"}}>{userStatus ? "" : "Please log in before writing a review!"}</h2>
            <h3 style={{color:"red"}}>{errorMessage}</h3>
            <form onSubmit={formik.handleSubmit} style={{margin: "30px"}}>
                <label htmlFor="username">Username</label>
                <input 
                    id = "username"
                    username = "username"
                    onChange = {formik.handleChange}
                    value = {formik.values.username}
                />
                <p style={{color:"red"}}>{formik.errors.username}</p>

                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default NewReview;