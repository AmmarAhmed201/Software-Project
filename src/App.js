import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Body from "./Components/Body/Body";
import AddPeople from "./Components/AddPeople/AddPeople";
import { getEmployees, deleteEmployee } from "./services/employeeServices";
import "./App.css";
import Particles from "react-particles-js";
import { loginUser } from "./services/loginServices";

class App extends Component {
  state = {
    bodyData: {
      id: "",
      aria: "",
      section: "Employees"
    },
    data: [],
    employee: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      role: ""
    },
    login: {
      email: "",
      password: ""
    }
  };

  // Get Request -- Completed
  async componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwt_decode(jwt);
      this.setState({ user });
      console.log(this.state.user);
      if (user.role === "IT") {
        const { data } = await getEmployees(jwt);
        this.setState({ data });
      }
    } catch (ex) {}
  }
  // Delete Request -- Completed
  handleDelete = async employee => {
    const data = this.state.data.filter(e => e.email !== employee);
    this.setState({ data });
    await deleteEmployee(employee);
  };

  handleUpdate = employee => {
    const data = [...this.state.data];
    const index = data.indexOf(employee);
    data[index] = { ...employee };
    this.setState({ employee });
    this.setState({ data });
  };

  onMouseClick = e => {
    const sec = e.target.id.split("-");
    const bodyData = { ...this.state.bodyData };
    bodyData.id = `v-pills-${sec[2]}`;
    bodyData.aria = `v-pills-${sec[2]}-tab`;
    bodyData.section = sec[2];
    this.setState({ bodyData });
  };

  handleChange = e => {
    const login = {
      ...this.state.login
    };
    login[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      login
    });
  };

  handleLogin = async e => {
    e.preventDefault();
    console.log(this.state.login);
    const { data: jwt } = await loginUser(
      this.state.login.email,
      this.state.login.password
    );
    localStorage.setItem("token", jwt);
    const login = {
      email: "",
      password: ""
    };
    this.setState({
      login
    });
    window.location = "/";
  };

  render() {
    const user = this.state.user;
    console.log(user);
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar user={this.state.user} />
          <Route
            path="/"
            exact
            render={props => (
              <div className="parti">
                <Particles
                  params={{
                    particles: {
                      number: {
                        value: 150
                      },
                      size: {
                        value: 5
                      }
                    },
                    interactivity: {
                      events: {
                        onhover: {
                          enable: true,
                          mode: "repulse"
                        }
                      }
                    }
                  }}
                />{" "}
                {!user && (
                  <React.Fragment>
                    <h1 className="text-center pt-5"> HR Login Form </h1>
                    <div className="login">
                      <form onSubmit={this.handleLogin} className="mt-5">
                        <label htmlFor=""> Email </label>{" "}
                        <input
                          placeholder="Email"
                          className="form-control mb-3"
                          type="text"
                          id="email"
                          name="email"
                          onChange={this.handleChange}
                          value={this.state.login.email}
                        />{" "}
                        <label htmlFor="email"> Password </label>{" "}
                        <input
                          placeholder="Password"
                          className="form-control mb-3"
                          type="text"
                          id="password"
                          name="password"
                          onChange={this.handleChange}
                          value={this.state.login.password}
                        />{" "}
                        <button className="btn btn-warning px-4">
                          {" "}
                          Login{" "}
                        </button>{" "}
                      </form>{" "}
                    </div>
                  </React.Fragment>
                )}
                {user && (
                  <div>
                    <h1 className="text-center pt-5">Hello {user.name}</h1>
                  </div>
                )}
                )}
              </div>
            )}
          />
          <Route
            path="/profile"
            exact
            render={props => (
              <div className="container-fluid">
                <div className="row">
                  <div className="dashboard col-md-2">
                    <Dashboard onClickMe={this.onMouseClick} />{" "}
                  </div>{" "}
                  <div className="info-body col-md-9 pl-5 ml-3">
                    <Body
                      data={this.state.data}
                      handleDelete={this.handleDelete}
                      handleUpdate={this.handleUpdate}
                      bodyInfo={this.state.bodyData}
                      {...props}
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            )}
          />{" "}
          <Route
            path="/AddPeople"
            render={props => (
              <div className="container-fluid">
                <div className="row">
                  <div className="dashboard col-md-2 ">
                    <Dashboard onClickMe={this.onMouseClick} />{" "}
                  </div>{" "}
                  <div className="info-body col-md-9 pl-5 ml-3">
                    <AddPeople
                      bodyInfo={this.state.bodyData}
                      handleSubmitClick={this.handleSubmitClick}
                      {...props}
                    />
                  </div>
                </div>
              </div>
            )}
          />{" "}
          <Route
            path="/Update/:id"
            render={props => (
              <div className="container-fluid">
                <div className="row">
                  <div className="dashboard col-md-2">
                    <Dashboard onClickMe={this.onMouseClick} />{" "}
                  </div>{" "}
                  <div className="info-body" />
                  <AddPeople
                    bodyInfo={this.state.bodyData}
                    employee={this.state.employee}
                    index={this.state.index}
                    handleUpdateView={this.handleUpdateView}
                    {...props}
                  />
                </div>
              </div>
            )}
          />{" "}
        </BrowserRouter>{" "}
      </div>
    );
  }
}

export default App;
