import React, {useContext} from 'react'
import { Card, Button, NavLink} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { TypeContext, UserContext } from '../context';
import axios from "axios";

export function Mycard(prop) {
    let {book} = prop
    const user_id =  useContext(UserContext)[0]
    const user_type =  useContext(TypeContext)[0]
    let BookReadeURL = `http://127.0.0.1:8000/book/newreader`
    const submitValues = 
    {
        "reader":user_id,
        "book":book.id
    }
    let navigate = useNavigate()
    
    let pictureurl = book.book_cover
    if (pictureurl != null)
    {
        if(!pictureurl.includes("http")){
            pictureurl='http://127.0.0.1:8000'+pictureurl
        }
    }


    const addbook = () => {
        axios
            .post(BookReadeURL, submitValues,
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
                window.location.reload();

            })
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    }

    return (
    <div className='m-2'> 
        <Card style={{ width: '18rem', height: "350px" }}>
        <Card.Img style={{ height:"200px", objectFit: "contain"}} variant="top" src={`${pictureurl}`} alt={`${book.title}`} />
        <Card.Body>
            <Card.Title className='text-center'>{book.title}</Card.Title>

            <Card.Text>
                <a href="" onClick={() => navigate(`/user/author/${book.author.id}`)}  ><div className='text-limit'>{book.author.title}</div></a>
            </Card.Text>

            
                {user_type=="author"? 
                    <div className='d-flex justify-content-around'>
                        <Button 
                            onClick={() => {
                                navigate(`/book/view/${book.id}`)
                                window.location.reload()
                            }} 
                            variant="success">check Book
                        </Button>

                        <Button 
                            onClick={() => navigate(`/book/edit/${book.id}`)} 
                            variant="secondary">Edit Book
                        </Button>
                    </div>
                :
                    <div className='d-flex justify-content-around'>
                        <Button 
                            onClick={() => {
                                navigate(`/book/view/${book.id}`)
                                window.location.reload()
                            }} 
                            variant="success">check Book
                        </Button>

                        <Button 
                            onClick={addbook} 
                            variant="success">Add Book
                        </Button>
                    </div>

                    
                }
                
        </Card.Body>
        </Card>
    </div>
    )
}


