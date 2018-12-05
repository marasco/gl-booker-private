import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import Specialist from './specialist';
import Calendar from './calendar';
import request from 'superagent'
import { API_URL } from '../App'

class Treatment extends Component{
    constructor(){
        super()
        this.state = {
            itemsSelected: [],
            treatments: [],
            page: 1,
            step: 1,
        }
        this.loadTreatments()

    }

    checkStep = (step) => {
        console.log('step->'+this.state.step)
        if (this.state.step === step){
            return true;
        }
        return false;
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
                  throw 'We cannot reach list of services available.'
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
    goToStep = (step) => {
        this.setState({step: step})
    }
    onClickTreatment = (arg) => {
        let treats = this.state.treatments
        treats.map((item,i)=>{
            if (item.ID===arg){
                item.selected = (item.selected)?false:true;
            }
            return item
        })

        this.setState({
            treatments: treats
        })
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
                            <div className={item.selected?"itemContent active":"itemContent"}>
                                <Row className="border-bottom">
                                    <Col xs={12} className="image" style={{backgroundImage: "url("+img+")"}} alt={item.ID}></Col>
                                </Row>
                                <Row className="border-bottom">
                                    <Col xs={12}><div className="title">{item.Name}</div></Col>
                                </Row>
                                <Row className="border-bottom">
                                    <Col xs={12} className="padding-0">
                                    <Col xs={12} sm={8} className="padding-0"><div className="duration">{item.TreatmentDuration} MIN - {item.Price.CurrencyCode} {item.Price.Amount}</div></Col>
                                    <Col xs={12} sm={4} className="padding-0"><div className="selectBtn" onClick={() => this.onClickTreatment(item.ID) }>SELECT</div></Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12}><Specialist treatmentId={item.ID}></Specialist></Col>
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



            <Calendar />
        </div>
        );
    }
}
export default Treatment;
