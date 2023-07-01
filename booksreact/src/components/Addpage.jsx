import React, { useContext, useState, useEffect } from "react";
import { Button, Form, NavLink } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../context";
import { useNavigate, useParams } from "react-router-dom";


export function Addpage(prop) { 

    const {book_id} = prop
    const {page_number} = prop

    const author_id =  useContext(UserContext)[0]
    let navigate = useNavigate();

    let [formvalues, setFormvalues] = useState({
        "content": "",
        "page_number": page_number,
        "book": book_id,
    });

    const [errors, setErrors] = useState({
        title: false,
    });
        

    console.log(formvalues)
    
    let formOperation = (e) => {
        e.preventDefault();
            console.log(formvalues)
            axios
            .post(`http://127.0.0.1:8000/page/create`, formvalues,
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then((response) => {
                console.log("done!");
                console.log(response)
                window.location.reload();
                
                // navigate("/")

            })
            .catch(err => {
                console.log("error")
                console.log(err);
            });
        };


    
    return (
        <div className="container">  

            <Form className="" onSubmit={formOperation} >

                {/* title form */}

                {/* summary form */}
                <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    name="content"
                    rows={5}
                    placeholder="Content"
                    defaultValue={formvalues.summary}
                    onChange={(e) => {
                        setFormvalues({
                            ...formvalues,
                            [e.target.name]: e.target.value,
                        });
                    }}
                />
                </Form.Group>



                <div className="d-flex justify-content-around">
                    
                    <div>
                        <Button className="m-5" variant="success" type="submit">
                            Save Page
                        </Button>
                    </div>

                </div>
            </Form>

        </div>
        )

}