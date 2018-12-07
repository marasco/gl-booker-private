import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import Specialist from './specialist';
import request from 'superagent'
import { API_URL } from '../App'
class Treatment extends Component{
    constructor(props){
        super(props)

        this.state = props.step.state || {
            treatment: null,
            specialist: null,
            treatments: [],
            page: 1,
        }

        if (!this.state.treatments.length) {
            this.loadTreatments()
        }

        props.step.validator = () => {
            if (!this.state.treatment) {
                throw 'You must select a treatment.'
            }
            if (!this.state.specialist) {
                throw 'You must select a specialist.'
            }
        }
    }

    componentWillUnmount = () => {
        this.props.save(this.state)
    }

    loadTreatments = () => {
        try {
            request
            .get(API_URL + '/treatments')
            .set('Authorization', 'Bearer xxxx')
            .query({
                page: this.state.page,
                pageSize: 12,
            })
            .send({
                param1: 'test'
            })
            .then(res=>{
                console.log('xhr.response:',res.body)
                if (res.body && res.body.Treatments){
                  this.setState({
                      treatments: [...this.state.treatments, ...res.body.Treatments],
                      page: res.body.Treatments.length ? this.state.page + 1 : false,
                  })
                }else{
                  throw new Error('We cannot reach list of services available.')
                }
            }).catch(error => {
                console.log(error)
                alert(error.message)
            });

        } catch (e){
            console.error(e)
            alert(e.message)
        }
    }

    onClickTreatment = treatment => {
        this.props.push({ treatment, specialist: null })
        this.setState({treatment, specialist: null })
    }

    onSpecialistChange = specialist => {
        this.props.push({ specialist })
        this.setState({ specialist })
    }

    render(){
    return(
        <div className="container treatments">
            <div className="centered col-xs-12">
                <h1 className="centered section-1">BOOK A SERVICE</h1>
            </div>
            <div className="centered col-xs-12 col-md-8 col-md-offset-2">
                <h3>Welcome to Georgia Louise bookings, the leading destination for  the most advanced facials in Manhattan, home to celebrity and world-acclaimed facialist, Georgia Louise, and her elite team. Its time to book your bespoke GLO</h3>
            </div>
            <Row>
              {(()=>{
                let doms = []
                let items = (this.state.treatments) ? this.state.treatments : []

                //let count = 0
                items.map((item,i)=>{
                    //count++
                    let img = item.ImageURL;
                    if (!img || img.length===0){
                        img = '/sample.png';
                    }
                    doms.push(

                       <Col xs={12} sm={6} md={4} className="item" key={"image" + item.ID}>
                            <div className={this.state.treatment === item?"itemContent active":"itemContent"}>
                                <Row className="border-bottom">
                                    <Col xs={12} className="image" style={{backgroundImage: "url("+img+")"}} alt={item.ID}></Col>
                                </Row>
                                <Row className="border-bottom">
                                    <Col xs={12}><div className="title">{item.Name}</div></Col>
                                </Row>
                                <Row className="border-bottom">
                                    <Col xs={12} className="padding-0">
                                    <Col xs={12} sm={8} className="padding-0"><div className="duration">{item.TreatmentDuration} MIN - {item.Price.CurrencyCode} {item.Price.Amount}</div></Col>
                                    <Col xs={12} sm={4} className="padding-0"><div className="selectBtn" onClick={() => this.onClickTreatment(item) }>SELECT</div></Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12}>
                                        <Specialist treatmentId={item.ID}
                                        selected={ this.state.treatment === item }
                                        specialist={ this.state.specialist }
                                        onSpecialistChange={ this.onSpecialistChange } />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )
                    return item
                })

                    return doms
                })()}

            </Row>

            {this.state.page && (
                <div className="col-xs-12 centered">
                <Button bsStyle="primary" onClick={ this.loadTreatments }>Load More</Button>
                </div>
            )}

        </div>
        );
    }
}
export default Treatment;
