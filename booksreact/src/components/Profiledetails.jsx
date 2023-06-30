import React, { useEffect, useState, useContext } from "react";
import { UserContext, ProductsContext } from '../context'
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import './profiledetails.css';


export function Profiledetails(prop) {
    let {author} = prop

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

            <Col md={5}>
            <div className="profile-picture">
                <Image src={`${author.profile_picture}`} alt="Profile Picture" fluid />
            </div>
            </Col>

            <Col md={7}>
                <h1 className="name">{author.title}</h1>
                <p className="bio"> {author.bio} </p>
            </Col>

        </Row>
    </Container>
    </div>
);
}