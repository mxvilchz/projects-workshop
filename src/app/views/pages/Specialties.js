/* eslint-disable react/no-direct-mutation-state */
import Breadcrumb from "@gull/components/Breadcrumb";
import React, { Component, Fragment } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";

const Checkbox = ({ value, onChange }) => {
  return (
    <div>
      <label>
        <input type="checkbox" checked={value} onChange={onChange} className="form-check-input" />
      </label>
    </div>
  );
}

class Specialties extends Component {
  constructor(props){
    super(props);
    console.log(props)
  }

  state = {
    user: {},
    disabled: true,
    cardList1: [],
    cardList2: [
      {
        icon: "i-Doctor",
        subtitle: "Consultoría de salud",
        title: "Doctor",
        checked: false
      },
      {
        icon: "i-Engineering",
        subtitle: "new users",
        title: "Ingeniero",
        checked: false
      },
      {
        icon: "i-Financial",
        subtitle: "Para tus finanzas",
        title: "Contador",
        checked: false
      },
      {
        icon: "i-Business-ManWoman",
        subtitle: "Vende tu marca",
        title: "Publicista",
        checked: false
      },
      {
        icon: "i-Love-User",
        subtitle: "Para friendzoneados",
        title: "Chamán",
        checked: false
      },
      {
        icon: "i-Youtube",
        subtitle: "Llega a un público específico",
        title: "Youtuber",
        checked: false
      }
    ],
    bigImageCard: []
  };

  componentDidMount(){
    this.setState({user: this.props.location.state})
  }

  handleChangeOne = (index) => {
    this.state.cardList2[index].checked = !this.state.cardList2[index].checked;
    this.setState({ cardList2: this.state.cardList2 });
    if (!this.state.cardList2.some(item => item.checked)) {
      this.setState({ disabled: true })
    } else {
      this.setState({ disabled: false })
    }
  }

  handleSubmit = () => {
    const specialties = this.state.cardList2.filter((item) => item.checked);
    localStorage.setItem('specialties', JSON.stringify(specialties));
    this.props.history.push({ pathname: "/chat", state: { specialties: specialties, user: this.state.user } })
  }


  render() {
    let { cardList2 = [] } = this.state;

    return (
      <Fragment>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: "/client/home" },
            { name: "Especialidades" }
          ]}
        ></Breadcrumb>
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-lg-10 col-md-12">
            <div className="row">
              {cardList2.map((card, index) => (
                <div key={index} className="col-md-4">
                  <div className="card card-icon-big mb-4">

                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                      <div className="form-check">

                        <Checkbox
                          value={this.state.cardList2[index].checked}
                          onChange={() => { this.handleChangeOne(index) }}
                        />

                      </div>
                    </div>

                    <div className="card-body text-center">
                      <i className={card.icon}></i>
                      <p className="text-muted mt-2 mb-0 text-capitalize">
                        {card.subtitle}
                      </p>
                      <p className="lead text-18 mt-2 mb-0 text-capitalize">
                        {card.title}
                      </p>
                    </div>

                  </div>
                </div>
              ))}

            </div>

            <ButtonToolbar style={{ justifyContent: "flex-end" }}>
              <Button
                key='primary'
                variant={`outline-primary`}
                className="m-1 text-capitalize"
                disabled={this.state.disabled}
                onClick={() => { this.handleSubmit() }}
              >
                CONTINUAR
              </Button>

            </ButtonToolbar>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Specialties;
