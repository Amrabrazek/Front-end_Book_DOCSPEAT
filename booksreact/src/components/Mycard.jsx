import React from 'react'
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export function Mycard(prop) {

    let navigate = useNavigate()
    let {book} = prop
    // console.log(product)
    return (
    <div className='m-2'> 
        <Card style={{ width: '18rem', height: "350px" }}>
        <Card.Img style={{ height:"200px", objectFit: "contain"}} variant="top" src={`${book.book_cover}`} alt={`${book.title}`} />
        {/* <Card.Img style={{ height:"200px", objectFit: "contain"}} variant="top" src="./xyz.jpeg" alt={`${book.title}`} /> */}
        <Card.Body>
            <Card.Title className='text-center'>{book.title}</Card.Title>

            <Card.Text>
                <a href="" onClick={() => navigate(`/api/author/${book.author.id}`)}  ><div className='text-limit'>{book.author.title}</div></a>
            </Card.Text>

            <div className='d-flex justify-content-center'>
            <Button 
                onClick={() => navigate(`/api/book/${book.id}`)} 
                variant="outline-dark">Edit Book
            </Button>
            </div>
        </Card.Body>
        </Card>
    </div>
    )
}


