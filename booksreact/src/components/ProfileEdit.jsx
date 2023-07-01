import React, { useContext, useState, useEffect } from "react";
import { Button, Form, NavLink } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";


export function ProfileEdit(prop) { 

    let {user} = prop
    let navigate = useNavigate();
    const [submitValues, setSubmitValues] = useState({})
    let DeleteAPIUrl = `http://127.0.0.1:8000/user/delete/${user.id}`
    const [formValues, setFormValues] = useState({
        "title": user.title,
        "bio": user.bio,
    });
    const [errors, setErrors] = useState({
        title: false,
    });

    const handleChange = (e) => {
        if (e.target.name == "profile_picture") {

            setSubmitValues({
                ...submitValues,
                [e.target.name]: e.target.files[0],
            });
        } 
        else {
            setSubmitValues({
            ...submitValues,
            [e.target.name]: e.target.value,
        });
        }
    }

    const deleteaccount = () =>{
        axios
        .delete(DeleteAPIUrl,
            {
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
            })
        .then(res => {
            console.log("deleted")
            navigate('/')
        })
        .catch(err => {
            console.log(err);
        });
    }

    console.log(submitValues)
    
    let formOperation = (e) => {
        e.preventDefault();
            axios
            .patch(`http://127.0.0.1:8000/user/update/${user.id}`, submitValues,
            {
                headers: 
                {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then((response) => {
                console.log("done!");
                console.log(response)
                navigate(`/profile/${user.id}`)
            })
            .catch(err => {
                console.log("error")
                console.log(err);
            });
        };

    let clearformvalues = () => {
        setFormValues({
            "title": "",
            "bio": "",
            "profile_picture": null,
        });
    };

    
    return (
        <div className="container">  

            <Form className="" onSubmit={formOperation} encType="multipart/form-data">

                {/* title form */}
                <Form.Group className="mb-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    required
                    defaultValue={formValues.title}
                    onChange={handleChange}
                />
                {errors.title && (
                    <div className="text-danger">
                    Title should start with a letter!!
                    </div>
                )}
                </Form.Group>

                {/* bio form */}
                <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    name="bio"
                    rows={3}
                    placeholder="Bio"
                    defaultValue={formValues.bio}
                    onChange={handleChange}
                />
                </Form.Group>

                {/* image */}
                <Form.Group className="mb-3">
                <Form.Label>Images</Form.Label>
                <div className="d-flex align-items-center">
                    <div className="w-100">
                    <Form.Control
                        type="file"
                        name="profile_picture"
                        placeholder="Book Cover"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={handleChange}
                    />
                    </div>
                </div>
                </Form.Group>

                <div className="d-flex justify-content-around">
                    <div>
                        <Button variant="success" type="submit">
                            Save Profile
                        </Button>
                    </div>

                    <div>
                        <Button variant="secondary" onClick={clearformvalues}>
                            Clear Form
                        </Button>
                    </div>

                    <div>
                        <Button variant="danger" onClick={deleteaccount}>
                            Delete Profile
                        </Button>
                    </div>
                </div>

            </Form>

        </div>
        )

}