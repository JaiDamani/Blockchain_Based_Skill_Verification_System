import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Card, Dropdown, Form, Message } from "semantic-ui-react";
import "./NoRole.css";
import { messageAdmin } from "../../firebase/api.js";

class NoRole extends Component {
  //let stringofskills=""

  state = {
    name: "",
    location: "",
    description: "",
    role: 0,
    loading: false,
    errorMessage: "",
    message: "",
    resume: "",
    skillset: "",
  };

  roleOptions = [
    {
      key: "0",
      text: "No-Role-Selected",
      value: "0",
    },
    {
      key: "1",
      text: "Employee",
      value: "1",
    },
    {
      key: "2",
      text: "OrganizationEndorser",
      value: "2",
    },
    {
      key: "3",
      text: "Admin",
      value: "3",
    },
    
  ];

  handleDropdownSelect = (e, data) => {
    this.setState({ role: data.value });
  };

  fileChange = async () => {
    const axios = require("axios").default;
    const FormData = require("form-data");
    const form = new FormData();
    let file = document.getElementById("resume").files[0];
    form.append("providers", "affinda");
    form.append("file", file);
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/ocr/resume_parser",
      headers: {
        authorization:
          //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYThmOTJkOWItZDZkOC00YWVjLTkxZDktM2Y3ZWJiYmYwNGI2IiwidHlwZSI6InNhbmRib3hfYXBpX3Rva2VuIn0.MTib15-QqpR7l1X7wV9D7x0dt9YKDcM0ENPzlHdPGVM",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYThmOTJkOWItZDZkOC00YWVjLTkxZDktM2Y3ZWJiYmYwNGI2IiwidHlwZSI6ImFwaV90b2tlbiJ9.qniGQAQ7Cg9rNLiaBjYQ-OG2Hbd-vRWGhp7zTWiISr4",
          "Content-Type": "multipart/form-data;",
      },
      data: form
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        console.log("affinda", response.data.affinda.extracted_data.skills);
        let affinda = response.data.affinda.extracted_data.skills;
        // console.log(
        //   "hireability",
        //   response.data.hireability.extracted_data.skills
        // );
        // let hireability = response.data.hireability.extracted_data.skills;
        let stringofskills = "";
        for (let i = 0; i < affinda.length; i++) {
          stringofskills += affinda[i].name + ", ";
        }
        stringofskills = stringofskills.substring(0, stringofskills.length - 2);
        console.log(stringofskills);
        this.state.skillset=stringofskills;
        return stringofskills;
      })
      .catch((err) => {
        console.log("error here", err);
      });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleFileChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
    let stringofskills=this.fileChange();
    this.state.skillset=stringofskills;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const info = {
      name: this.state.name,
      description: this.state.description,
      role: this.state.role,
      location: this.state.location,
      resume: this.state.resume,
      skillset: this.state.skillset,
    };
    console.log(info.skillset);
    await messageAdmin(info, this.state.message);
    this.setState({
      name: "",
      description: "",
      role: "0",
      location: "",
      message: "",
      resume: "",
      skillset: "",
      loading: false,
    });
  };

  render() {
    return (
      <div id="two-divs">
        <div className="norole">
          <Card className="card-style">
            <Card.Content>
              <Card.Header centered>
                <h2 className="card-heading">Message Admin</h2>
              </Card.Header>
              <hr className="horizontal-line"></hr>
              <br></br>
              <Form error={!!this.state.errorMessage}>
                <Form.Field className="form-inputs-admin">
                  <input
                    id="name"
                    placeholder="Your Name"
                    autoComplete="off"
                    autoCorrect="off"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <br />
                <Form.Field className="form-inputs-admin">
                  <input
                    id="location"
                    placeholder="Your Location"
                    autoComplete="off"
                    autoCorrect="off"
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <br />
                <Form.Field className="form-inputs-admin">
                  <input
                    id="description"
                    placeholder="Brief Description"
                    autoComplete="off"
                    autoCorrect="off"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <br />
                <Form.Field className="form-inputs-admin">
                  <Dropdown
                    placeholder="Desired Role"
                    fluid
                    selection
                    options={this.roleOptions}
                    onChange={this.handleDropdownSelect}
                  />
                </Form.Field>
                <br />
                <Form.Field className="form-inputs-admin">
                  <input
                    id="resume"
                    type="file"
                    placeholder="Choose a file"
                    value={this.state.resume}
                    onChange={this.handleFileChange}
                  />
                </Form.Field>
                <br />
                <Form.Field className="form-inputs-admin">
                  <input
                    id="skillset"
                    type="hidden"
                    value={this.state.skillset}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <br />
                <Form.Field className="form-inputs-admin">
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Short Message for Admin"
                    autoComplete="off"
                    autoCorrect="off"
                    value={this.state.message}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <br />
                <Message
                  error
                  header="Oops!!"
                  content={this.state.errorMessage}
                />
                <br />
                <div className="button-holder">
                  <Button
                    className="button-css-admin"
                    type="submit"
                    onClick={this.handleSubmit}
                    loading={this.state.loading}
                  >
                    Send
                  </Button>
                </div>
              </Form>
            </Card.Content>
          </Card>
          <br />
        </div>
        <div id="seconddiv2">
          <h2>Send a request to the admin to be added to the system</h2>
        </div>
      </div>
    );
  }
}

export default withRouter(NoRole);
