import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import Specialist from './specialist';
import request from 'superagent'
import { API_URL } from '../App'
import Timer from './timer'


class Treatment extends Component{
    constructor(props){
        super(props)
        let useIndex=localStorage.getItem('useIndex')
        if (useIndex===null){
          localStorage.setItem('useIndex',0);
        }

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

    loadSpeacialists = treatment => {
        request
        .get(API_URL + '/employees')
        .set('Authorization', 'Bearer xxxx')
        .query({
        pageSize: 100,
        treatmentId: treatment.ID,
        })
        .then(res=>{
            let specialists = res.body.Results.map(record => ({ ...record,
                value: record.ID,
                label: [record.LastName, record.FirstName].join(', '),
            }))

            this.props.setSpecialists(treatment, specialists);
            // this.setState({ specialists })
        }).catch(error => {
            console.log(error)
        });
    }

    onClickTreatment = treatment => {
        if (this.isSelected(treatment)) {
            this.props.removeTreatment(treatment)
        } else {
            this.props.addTreatment(treatment)
            this.loadSpeacialists(treatment)
        }
        this.props.goToStep(1)
    }

    isSelected = treatment => {
        return this.props.order.treatments.hasOwnProperty(treatment.ID)
    }

    getSpecialist = treatment => {
        return this.props.order.treatments[treatment.ID].specialist
    }

    getSpecialists = treatment => {
        return this.props.data.specialists[treatment.ID] || []
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
        this.props.goToStep(1)
    }

    // onSpecialistChange = specialist => {
    //     this.props.push({ specialist:null, date: null })
    //     this.setState({ specialist },()=>{
    //         this.props.push({ specialist, date: null })
    //     })
    // }

    // onClickNext = () => {
    //     // Temporary fix to trigger calendar step.
    //     let { treatment, specialist } = this.props.order.treatments[Object.keys(this.props.order.treatments)[0]]
    //     this.props.push({ treatment, specialist })
    // }

    nextStep = () => {
      /*
        let { treatments } = this.props.order
        let keys = Object.keys(treatments)

        if (keys.some(key => !treatments[key].specialist)) {
            return alert('Please select a specialist for all treatments')
        }
        */
        this.props.goToStep(2)
    }

    render(){
    return(
        <div className="treatments">
            <Timer/>
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
                                        specialists={ this.getSpecialists(item) }
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
                <Button className="selectBtnModal" style={{marginLeft: "-40px", marginRight: "20px"}} onClick={ this.loadTreatments }>Load More</Button>
            )}
                <Button  className="selectBtnModal" onClick={ this.nextStep }>Next</Button>
            </div>

        </div>
        );
    }
}

export default Treatment
