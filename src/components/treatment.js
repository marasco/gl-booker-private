import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import Specialist from './specialist';
import Calendar from './datapicker';

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

       /*this.onTypeaheadaChange = this.onTypeaheadChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);*/

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