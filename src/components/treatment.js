import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import Specialist from './dropdown';
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
                },{
                    id:"2",
                    selected:false,
                    imageUrl: "https://http2.mlstatic.com/tratamientos-faciales-promocion-mes-de-la-madre-40-off-D_NQ_NP_653738-MLA26155901967_102017-F.jpg",   
                    name:"Treatment 2",   
                },{
                    id:"3",
                    selected:false,
                    imageUrl: "https://www.promocipsalut.es/90/promociones-tratamientos-faciales-prx-t33.jpg",   
                    name:"Treatment 3",   
                },{
                    id:"4",
                    selected:false,
                    imageUrl: "https://http2.mlstatic.com/tratamientos-faciales-promocion-mes-de-la-madre-40-off-D_NQ_NP_653738-MLA26155901967_102017-F.jpg",   
                    name:"Treatment 4",   
                },{
                    id:"5",
                    selected:false,
                    imageUrl: "https://www.promocipsalut.es/90/promociones-tratamientos-faciales-prx-t33.jpg",   
                    name:"Treatment 5",   
                },{
                    id:"6",
                    selected:false,
                    imageUrl: "https://www.promocipsalut.es/90/promociones-tratamientos-faciales-prx-t33.jpg",   
                    name:"Treatment 6",   
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
            <Row>

              {(()=>{
                let doms = []
                let items = (this.state.treatments) ? this.state.treatments : []

                let count = 0
                items.map((item,i)=>{
                    count++
                    doms.push(
                        
                        <Col xs={6} md={4} className={item.selected?"item active":"item"} key={"image" + item.id}>
                            <div className="image" style={{backgroundImage: "url("+item.imageUrl+")"}} alt={item.id}></div>
                            <h1>{item.name}</h1>
                            <Button color="primary" onClick={() => this.onClickTreatment(item.id) }>SELECT</Button>
                            <Specialist></Specialist>
                        </Col>
                    )
                    return item
                })

                    return doms
                })()}

            </Row>
 
            <Button outline color="danger">Next</Button>
        </div>
        );
    }
}
export default Treatment;