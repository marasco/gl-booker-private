import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import Specialist from './specialist';
import Calendar from './datapicker';
import request from 'superagent'
import { API_URL } from '../App'

class Treatment extends Component{
    constructor(){
        super()
        this.state = {
            itemsSelected: [],
            treatments: []
        }
        this.loadTreatments() 

    }
    loadTreatments = () => {
        try {
            request
            .get(API_URL + '/treatments')
            .set('Authorization', 'Bearer xxxx')
            .send({
                param1: 'test'
            })
            .then(res=>{
                console.log('res',res.body)
                this.setState({treatments:res.body})
            }).catch(error => {
                console.log(error) 
            });

        } catch (e){
            console.error(e)
            alert(e.message)
        }
    }
    onClickTreatment = (arg) => {
        let treats = this.state.treatments
        console.log('arg:'+arg)
        treats.map((item,i)=>{
        console.log('item.id:'+item.id)
            if (item.id===arg){
                item.selected = (item.selected)?false:true;
            }
        })

        this.setState({
            treatments: treats
        })  
    }
    render(){
    return(
        <div className="container treatments">
            <div>
                <h1>BOOK A SERVICE</h1>
                <h3>Welcome to Georgia Louise bookings, the leading destination for  the most advanced facials in Manhattan, home to celebrity and world-acclaimed facialist, Georgia Louise, and her elite team. Its time to book your bespoke GLO</h3>
            </div>
            <Row>
              {(()=>{
                let doms = []
                let items = (this.state.treatments) ? this.state.treatments : []

                let count = 0
                items.map((item,i)=>{
                    count++
                    doms.push(
                        
                       <Col xs={12} sm={6} md={4} className="item" key={"image" + item.ID}>
                            <div className={item.selected?"itemContent active":"itemContent"}>
                                <Row className="border-bottom">
                                    <Col xs={12} className="image" style={{backgroundImage: "url("+item.ImageURL+")"}} alt={item.ID}></Col>
                                </Row>
                                <Row className="border-bottom">
                                    <Col xs={12}><div className="title">{item.Name}</div></Col>
                                </Row>
                                <Row className="border-bottom">
                                    <Col xs={12} className="padding-0">
                                    <Col xs={12} sm={8} className="padding-0"><div className="duration">{item.TreatmentDuration}</div></Col>
                                    <Col xs={12} sm={4} className="padding-0"><div className="selectBtn" onClick={() => this.onClickTreatment(item.ID) }>SELECT</div></Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12}><Specialist></Specialist></Col>
                                </Row>
                            </div>
                        </Col>
                    )
                    return item
                })

                    return doms
                })()}

            </Row>
 
            <Button color="danger">Next</Button>
        </div>
        );
    }
}
export default Treatment;