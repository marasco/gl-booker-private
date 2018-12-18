import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addTreatment, removeTreatment, selectSpecialist } from '../store/actions'
import { Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import Specialist from './specialist';
import request from 'superagent'
import { API_URL } from '../App'
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

    isSelected = treatmentId => {
        return this.props.wizard.treatments.some(data => {
            return data.treatmentId === treatmentId
        })
    }

    getSpecialist = treatmentId => {
        let items = this.props.wizard.treatments.filter(data => {
            return data.treatmentId === treatmentId
        })

        return items && items[0].specialistId
    }

    getSpecialists = treatmentId => {
        return this.props.wizard.data.specialists[treatmentId] || []
    }

    // loadSpeacialists = treatmentId => {
    //     request
    //     .get(API_URL + '/employees')
    //     .set('Authorization', 'Bearer xxxx')
    //     .query({
    //     pageSize: 100,
    //     treatmentId,
    //     })
    //     .then(res=>{
    //         this.setState({
    //             specialists: res.body.Results.map(record => ({ ...record,
    //             value: record.ID,
    //             label: [record.LastName, record.FirstName].join(', '),
    //             }))
    //         })
    //     }).catch(error => {
    //         console.log(error)
    //     });
    // }

    onClickTreatment = (treatmentId, selected) => {
        if (selected) {
            this.props.removeTreatment(treatmentId)
        }
        else {
            this.props.addTreatment(treatmentId)
        }


        // let specialist = null
        // if( this.props.data.treatment && this.props.data.treatment.ID && this.props.data.treatment.ID === treatment.ID && this.props.data.specialist ) {
        //     specialist = this.props.data.specialist
        // }

        // this.props.addTreatment(treatment.ID)

        // this.props.push({ treatment, specialist: specialist, date: null })
        // this.setState({treatment, specialist: specialist, specialists: [] })
        // this.loadSpeacialists(treatment.ID)
    }

    onSpecialistChange = (treatmentId, specialist) => {
        this.props.selectSpecialist(treatmentId, specialist.ID)
        // this.props.push({ specialist:null, date: null })
        // this.setState({ specialist },()=>{
        //     this.props.push({ specialist, date: null })
        // })
    }

    render(){
    return(
        <div className="treatments">
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
                    let selected = this.isSelected(item.ID)
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
                                    <Col xs={12} sm={4} className="padding-0"><div className="selectBtn" onClick={() => this.onClickTreatment(item.ID, selected) }>{ selected ? 'CANCEL' : 'SELECT' }</div></Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={12}>
                                        <Specialist treatmentId={item.ID}
                                        selected={ selected }
                                        specialist={ selected ? this.getSpecialist(item.ID) : null }
                                        specialists={ selected ? this.getSpecialists(item.ID) : [] }
                                        onSpecialistChange={ this.onSpecialistChange.bind(this, item.ID) } />
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

            {this.state.page && this.state.treatments.length>0 && (
                <div className="col-xs-12 centered">
                <Button  className="selectBtnModal" onClick={ this.loadTreatments }>Load More</Button>
                </div>
            )}

        </div>
        );
    }
}

const mapStateToProps = state => ({
    wizard: state.wizard,
})

const mapDispatchToProps = dispatch => ({
    addTreatment: treatmentId => dispatch(addTreatment(treatmentId)),
    removeTreatment: treatmentId => dispatch(removeTreatment(treatmentId)),
    selectSpecialist: (treatmentId, specialistId) => dispatch(selectSpecialist(treatmentId, specialistId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Treatment)
