import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import Specialist from './specialist';

class Treatment extends Component{
    constructor(){
        super()
        this.state = {
            itemsSelected: [],
            treatments: [
                {
                    id:"1",
                    selected:false,
                    imageUrl: "https://www.promocipsalut.es/90/promociones-tratamientos-faciales-prx-t33.jpg",   
                    name:"Treatment 1",
                    duration: "XX minutes - $500"   
                },{
                    id:"2",
                    selected:false,
                    imageUrl: "https://http2.mlstatic.com/tratamientos-faciales-promocion-mes-de-la-madre-40-off-D_NQ_NP_653738-MLA26155901967_102017-F.jpg",   
                    name:"Treatment 2",
                    duration: "XX minutes - $500"   
                },{
                    id:"3",
                    selected:false,
                    imageUrl: "https://www.promocipsalut.es/90/promociones-tratamientos-faciales-prx-t33.jpg",   
                    name:"Treatment 3",
                    duration: "XX minutes - $500"   
                },{
                    id:"4",
                    selected:false,
                    imageUrl: "https://http2.mlstatic.com/tratamientos-faciales-promocion-mes-de-la-madre-40-off-D_NQ_NP_653738-MLA26155901967_102017-F.jpg",   
                    name:"Treatment 4",
                    duration: "XX minutes - $500"   
                },{
                    id:"5",
                    selected:false,
                    imageUrl: "https://www.promocipsalut.es/90/promociones-tratamientos-faciales-prx-t33.jpg",   
                    name:"Treatment 5",
                    duration: "XX minutes - $500"   
                },{
                    id:"6",
                    selected:false,
                    imageUrl: "https://www.promocipsalut.es/90/promociones-tratamientos-faciales-prx-t33.jpg",   
                    name:"Treatment 6",
                    duration: "XX minutes - $500"   
                },
            ]
        }

    }
    onClickTreatment = (arg) => {
        let treats = this.state.treatments
        treats.map((item,i)=>{
            if (item.id===arg){
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
            <Row>

              {(()=>{
                let doms = []
                let items = (this.state.treatments) ? this.state.treatments : []

                items.map((item,i)=>{
                    doms.push(
                        
                        <Col xs={12} sm={6} md={4} className="item" key={"image" + item.id}>
                            <div className={item.selected?"itemContent active":"itemContent"}>
                                <Row className="border-bottom">
                                    <Col xs={12} className="image" style={{backgroundImage: "url("+item.imageUrl+")"}} alt={item.id}></Col>
                                </Row>
                                <Row className="border-bottom">
                                    <Col xs={12}><div className="title">{item.name}</div></Col>
                                </Row>
                                <Row className="border-bottom">
                                    <Col xs={12} className="padding-0">
                                    <Col xs={12} sm={8} className="padding-0"><div className="duration">{item.duration}</div></Col>
                                    <Col xs={12} sm={4} className="padding-0"><div className="selectBtn" onClick={() => this.onClickTreatment(item.id) }>SELECT</div></Col>
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