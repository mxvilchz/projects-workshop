/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
// import ComparisonChart from "app/views/charts/echarts/ComparisonChart";
// import PieChart from "app/views/charts/echarts/PieChart";
// import LineChart3 from "app/views/charts/echarts/LineChart3";
import LineChart1 from "app/views/charts/echarts/LineChart1";
import LineChart2 from "app/views/charts/echarts/LineChart2";
import { Breadcrumb } from "@gull";
import SimpleCard from "@gull/components/cards/SimpleCard";
// import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

class ClientHome extends Component {

  constructor(props){
    super(props);
    console.log(props);
  }

  componentDidMount(){
    //this.state.user = this.props.state;
    this.setState({user: this.props.location.state})
  }

  state = {
    user: {},
    cardList1: [
      {
        icon: "i-Speach-Bubble-6",
        title: "¡Consultar!",
        subtitle: "Chat"
      },
      {
        icon: "i-Financial",
        title: "Facturación",
        subtitle: ""
      },
      {
        icon: "i-Checkout-Basket",
        title: "Suscripción",
        subtitle: ""
      },
      // {
      //   icon: "i-Money-2",
      //   title: "120",
      //   subtitle: "expense"
      // }
    ],
    topSellingProduct: [
      {
        title: "Jardineros",
        description: "Lorem ipsum dolor sit amet consectetur.",
        prevPrice: 8,
        currentPrice: 5,
        imgUrl: "/assets/images/products/headphone-4.jpg"
      },
      {
        title: "Amas de casa",
        description: "Lorem ipsum dolor sit amet consectetur.",
        prevPrice: 5,
        currentPrice: 3,
        imgUrl: "/assets/images/products/headphone-3.jpg"
      },
      {
        title: "Abogados en divorcios",
        description: "Lorem ipsum dolor sit amet consectetur.",
        prevPrice: 18,
        currentPrice: 10,
        imgUrl: "/assets/images/products/headphone-2.jpg"
      },
      {
        title: "Abogado en inmuebles",
        description: "Lorem ipsum dolor sit amet consectetur.",
        prevPrice: 8,
        currentPrice: 5,
        imgUrl: "/assets/images/products/headphone-4.jpg"
      }
    ],
    newUserList: [
      {
        name: "Smith Doe",
        email: "Smith@gmail.com",
        status: "active",
        photoUrl: "/assets/images/faces/1.jpg"
      },
      {
        name: "Jhon Doe",
        email: "Jhon@gmail.com",
        status: "active",
        photoUrl: "/assets/images/faces/2.jpg"
      },
      {
        name: "Alex",
        email: "Otttio@gmail.com",
        status: "active",
        photoUrl: "/assets/images/faces/3.jpg"
      },
      {
        name: "Mathew Doe",
        email: "matheo@gmail.com",
        status: "active",
        photoUrl: "/assets/images/faces/4.jpg"
      }
    ],
    userActivity: [
      {
        activitylist: [
          {
            title: "Pages / Visit",
            count: 2065
          },
          {
            title: "New user",
            count: 465
          },
          {
            title: "Last week",
            count: 23456
          }
        ]
      },
      {
        activitylist: [
          {
            title: "Pages / Visit",
            count: 435
          },
          {
            title: "New user",
            count: 5435643
          },
          {
            title: "Last week",
            count: 45435
          }
        ]
      },
      {
        activitylist: [
          {
            title: "Pages / Visit",
            count: 545
          },
          {
            title: "New user",
            count: 54353
          },
          {
            title: "Last week",
            count: 4643
          }
        ]
      }
    ]
  };

  getUserStatusClass = status => {
    switch (status) {
      case "active":
        return "badge-success";
      case "inactive":
        return "badge-warning";
      case "pending":
        return "badge-primary";
      default:
        break;
    }
  };

  handleClick = (e, index) => {
    e.preventDefault()
    switch (index) {
      case 0:
        //especialidades
        this.props.history.push({pathname: '/specialties', state:  this.state.user})
        break;
      case 1:
        this.props.history.push('/checkout')
        break;
      case 2:
        this.props.history.push('/princing')
        break;
      default:
        break;
    }

  }

