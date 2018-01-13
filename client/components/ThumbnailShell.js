import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import SingleCheese from './SingleCheeseThumbnail'

export default class Thumbnails extends Component {
    render() {
        

        return (
            <Container fluid style={{ lineHeight: '200px' }}>

                <Row align="center" style={{ height: '100px' }} debug>
                    <Col debug><SingleCheese /></Col>
                    <Col debug><SingleCheese /></Col>
                    <Col debug><SingleCheese /></Col>
                </Row>
                <Row align="center" style={{ height: '100px' }} debug>
                    <Col debug><SingleCheese /></Col>
                    <Col debug><SingleCheese /></Col>
                    <Col debug><SingleCheese /></Col>
                </Row>
            </Container>
        )
    }
}