import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

class FooterPage extends Component{

    render(){
        return(
                <Row className="footer">
                    <Col xs={6} md={4} className="leftcol">
                    <h1>HAVE A QUESTION?</h1>
                    <h1>ASK A GL SKIN EXPERT:</h1>
                    <Button>EMAIL US</Button>
                    </Col>
                    <Col xs={6} md={4} className="middlecol">
                    <form>get db</form>
                    <Datetable></Datetable>
                    <h3>Congratulations we’ll see you soon!</h3>
                    <h4> #GLOtoGO </h4>
                    </Col>
                </Row>
        );
    }
}
export default FooterPage;