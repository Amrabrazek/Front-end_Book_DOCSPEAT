import React, { useContext, useState, useEffect } from "react";
import { Button, Form, NavLink } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../context";
import { useNavigate, useParams } from "react-router-dom";


export function Addbook() { 
    const author_id =  useContext(UserContext)[0]
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString();
    const formattedDate = isoDateString.substring(0, 10);
    console.log(formattedDate)
    let navigate = useNavigate();

    let [formvalues, setFormvalues] = useState({
        "title": "",
        "summary": "",
        "book_cover": null,
        "author": author_id,
    });

    const [errors, setErrors] = useState({
        title: false,
    });
        

    const handleChange = (e) => {
        if (e.target.name == "book_cover") {
            console.log(e.target.name)
            console.log(e.target.files[0])
            setFormvalues({
                ...formvalues,
                [e.target.name]: e.target.files[0],
    
            });
        } 
        else {
        setFormvalues({
            "author": author_id[0],
            ...formvalues,
            [e.target.name]: e.target.value,
        });
        }
    }

    console.log(formvalues)
    
    let formOperation = (e) => {
        e.preventDefault();
            console.log(formvalues)
            axios
            .post(`http://127.0.0.1:8000/book/create`, formvalues,
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
        setFormvalues({
            "title": "",
            "summary": "",
            "author": author_id,
            "publication_date": formattedDate,
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
                    defaultValue={formvalues.title}
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
                    rows={4}
                    placeholder="summary"
                    defaultValue={formvalues.summary}
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
                        defaultValue={formvalues.book_cover}
                        onChange={handleChange}
                    />
                    </div>
                </div>
                </Form.Group>

                <div className="d-flex justify-content-around">
                    
                    <div>
                        <Button variant="success" type="submit">
                            Add Book
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