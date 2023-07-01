import { Button, NavLink } from "react-bootstrap";
import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TypeContext} from '../context'
import axios from "axios";
import "./pageview.css"


function Pageview(props) {
    const { pages } = props;
    const user_type =  useContext(TypeContext)[0]
    const [currentPage, setCurrentPage] = useState(1);
    const [submitValues, setSubmitValues] = useState({
        "content":""
    })
    let navigate = useNavigate()


    const handleNextPage = () => {
        setCurrentPage(currentPage + 2);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 2);
    };

    const clearpage = (page_id) =>{
        
        // console.log(page_id);


        axios
            .patch(`http://127.0.0.1:8000/page/update/${page_id}`, submitValues,
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
                window.location.reload()


            })
            .catch(err => {
                console.log("error")
                console.log(err);
            });
    }


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
                        <Button variant="success" onClick={() => {navigate(`/page/edit/${pages.find(page => page.page_number == currentPage).id}`)}} >
                            Edit Page
                        </Button>

                        <Button variant="danger" onClick={()=> {clearpage(`${pages.find(page => page.page_number == (currentPage)).id}`)}}>
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
                        <Button variant="success" onClick={() => {navigate(`/page/edit/${pages.find(page => page.page_number == (currentPage+1)).id}`)}} >
                            Edit Page
                        </Button>

                        <Button variant="danger" onClick={()=> {clearpage(`${pages.find(page => page.page_number == (currentPage+1)).id}`)}} >
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