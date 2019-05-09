import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getEmployees } from "../../services/employeeServices";
import "./Body.css";

class Body extends Component {
  state = {};

  render() {
    const { data, bodyInfo } = this.props;
    return (
      <React.Fragment>
        <div className="body-section">
          <div className="section-title pl-4">
            <h1 className="text-center pt-5">{bodyInfo.section} Section</h1>
          </div>
          <Link to="/AddPeople" className="btn btn-warning add-button">
            Add {bodyInfo.section}
          </Link>
          <div className="table-area pt-4">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <Link to={`/Update/${item.name}`}>
                        <button
                          onClick={() => this.props.handleUpdate(item)}
                          className="btn btn-info btn-sm"
                        >
                          Update
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => this.props.handleDelete(item.email)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Body;
