import React, { useEffect, useState } from "react";
import { useFormik, resetForm } from "formik";
import * as yup from "yup";

function NewGame( {handleNewReview, userStatus} ){
    const [errorMessage, setErrorMessage] = useState("")

    const formSchema = yup.object().shape({
        gametitle: yup.string().required("Must enter game title"),
        coverart: yup.string(),
        genre: yup.string()
    });


    const formik = useFormik({
        initialValues: {
            gametitle:"",
            coverart:"",
            genre:"",
        },

        validationSchema: formSchema,
        
        onSubmit: (values) => {
            setErrorMessage("")
            fetch("/newgame", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response)=>{
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error with game");
                }
            }).then((r)=> {
                formik.resetForm();
            }).catch((error)=> {
                console.error(error);
                setErrorMessage( "Error with game, please try again" )
            });
        }
    })

    return(
        <div className="login-form">
            <h2 style={{paddingTop: "20px"}}>{userStatus ? "Submit a new game:" : "Please log in before submitting a new game!"}</h2>
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

                <label htmlFor="coverart">Cover Art URL</label>
                <input 
                    id = "coverart"
                    name = "coverart"
                    onChange = {formik.handleChange}
                    value = {formik.values.coverart}
                />
                <p style={{color:"red"}}>{formik.errors.coverartd}</p>

                <label htmlFor="genre">Game Genre</label>
                <input 
                    id = "genre"
                    name = "genre"
                    onChange = {formik.handleChange}
                    value = {formik.values.genre}
                />
                <p style={{color:"red"}}>{formik.errors.genre}</p>

                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default NewGame;