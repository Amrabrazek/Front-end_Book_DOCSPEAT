import { Button, NavLink } from "react-bootstrap";
import React, { useState, useContext } from 'react';
import "./pageview.css"
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { TypeContext} from '../context'


function Pageview(props) {
    const { pages } = props;
    const user_type =  useContext(TypeContext)[0]
    const [currentPage, setCurrentPage] = useState(1);
    let navigate = useNavigate()
    const handleNextPage = () => {
        setCurrentPage(currentPage + 2);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 2);
    };

    const deletepage = () =>{
        console.log(pages.find(page => page.page_number == 1))
    }

    console.log(pages.find(page => page.page_number == 1).content)

    // { pages.find(page => page.page_number === currentPage)? pages.find(page => page.pageNumber === currentPage).content: null }

    return (

        <div className="book-container">
        <Container>
        <Row>
            <Col md={6}>
            <div class="container ">
                <div class="row d-flex justify-content-center">
                        <h2>Page {currentPage}</h2>
                        <div className='d-flex justify-content-start m-3 p-3 w-100'
                            style={{ textAlign: 'left', height: '80vh', border: '1px solid #ccc', boxShadow: '0 0 10px #ccc' }}>
                        <p>{ pages.find(page => page.page_number == currentPage)? pages.find(page => page.page_number == currentPage).content: null }</p>
                        </div>
                </div>
                
                { user_type=='author'?
                    <div className='w-100 d-flex justify-content-around '>
                        <Button variant="success" onClick={() => {navigate(`/page/edit/`)}} >
                            Edit Page
                        </Button>

                        <Button variant="danger" onClick={deletepage} >
                            Delete
                        </Button>
                    </div> 
                : 
                    null }

            </div>
            </Col>

            <Col md={6}>
            <div class="container ">
                <div class="row d-flex justify-content-center">
                        <h2>Page {currentPage + 1}</h2>
                        <div className='d-flex justify-content-start m-3 p-3 w-100'
                            style={{ textAlign: 'left', height: '80vh', border: '1px solid #ccc', boxShadow: '0 0 10px #ccc' }}>
                        <p>{ pages.find(page => page.page_number == (currentPage+1))? pages.find(page => page.page_number == (currentPage+1)).content: null }</p>
                        </div>
                </div>
            </div>

                { user_type=='author'?
                    <div className='w-100 d-flex justify-content-around '>
                        <Button variant="success" onClick={() => {navigate(`/page/edit/`)}} >
                            Edit Page
                        </Button>

                        <Button variant="danger" onClick={deletepage} >
                            Delete
                        </Button>
                    </div> 
                : 
                    null }

            </Col>
        </Row>

        <Row >
            <Col xs={3}>

            </Col>
            <Col xs={3}>
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="book-arrow book-arrow-prev">
                    <span className="sr-only">Previous</span>
                </button>
            </Col>
            <Col xs={3}>
                <button onClick={handleNextPage} disabled={currentPage === pages.length - 1} className="book-arrow book-arrow-next">
                    <span className="sr-only">Next</span>
                </button>
            </Col>
            <Col xs={3}>

            </Col>

        </Row>
    </Container>


            
        </div>
    );
}

export default Pageview;