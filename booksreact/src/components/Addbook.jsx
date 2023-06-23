import React, { useContext, useState, useEffect } from "react";
import { Button, Form, NavLink } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../context";
import { useNavigate, useParams } from "react-router-dom";


export function Addbook() { 
    const author_id =  useContext(UserContext) 
    
    // getting today's date 
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString();
    const formattedDate = isoDateString.substring(0, 10);
    console.log(formattedDate)

    let [formvalues, setFormvalues] = useState({
        "title": "",
        "summary": "",
        "author": author_id,
        "publication_date": formattedDate,
        "book_cover": null,
        });

        const [errors, setErrors] = useState({
            title: false,
        });
        
        let navigate = useNavigate();
        

    const handleChange = (event) => {
        setFormvalues({
            ...formvalues,
            [event.target.name]: event.target.value,
        });
    }

    console.log(formvalues)
    

    // let fakevalues =  {
    //     "title": "amoora2",
    //     "summary": "xx",
    //     "book_cover": null,
    //     "publication_date": formattedDate,
    //     "author": 1
    // }
    // console.log("0000000000000000000000000000000")
    // console.log(fakevalues)

    let formOperation = (e) => {
        e.preventDefault();
            axios
            .post(`http://127.0.0.1:8000/api/book/`, formvalues)
            .then((response) => {
                console.log("done!");
                navigate(`/author/home/${author_id}`);
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

            <Form className="" onSubmit={formOperation}>

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
                    rows={2}
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
                        placeholder="book_cover"
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