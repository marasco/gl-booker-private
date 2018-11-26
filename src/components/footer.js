import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';

class FooterPage extends Component{

    render(){
        return(
                <Row className="footer">
                    <Col xs={6} md={6} className="leftcol">
                        <h5>HAVE A QUESTION?</h5>
                        <h5>ASK A GL SKIN EXPERT:</h5>
                        <Button>EMAIL US</Button>
                    </Col>
                    <Col xs={6} md={3} className="middlecol">
                        <h5>STAY CONNECTED</h5>
                        <SocialIcon url="http://twitter.com/georgialouisesk" /><span> georgialouisesk</span>
                        <br></br>
                        <SocialIcon url="http://facebook.com/georgialouisesk" /><span> georgialouisesk</span>
                        <br></br>
                        <SocialIcon url="http://instagram.com/georgialouisesk" /><span> georgialouisesk</span>
                    </Col>
                    <Col xs={6} md={3} className="rightcol">
                        <h5>CONTACT US</h5>
                        <h6>OFFICE: ofﬁce@georgialouisebrands.com</h6>
                        <h6>PR: irissa.sheikowitz@seengroup.com</h6>
                        <h6>Booking: bookings@georgialouise.com</h6>
                        <h6>Atelier: 212.472.1400  |  347.703.2726</h6>
                        <h6>114 East 71st Street 1E New York NY 10021</h6>
                    </Col>
                </Row>
        );
    }
}
export default FooterPage;