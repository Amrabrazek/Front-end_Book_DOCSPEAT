import React, {useContext} from 'react'
import { Card, Button, NavLink} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { TypeContext } from '../context';

export function Mycard(prop) {
    let {book} = prop
    // console.log(book.book_cover)
    
    let pictureurl = book.book_cover
    if (pictureurl != null)
    {
        if(!pictureurl.includes("http")){
            pictureurl='http://127.0.0.1:8000'+pictureurl
        }
    }
    console.log(pictureurl)
    const user_type =  useContext(TypeContext)[0]
    let navigate = useNavigate()
    // console.log(book)
    // console.log(product)
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
                    </div>
                }
                
        </Card.Body>
        </Card>
    </div>
    )
}


