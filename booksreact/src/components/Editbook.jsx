import React, { useContext, useState, useEffect } from "react";
import { Button, Form, NavLink } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../context";
import { useNavigate, useParams } from "react-router-dom";


export function Editbook(prop) { 

    let {book} = prop
    const author_id =  useContext(UserContext)[0]
    const [formValues, setFormValues] = useState({
        "title": book.title,
        "summary": book.summary,
    });
    const [submitValues, setSubmitValues] = useState({
        "author": author_id,
    })
    const [errors, setErrors] = useState({
        title: false,
    });

    let navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name == "book_cover") {
            console.log(e.target.name)
            console.log(e.target.files[0])
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

    console.log(submitValues)
    
    let formOperation = (e) => {
        e.preventDefault();
            axios
            .patch(`http://127.0.0.1:8000/book/update/${book.id}`, submitValues,
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
                navigate("/")
            })
            .catch(err => {
                console.log("error")
                console.log(err);
            });
        };

    let clearformvalues = () => {
        setFormValues({
            "title": "",
            "summary": "",
            "author": author_id,
            "book_cover": null,
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

                {/* summary form */}
                <Form.Group className="mb-3">
                <Form.Label>Summary</Form.Label>
                <Form.Control
                    as="textarea"
                    name="summary"
                    rows={2}
                    placeholder="summary"
                    defaultValue={formValues.summary}
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
                        name="book_cover"
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
                            Edit Book
                        </Button>
                    </div>

                    <div>
                        <Button variant="secondary" onClick={clearformvalues}>
                        Clear Form
                        </Button>
                    </div>

                </div>
            </Form>

        </div>
        )

}