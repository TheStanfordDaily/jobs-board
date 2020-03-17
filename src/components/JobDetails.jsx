import React from 'react';
import Linkify from 'react-linkify';
import './styles.css';
import locationIcon from './locationIcon.png';
import buildingIcon from './buildingIcon.png';
import dollarIcon from './dollarIcon.png';
// import briefcaseIcon from './briefcaseIcon.png';
import { getJob } from '../api/actions';
import { purify } from '../utils/purify';

class JobDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: {}
    };
  }

  async componentDidMount() {
    try {
      const job = await getJob(this.props.match.params.id);
      this.setState({
        isLoaded: true,
        item: job
      });
    } catch (e) {
      console.error(e);
      this.setState({
        isLoaded: true,
        error: e
      });
    }
  }

  render() {
    const { item } = this.state;

    return (
      <div className="jobDetails">
        <div className="mainContent">
          <div className="companyLogo">
            <img src={item.companyLogo} alt="" />
          </div>
          <p className="jobTitle">{item.jobTitle}</p>
          <div className="jobFacts">
            <div className="leftCol">
              <p>
                <img src={buildingIcon} alt="" />
                <a href={item.companySite}>{item.companyName}</a>
              </p>
              <p>
                <img src={locationIcon} alt="" />
                {item.jobLocation}
            </p>
            </div>
            <div className="rightCol">
              <p>
                <img src={dollarIcon} alt="" />
                {item.jobType}
            </p>
              {/* <p>
                <img src={briefcaseIcon} alt="" className="briefcaseIcon"/>
                {item.industry}
            </p> */}
            </div>
            <div className="clear"></div>
          </div>
        <div dangerouslySetInnerHTML={{__html: purify(item.jobDescription)}} />
        </div>
        <div className="sideBar">
          <div className="greenBackground">
            <h1>How to apply</h1>
            <p><Linkify>{item.appInstructions}</Linkify></p>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    )
  }
}

export default JobDetails;