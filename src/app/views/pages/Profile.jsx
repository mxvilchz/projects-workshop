import React, { Component } from "react";
import DateTime from "react-datetime";
import { Form, Button } from "react-bootstrap";
import { CodeViewer, Breadcrumb } from "@gull";
import { Formik } from "formik";
import * as yup from "yup";
// import { DateRange, Calendar } from "react-date-range";
import { connect } from "react-redux";
import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import moment from "moment";

class Profile extends Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    // select: "",
    birthDay: "",
    // cardNumber: "4444444444444444",
    email: "",
    // password: "",
    // repassword: "",
    website: "",
    // switch: false,
    // checkbox1: "",
    // checkbox2: "",
    // radio: "",
    // range: {
    //   startDate: new Date(),
    //   endDate: (() => {
    //     let date = new Date();
    //     date.setDate(date.getDate() + 7);
    //     return date;
    //   })()
    // }
  };

  componentDidMount = () => {
    const user = this.props.user
    const users = this.getUsers()
    users
      .then(data => {
        const userSearch = data.filter(item => item.uid === user.userId)
        this.setState({
          ...userSearch[0],
        })
      })
      .catch(error => console.log(error))

  }

  getUsers = async () => {
    const snapshot = await FirebaseAuthService.firestore.collection('users').get()
    return snapshot.docs.map(doc => {
      return {
        ...doc.data(),
        id: doc.id,
      }
    });
  }

  handleSubmit = async (values, { setSubmitting }) => {
    FirebaseAuthService.firestore.collection('users').doc(values.id).update({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      birthDay: values.birthDay,
      website: values.website
    })
    alert('Datos guardados!')
  };

  // handleDateRangeChange = range => {
  //   let { startDate, endDate } = range;
  //   this.setState({
  //     range: {
  //       startDate: startDate.toDate(),
  //       endDate: endDate.toDate()
  //     }
  //   });
  // };

  render() {
    const user = this.props.user
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Inicio", path: user.role === 'client' ? '/client/home' : 'consultant/home' },
            { name: "Cuenta" }
          ]}
        ></Breadcrumb>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <div className="card-title mb-0">Perfil de usuario</div>
                <h1 className="mb-5">{user.role === 'client' ? 'Cliente' : 'Consultor'}</h1>
                <Formik
                  initialValues={this.state}
                  validationSchema={basicFormSchema}
                  onSubmit={this.handleSubmit}
                  enableReinitialize={true}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 form-group mb-3">
                          <label htmlFor="firstName">Nombre</label>
                          <input
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            placeholder="Introduzca su nombre"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                          />
                          {errors.firstName && touched.firstName && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.firstName}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 form-group mb-3">
                          <label htmlFor="lastName">Apellidos</label>
                          <input
                            id="lastName"
                            name="lastName"
                            className="form-control"
                            placeholder="Introduzca sus apellidos"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                          />
                          {errors.lastName && touched.lastName && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.lastName}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 form-group mb-3">
                          <label htmlFor="email">Email</label>
                          <input
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="xox@xmail.com"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          {errors.email && touched.email && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.email}
                            </div>
                          )}
                          <small
                            id="emailHelp"
                            className="form-text text-muted"
                          >
                            Nunca compartiremos tu correo electrónico con nadie más.
                          </small>
                        </div>

                        <div className="col-md-6 form-group mb-3">
                          <label htmlFor="phone">Teléfono</label>
                          <input
                            className="form-control"
                            id="phone"
                            name="phone"
                            placeholder="Ingrese el teléfono"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                          />
                          {errors.phone && touched.phone && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.phone}
                            </div>
                          )}
                        </div>

                        {/* <div className="col-md-6 form-group mb-3">
                          <label htmlFor="cardNumber">Cradit card number</label>
                          <input
                            className="form-control"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="4444-4444-4444-4444"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.cardNumber}
                          />
                          {errors.cardNumber && touched.cardNumber && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.cardNumber}
                            </div>
                          )}
                        </div> */}

                        <div className="col-md-6 form-group mb-3">
                          <label htmlFor="website">Sitio Web</label>
                          <input
                            className="form-control"
                            id="website"
                            name="website"
                            placeholder="xox.com"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.website}
                          />
                        </div>

                        <div className="col-md-6 form-group mb-3">
                          <label htmlFor="picker2">Fecha de nacimiento</label>
                          <DateTime
                            name="birthDay"
                            dateFormat="DD/MM/YYYY"
                            timeFormat={false}
                            value={values.birthDay}
                            onChange={(date) => {
                              handleChange({
                                target: {
                                  name: "birthDay",
                                  value: moment(date).format('DD/MM/YYYY')
                                }
                              });
                            }}
                          />
                          {errors.birthDay && touched.birthDay && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.birthDay}
                            </div>
                          )}
                        </div>

                        {/* <div className="col-md-6 form-group mb-3">
                          <label htmlFor="picker1">Select</label>
                          <select
                            id="picker1"
                            className="form-control"
                            name="select"
                            value={values.select}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="opt1">Option 1</option>
                            <option value="opt2">Option 2</option>
                            <option value="opt3">Option 3</option>
                          </select>
                          {errors.select && touched.select && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.select}
                            </div>
                          )}
                        </div> */}

                        {/* <div className="col-md-6 form-group mb-3">
                          <Form.Check
                            name="switch"
                            onChange={handleChange}
                            value={values.switch}
                            type="switch"
                            id="custom-switch"
                            label="I accept the terms & conditions"
                          />
                          <Form.Check
                            name="checkbox1"
                            onChange={handleChange}
                            value="check123"
                            checked={
                              values.checkbox1 &&
                              values.checkbox1.includes("check123")
                            }
                            type="checkbox"
                            id="check1"
                            label="I accept the policies"
                          />
                          <Form.Check
                            name="checkbox2"
                            onChange={handleChange}
                            value="check321"
                            checked={
                              values.checkbox2 &&
                              values.checkbox2.includes("check321")
                            }
                            type="checkbox"
                            id="check2"
                            label="Subscribe for future news letters"
                          />
                        </div> */}

                        {/* <div className="col-md-6 form-group mb-3">
                          <fieldset onChange={handleChange}>
                            <Form.Group>
                              <Form.Label as="legend">
                                Choose any option
                              </Form.Label>
                              <Form.Check
                                type="radio"
                                label="first radio"
                                name="radio"
                                id="formHorizontalRadios1"
                                value="radio1"
                              />
                              <Form.Check
                                type="radio"
                                label="second radio"
                                name="radio"
                                id="formHorizontalRadios2"
                                value="radio2"
                              />
                              <Form.Check
                                type="radio"
                                label="third radio"
                                name="radio"
                                id="formHorizontalRadios3"
                                value="radio3"
                              />
                            </Form.Group>
                          </fieldset>
                        </div> */}

                        {/* <div className="col-md-12 form-group mb-3">
                          <label htmlFor="picker2">Birth date</label>
                          <DateRange
                            startDate={new Date(
                              this.state.range.startDate
                            ).toLocaleDateString("en-GB")}
                            endDate={new Date(
                              this.state.range.endDate
                            ).toLocaleDateString("en-GB")}
                            onChange={this.handleDateRangeChange}
                          />
                        </div> */}
                        <div className="col-md-12">
                          <Button type="submit">Guardar</Button>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>

                {/* <CodeViewer language={"xml"}>
                  {`<form>
                    <div className="row">
                      <div className="col-md-6 form-group mb-3">
                        <label htmlFor="firstName1">First name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName1"
                          placeholder="Enter your first name"
                        />
                      </div>

                      <div className="col-md-6 form-group mb-3">
                        <label htmlFor="lastName1">Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName1"
                          placeholder="Enter your last name"
                        />
                      </div>

                      <div className="col-md-6 form-group mb-3">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter email"
                        />
                        <small id="emailHelp" className="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small>
                      </div>

                      <div className="col-md-6 form-group mb-3">
                        <label htmlFor="phone">Phone</label>
                        <input
                          className="form-control"
                          id="phone"
                          placeholder="Enter phone"
                        />
                      </div>

                      <div className="col-md-6 form-group mb-3">
                        <label htmlFor="credit1">Cradit card number</label>
                        <input
                          className="form-control"
                          id="credit1"
                          placeholder="Card"
                        />
                      </div>

                      <div className="col-md-6 form-group mb-3">
                        <label htmlFor="website">Website</label>
                        <input
                          className="form-control"
                          id="website"
                          placeholder="Web address"
                        />
                      </div>

                      <div className="col-md-6 form-group mb-3">
                        <label htmlFor="picker2">Birth date</label>
                        <DateTime />
                      </div>

                      <div className="col-md-6 form-group mb-3">
                        <label htmlFor="picker1">Select</label>
                        <select className="form-control">
                          <option>Option 1</option>
                          <option>Option 1</option>
                          <option>Option 1</option>
                        </select>
                      </div>

                      <div className="col-md-12">
                        <button className="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </form>`}
                </CodeViewer> */}
              </div>
            </div>
          </div>

          {/* <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <div className="card-title mb-3">Form Inputs Rounded</div>
                <form>
                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="firstName2">First name</label>
                      <input
                        type="text"
                        className="form-control form-control-rounded"
                        id="firstName2"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="lastName2">Last name</label>
                      <input
                        type="text"
                        className="form-control form-control-rounded"
                        id="lastName2"
                        placeholder="Enter your last name"
                      />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="exampleInputEmail2">Email address</label>
                      <input
                        type="email"
                        className="form-control form-control-rounded"
                        id="exampleInputEmail2"
                        placeholder="Enter email"
                      />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="phone1">Phone</label>
                      <input
                        className="form-control form-control-rounded"
                        id="phone1"
                        placeholder="Enter phone"
                      />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="credit2">Cradit card number</label>
                      <input
                        className="form-control form-control-rounded"
                        id="credit2"
                        placeholder="Card"
                      />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="website2">Website</label>
                      <input
                        className="form-control form-control-rounded"
                        id="website2"
                        placeholder="Web address"
                      />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="picker3">Birth date</label>
                      <DateTime className="form-control-rounded" />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="picker1">Select</label>
                      <select className="form-control form-control-rounded">
                        <option>Option 1</option>
                        <option>Option 1</option>
                        <option>Option 1</option>
                      </select>
                    </div>

                    <div className="col-md-12">
                      <button className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div> */}

          {/* <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <div className="card-title">Switch</div>
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch 5"
                    label="Check this switch"
                  />
                  <Form.Check
                    disabled
                    type="switch"
                    label="disabled switch"
                    id="disabled-custom-switch"
                  />
                </Form>
                <CodeViewer language={"xml"}>{`<Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Check this switch"
                  />
                  <Form.Check
                    disabled
                    type="switch"
                    label="disabled switch"
                    id="disabled-custom-switch"
                  />
                  </Form>`}
                </CodeViewer>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

const basicFormSchema = yup.object().shape({
  firstName: yup.string().required("el nombre es obligatorio"),
  lastName: yup.string().required("el apellido es obligatorio"),
  phone: yup.string().required("seleccione cualquier opción"),
  // select: yup.string().required("select any option"),
  birthDay: yup.string().required("fecha de nacimiento es requerido"),
  // cardNumber: yup
  //   .number()
  //   .test("card-validator", "Invlid card", value =>
  //     value && value.toString().length !== 16 ? false : true
  //   )
  //   .required("Card number is required"),
  email: yup
    .string()
    .email("Email es invalido")
    .required("email es requerido"),
  // checkbox1: yup.string().required("Required"),
  // checkbox2: yup.string().required("Required"),
  // switch: yup.string().required("Required")
  // password: yup
  //   .string()
  //   .min(8, "Password must be 8 character long")
  //   .required("password is required"),
  // repassword: yup
  //   .string()
  //   .required("repeat password")
  //   .oneOf([yup.ref("password")], "Passwords must match")
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(Profile);
