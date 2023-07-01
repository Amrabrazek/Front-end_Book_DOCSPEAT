import React, { useContext } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { TypeContext} from '../context'
import { Button, NavLink } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
    

export function BookView(prop) {
    let {book} = prop
    const user_type =  useContext(TypeContext)[0]
    const DeleteAPIUrl = `http://127.0.0.1:8000/book/delete/${book.id}`
    let navigate = useNavigate()

    const deletebook = () =>{
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
  // console.log(author)

    return (
    <div className="container d-flex justify-content-center">
    <Container>
        <Row>
            <Col md={12} 
            style={{
                    margin: "3rem"
                }}>
                <h1>{book.title} </h1>
            </Col>
        </Row>
        <Row>
            <Col md={12} 
            style={{
                    margin: "1rem"
                }}>
                <h2>
                    <a style={{fontStyle : "italic" }} className=" text-dark " href={`/profile/${book.author.id}`}>
                        by{' '}
                        <span >
                        {book.author.first_name} {book.author.last_name}
                        </span>
                    </a>
                </h2>
            </Col>
        </Row>

        {book.book_cover? <Row>
            <Col md={6}>
                <Image
                    src={`${book.book_cover}`}
                    alt="Profile Picture"
                    style={{
                        height: 'auto',
                        width: '100%',
                        objectFit: 'cover',
                        margin: "15px"
                    }}
                />
            </Col>
            <Col md={6} className="d-flex align-items-center flex-column justify-content-around ">
                <p className='fs-5'>{book.summary} </p>
                
                {user_type=='author'? 
                    <div className='w-100 d-flex justify-content-around '>
                        

                            <Button variant="success" onClick={() => {navigate(`/book/edit/${book.id}`)}} >
                                Edit Book
                            </Button>

                            <Button variant="secondary" onClick={() => {navigate(`/page/view/${book.id}`)}} >
                                Check Pages
                            </Button>

                            <Button variant="danger" onClick={deletebook} >
                                Delete
                            </Button>

                    </div> 
                    : <div>
                        <Button variant="success" onClick={() => {navigate(`/page/view/${book.id}`)}} >
                            Start Reading 
                        </Button>
                    
                    </div>}
                
            </Col>
        </Row> :null}
    </Container>
    </div>
);
}