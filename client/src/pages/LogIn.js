import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function LogIn( {onLogin, userStatus} ){
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
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response)=>{
                if (response.ok) {
                    return response.json();
                }
            }).then((user)=> {
                onLogin(user);
            }).catch((error)=> {
                console.error(error);
            });
        }
    })

    return(
        <div>
            <h1>{userStatus ? "Sign up successful! Now logged in." : "Sign up below"}</h1>
            <form onSubmit={formik.handleSubmit} style={{margin: "30px"}}>
                <label htmlFor="username">Username</label>
                <input 
                    id = "username"
                    username = "username"
                    onChange = {formik.handleChange}
                    value = {formik.values.name}
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

                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default LogIn;