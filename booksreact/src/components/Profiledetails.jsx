import React,{useContext} from "react";
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { TypeContext} from '../context'

export function Profiledetails(prop) {
    let {author} = prop
    const navigate = useNavigate()
    const user_type =  useContext(TypeContext)[0]
  // console.log(author)

    return (
    <div className="container d-flex justify-content-center">
    <Container>
        <Row>
            <Col md={12}>
                <h1>{author.first_name} {author.last_name}</h1>
            </Col>
        </Row>

        <Row>
            <Col md={12}>
                <Image
                    src={`${author.profile_picture}`}
                    alt="Profile Picture"
                    style={{
                        borderRadius: '50%',
                        height: '300px',
                        width: '300px',
                        objectFit: 'cover',
                        margin: "30px"
                    }}
                />
            </Col>
        </Row>

        { user_type==="author" && 
        <Row >
            <Col md={12}>
                <Button variant="success" onClick={() => {navigate(`/profile/edit`)}} >
                        Edit Profile
                </Button>
            </Col>
        </Row>
        }

        <Row >
            <Col md={2}>

            </Col>
            <Col md={8}>
                <h1 className="name">{author.title}</h1>
                <p className="bio"> {author.bio} </p>
            </Col>

        </Row>
    </Container>
    </div>
);
}