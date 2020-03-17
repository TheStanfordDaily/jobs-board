import React from 'react';
import Form from "react-jsonschema-form";
import { addJob } from '../api/actions';

class PostJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      error: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    let data = event.formData;
    try {
      await addJob(data);
      this.setState({ complete: true });
    } catch(e) {
      console.error(e);
      this.setState({ error: true });
    }
    // this.props.history.push('/payment')  // Include if need payment information
  }

  render() {
    if (this.state.complete) return <h3>Thank you! We have received your post, and we will notify you if it's approved. Please contact coo@stanforddaily.com with any further questions.</h3>;
    else if (this.state.error) return <h3>Sorry, there seems to be an error. Please contact coo@stanforddaily.com for help.</h3>;
    let schema = {
      "title": "Create your listing",
      "type": "object",
      "required": [
        "jobTitle",
        "companyName",
        "jobLocation",
        "jobType",
        "jobDescription",
        "appInstructions"
      ],
      "properties": {
        "jobTitle": {
          "type": "string",
          "title": "Job title",
          //"default": "Engineer" // Defaults used for testing
        },
        "companyName": {
          "type": "string",
          "title": "Company name",
          //"default": "Google"
        },
        "companySite": {
          "type": "string",
          "title": "Company website link",
          //"default": "google.com"
        },
        "companyLogo": {
          "type": "string",
          "format": "data-url",
          "title": "Company logo image"
        },
        "jobLocation": {
          "type": "string",
          "title": "Location",
          //"default": "San Francisco, CA"
        },
        "jobType": {
          "type": "string",
          "title": "Type of role",
          "enum": ["Internship", "Full-time", "Part-time", "On-campus"],
          //"default": "Internship"
        },
        /*
        "pay": {
            "type": "string",
            "title": "Pay",
            "default": "Unpaid"
          },
        */
        "jobDescription": {
          "type": "string",
          "title": "Job description",
          //"default": "Make things"
        },
        /*
        "schoolYear": {
          "type": "array",
          "title": "Preferred school years",
          "items": {
            "type": "string",
            "enum": [
              "Freshman",
              "Sophomore",
              "Junior",
              "Senior",
              "Masters",
              "PhD"
            ]
          },
          "uniqueItems": true,
          "default": ["Freshman"]
        },
        */
        "appInstructions": {
          "type": "string",
          "title": "Instructions for applying (must include email for applicants to contact)",
          //"default": "Send resume"
        },
        /*
        "jobDeadline": {
          "type": "string",
          "format": "date",
          "title": "Deadline to apply",
        },
      */
      }
    };
    let uiSchema = {
      "jobTitle": {
        "ui:placeholder": "Software Engineer Intern"
      },
      "companyName": {
        "ui:placeholder": "E-Solutions"
      },
      "companySite": {
        "ui:placeholder": "esolutions.com"
      },
      "companyLogo": {
        "classNames": "upload"
      },
      "jobLocation": {
        "ui:placeholder": "City, State"
      },
      "jobType": {
        "ui:placeholder": "Choose one"
      },
      "jobDescription": {
        "ui:widget": "textarea"
      },
      "appInstructions": {
        "ui:widget": "textarea"
      },
    }
    return (<div>
      <Form className="postJob" schema={schema} uiSchema={uiSchema} onSubmit={this.handleSubmit}>
        <input type="submit" className="btnSecondary" />
      </Form>
    </div>
    );
  }
}

export default PostJob;