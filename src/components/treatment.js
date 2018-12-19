import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import Specialist from './specialist';
import request from 'superagent'
import { API_URL } from '../App'

import { connect } from 'react-redux'
import { addTreatment, removeTreatment, selectSpecialist } from '../store/actions'


class Treatment extends Component{
    constructor(props){
        super(props)

        this.state = {
            treatment: null,
            specialist: null,
            treatments: [],
            specialists: [],
            page: 1,
        }

        if (!this.state.treatments.length) {
            this.loadTreatments()
        }
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

    loadSpeacialists = treatmentId => {
        request
        .get(API_URL + '/employees')
        .set('Authorization', 'Bearer xxxx')
        .query({
        pageSize: 100,
        treatmentId,
        })
        .then(res=>{
            this.setState({
                specialists: res.body.Results.map(record => ({ ...record,
                value: record.ID,
                label: [record.LastName, record.FirstName].join(', '),
                }))
            })
        }).catch(error => {
            console.log(error)
        });
    }

    onClickTreatment = treatment => {
        if (this.isSelected(treatment)) {
            this.props.removeTreatment(treatment)
        } else {
            this.props.addTreatment(treatment)
            this.loadSpeacialists(treatment.ID)
        }
    }

    isSelected = treatment => {
        return this.props.order.items.hasOwnProperty(treatment.ID)
    }

    getSpecialist = treatment => {
        return this.props.order.items[treatment.ID].specialist
    }

    // onClickTreatment = treatment => {
    //     let specialist = null
    //     if( this.props.data.treatment && this.props.data.treatment.ID && this.props.data.treatment.ID === treatment.ID && this.props.data.specialist ) {
    //         specialist = this.props.data.specialist
    //     }

    //     this.props.push({ treatment, specialist: specialist, date: null })
    //     this.setState({treatment, specialist: specialist, specialists: [] })
    //     this.loadSpeacialists(treatment.ID)
    // }

    onSpecialistChange = (treatment, specialist) => {
        this.props.selectSpecialist(treatment, specialist)
    }

    // onSpecialistChange = specialist => {
    //     this.props.push({ specialist:null, date: null })
    //     this.setState({ specialist },()=>{
    //         this.props.push({ specialist, date: null })
    //     })
    // }

    onClickNext = () => {
        // Temporary fix to trigger calendar step.
        let { treatment, specialist } = this.props.order.items[Object.keys(this.props.order.items)[0]]
        this.props.push({ treatment, specialist })
    }

    render(){
    return(
        <div className="treatments">
            <pre style={{textAlign: 'left'}}>{ JSON.stringify(this.props.order, null, 4) }</pre>
            <Row>
              {(()=>{
                let doms = []
                let items = (this.state.treatments) ? this.state.treatments : []
                if (items.length===0){
                  return <div className="marginBottom20">Loading...</div>
                }
                //let count = 0
                items.map((item,i)=>{
                    //count++
                    let img = item.ImageURL;
                    let selected = this.isSelected(item)
                    if (!img || img.length===0){
                        img = '/sample.png';
                    }
                    doms.push(

                       <Col xs={12} sm={6} md={4} lg={3} className="item" key={"image" + item.ID}>
                       <pre>{ selected ? 'T' : 'F' }</pre>
                            <div className={selected?"itemContent active":"itemContent"}>
                                <Row className="border-bottom">
                                    <Col xs={12} className="image" style={{backgroundImage: "url("+img+")"}} alt={item.ID}></Col>
                                </Row>
                                <Row className="border-bottom">
                                    <Col xs={12}><div className="title">{item.Name}</div></Col>
                                </Row>
                                <Row className="border-bottom">
                                    <Col xs={12} className="padding-0">
                                    <Col xs={12} sm={8} className="padding-0"><div className="duration">{item.TreatmentDuration} MIN - {item.Price.CurrencyCode} {item.Price.Amount}</div></Col>
                                    <Col xs={12} sm={4} className="padding-0"><div className="selectBtn" onClick={() => this.onClickTreatment(item) }>{ selected ? 'CANCEL' : 'SELECT' }</div></Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12}>
                                        <Specialist treatmentId={item.ID}
                                        selected={ selected }
                                        specialist={ selected && this.getSpecialist(item) }
                                        specialists={ this.state.specialists }
                                        onSpecialistChange={ this.onSpecialistChange.bind(this, item) } />
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

            <Row>

            </Row>

            <div className="col-xs-12 centered">
            {this.state.page && this.state.treatments.length>0 && (
                <Button  className="selectBtnModal" onClick={ this.loadTreatments }>Load More</Button>
            )}
            <Button  className="selectBtnModal" onClick={ this.onClickNext }>Next</Button>
            </div>

        </div>
        );
    }
}

const mapStateToProps = state => ({
    order: state.order,
})

const mapDispatchToProps = dispatch => ({
    addTreatment: treatment => dispatch(addTreatment(treatment)),
    removeTreatment: treatment => dispatch(removeTreatment(treatment)),
    selectSpecialist: (treatment, specialist) => dispatch(selectSpecialist(treatment, specialist)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Treatment)
