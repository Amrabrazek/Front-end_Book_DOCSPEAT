import React, { useContext, useState, useEffect } from "react";
import { Button, Form, NavLink } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";

export function Editpage(prop) { 

    let {page} = prop
    const author_id =  useContext(UserContext)[0]
    const DeleteAPIUrl = `http://127.0.0.1:8000/page/delete/${page.id}`
    const [formValues, setFormValues] = useState({
        "content": page.content,
    });
    const [submitValues, setSubmitValues] = useState({})
    const [errors, setErrors] = useState({
        title: false,
    });
    let navigate = useNavigate();

    const handleChange = (e) => {
 
        setSubmitValues({
        ...submitValues,
        [e.target.name]: e.target.value,
        });
    }


    console.log(submitValues)
    
    let formOperation = (e) => {
        e.preventDefault();
            axios
            .patch(`http://127.0.0.1:8000/page/update/${page.id}`, submitValues,
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
                navigate(`/page/view/${page.book.id}`)
            })
            .catch(err => {
                console.log("error")
                console.log(err);
            });
        };

    // let clearformvalues = () => {
    //     setFormValues({
    //         "content": "",
    //     });
    // };

    
    return (
        <div className="container">  

            <Form className="" onSubmit={formOperation} encType="multipart/form-data">


                {/* summary form */}
                <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    name="content"
                    rows={5}
                    placeholder="Content"
                    defaultValue={formValues.content}
                    onChange={handleChange}
                />
                </Form.Group>


                <div className="d-flex justify-content-around">
                    
                    <div>
                        <Button variant="success" type="submit">
                            Save Page
                        </Button>
                    </div>

                    {/* <div>
                        <Button variant="secondary" onClick={clearformvalues}>
                            Clear Page
                        </Button>
                    </div> */}


                </div>
            </Form>

        </div>
        )

}