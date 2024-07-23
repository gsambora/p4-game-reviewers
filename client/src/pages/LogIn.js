import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function LogIn( {onLogin, userStatus} ){
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username"),
        pfp_img_url: yup.string(),
        bio: yup.string().max(300)
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            pfp_img_url: "",
            bio: "",
            
        },

        validationSchema: formSchema,
        
        onSubmit: (values) => {
            fetch("/login", {
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
            <h1>{userStatus ? "Log in successful!" : "Please Log in"}</h1>
            <form onSubmit={formik.handleSubmit} >
                <label htmlFor="username">Username</label>
                <input 
                    id = "username"
                    username = "username"
                    onChange = {formik.handleChange}
                    value = {formik.values.name}
                />
                <p style={{color:"red"}}>{formik.errors.username}</p>
            </form>

        </div>
    )
}

export default LogIn;