  render() {
    let {
      cardList1 = [],
      topSellingProduct = [],
      newUserList = [],
      // userActivity = []
    } = this.state;

    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Dashboard", path: "/client/home" },
            { name: "Inicio" }
          ]}
        ></Breadcrumb>
        <div className="row">
          {cardList1.map((card, index) => (
            <a href="#" onClick={(e) => this.handleClick(e, index)} key={index} className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
                <div className="card-body text-center">
                  <i className={card.icon}></i>
                  <div className="content">
                    <p className="text-muted mt-2 mb-0 text-capitalize">
                      {card.subtitle}
                    </p>
                    <p className="lead text-primary text-24 mb-2 text-capitalize">
                      {card.title}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* <div className="row">
          <div className="col-lg-8 col-md-12">
            <SimpleCard title="This Year Sales" className="mb-4">
              <ComparisonChart height="260px"></ComparisonChart>
            </SimpleCard>
          </div>
          <div className="col-lg-4 col-sm-12">
            <SimpleCard title="Sales by Countries" className="mb-4">
              <PieChart height="260px"></PieChart>
            </SimpleCard>
          </div>
        </div> */}

        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="card mb-4">
                  <div className="card-title card-body mb-0 pb-0">
                    <h3 className="mb-4">Pagos realizados</h3>
                    <p className="text-primary mb-0 text-24">S/ 14.00</p>
                  </div>
                  <LineChart1 height="260px"></LineChart1>
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="card mb-4">
                  <div className="card-title card-body mb-0 pb-0">
                    <h3 className="mb-4">Gatos totales</h3>
                    <p className="text-primary mb-0 text-24">S/ 45.00</p>
                  </div>
                  <LineChart2 height="260px"></LineChart2>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card mb-4">
                  <div className="card-header card-title mb-0 d-flex align-items-center justify-content-between border-0">
                    <h3 className="w-50 float-left card-title m-0">
                      Consultores activos
                    </h3>
                    {/* <Dropdown alignRight>
                      <Dropdown.Toggle
                        as="span"
                        className="toggle-hidden cursor-pointer"
                      >
                        <i className="nav-icon i-Gear-2"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Add new user</Dropdown.Item>
                        <Dropdown.Item>View All users</Dropdown.Item>
                        <Dropdown.Item>Something else here</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown> */}
                  </div>

                  <div className="">
                    <div className="table-responsive">
                      <table id="user_table" className="table  text-center">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Email</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newUserList.map((user, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{user.name}</td>
                              <td>
                                <img
                                  className="rounded-circle m-0 avatar-sm-table "
                                  src={user.photoUrl}
                                  alt=""
                                />
                              </td>

                              <td>{user.email}</td>
                              <td>
                                <span
                                  className={`badge ${this.getUserStatusClass(
                                    user.status
                                  )}`}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td>
                                <span className="cursor-pointer text-success mr-2">
                                  <i className="nav-icon i-Pen-2 font-weight-bold"></i>
                                </span>
                                <span className="cursor-pointer text-danger mr-2">
                                  <i className="nav-icon i-Close-Window font-weight-bold"></i>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <SimpleCard title="Nuevas especialidades:" className="mb-4">
              {topSellingProduct.map((item, index) => (
                <div
                  key={index}
                  className="d-flex flex-column flex-sm-row align-items-sm-center mb-3"
                >
                  <img
                    className="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3"
                    src={item.imgUrl}
                    alt=""
                  />
                  <div className="flex-grow-1">
                    <h5 className="">
                      <Link to="/">{item.title}</Link>
                    </h5>
                    <p className="m-0 text-small text-muted">
                      {item.description}
                    </p>
                    <p className="text-small text-danger m-0">
                      ${item.currentPrice}
                      <del className="text-muted">${item.prevPrice}</del>
                    </p>
                  </div>
                  <div>
                    <button className="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </SimpleCard>

            {/* <div className="card mb-4">
              <div className="card-body p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                  <h3 className="mb-0">User activity</h3>
                  <span className="flex-grow-1"></span>
                  <span className="badge badge-pill badge-warning">
                    Updated daily
                  </span>
                </div>
                {userActivity.map(({ activitylist = [] }, index) => (
                  <div
                    key={index}
                    className="d-flex border-bottom justify-content-between p-3"
                  >
                    {activitylist.map((item, i) => (
                      <div key={i} className="flex-grow-1">
                        <span className="text-small text-muted">
                          {item.title}
                        </span>
                        <h5 className="m-0">{item.count}</h5>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body card-title mb-0">
                <h3 className="m-0">Last 20 Day Leads</h3>
              </div>
              <LineChart3 height="360px"></LineChart3>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default ClientHome;
