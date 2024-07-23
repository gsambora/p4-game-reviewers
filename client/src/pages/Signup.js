import React, { useEffect, useState } from "react";
import { useFormik, resetForm } from "formik";
import * as yup from "yup";

function Signup( {onSignup, userStatus} ){
    const [errorMessage, setErrorMessage] = useState("")

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username"),
        pfp_image_url: yup.string(),
        bio: yup.string().max(300)
    });


    const formik = useFormik({
        initialValues: {
            username: "",
            pfp_image_url: "",
            bio: "",
            
        },

        validationSchema: formSchema,
        
        onSubmit: (values) => {
            setErrorMessage("")
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response)=>{
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error with sign up");
                }
            }).then((user)=> {
                onSignup(user);
                formik.resetForm();
            }).catch((error)=> {
                console.error(error);
                setErrorMessage( "Error with sign up, please try again" )
            });
        }
    })

    return(
        <div className="login-form">
            <h2 style={{paddingTop: "20px"}}>{userStatus ? "Sign up successful! Now logged in." : "Sign up below:"}</h2>
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

                <label htmlFor="pfp_image_url">Profile Picture URL</label>
                <input 
                    id = "pfp_image_url"
                    pfp_image_url = "pfp_image_url"
                    onChange = {formik.handleChange}
                    value = {formik.values.pfp_image_url}    
                />
                <p style={{color:"red"}}>{formik.errors.pfp_img_url}</p>

                <label htmlFor="bio">Bio (under 300 characters)</label>
                <input
                    id = "bio"
                    bio = "bio"
                    onChange = {formik.handleChange}
                    value = {formik.values.bio}
                />
                <p style={{color:"red"}}>{formik.errors.bio}</p>

                <button className="edit-submit" type="submit">Submit</button>
            </form>

        </div>
    )
}

export default Signup;