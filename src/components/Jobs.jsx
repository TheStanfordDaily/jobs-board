import React from 'react';
import './styles.css';
import locationIcon from './locationIcon.png';
import buildingIcon from './buildingIcon.png';
import dollarIcon from './dollarIcon.png';
import Select from 'react-select';
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import { getJobs } from '../api/actions';
import { purify } from '../utils/purify';

const typeOptions = [
  { value: 'Internship', label: 'Internship' },
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'On-campus', label: 'On-campus' },
];

class Jobs extends React.Component {
  state = {
    selectedOption: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filteredItems: []
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(val) {
    var filteredItems = [];
    if (!val) { // if an element is unselected (small X), so the value is null...
      filteredItems = this.state.items;
      console.log("it's this")
    }
    else if (val.length === 0) {  // if all selections are cleared (the big X is clicked)...
      filteredItems = this.state.items; // reset items
    }
    else { // else if an element is selected...
      var i;
      const filterFn = (item) => {  // only show items equal to the value passed in
        return (item.jobLocation === val[i].value) || (item.jobType === val[i].value.toLowerCase());
      };
      for (i = 0; i < val.length; i++) {
        filteredItems = filteredItems.concat(this.state.items.filter(filterFn));
      }
    }
    this.setState({ filteredItems: filteredItems });
  }

  async componentDidMount() {
    try {
      const jobs = await getJobs();
      this.setState({
        isLoaded: true,
        items: jobs,
        filteredItems: jobs
      });
    } catch (e) {
      console.error(e);
      this.setState({
        isLoaded: true,
        error: e
      });
    }
  }

  searchKey = (e) => {
    const term = e.target.value;
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "jobTitle",
        "jobDescription",
        "companyName",
        "jobLocation"
      ]
    };
    const fuse = new Fuse(this.state.items, options);
    const filteredItems = fuse.search(term).map(e => e.item);
    console.log(filteredItems);
    this.setState({
      filteredItems
    });
  }

  render() {
    const { selectedOption } = this.state;
    const uniqueLocations = [...new Set(this.state.items.map(item => item.jobLocation))].sort(); // creates array of unique locations
    var locationOptions = [];
    for (let i = 0; i < uniqueLocations.length; i++) {  // adds array to object for select options
      locationOptions.push({ "value": uniqueLocations[i], "label": uniqueLocations[i] });
    }

    // const uniqueIndustries = [...new Set(this.state.items.map(item => item.industry))].sort(); // creates array of unique locations
    var industryOptions = [];
    // for (let i = 0; i < uniqueIndustries.length; i++) {  // adds array to object for select options
    //   industryOptions.push({ "value": uniqueIndustries[i], "label": uniqueIndustries[i] });
    // }

    return (
      <div>
        {/*
          <header>
            <img className="hero" src={heroImage} alt="" height="375px" />
            <h1>Find your dream job and contact recruiters right away.</h1>
            {/* <HashLink to="/#jobsAnchor" className="btnPrimary">Explore jobs</HashLink>
            <a href="#" className="btnTertiary">Get alerts</a> 
          </header>
          */}
        <div className="sideBar mobile">
          <div className="greenBackground">
            <h1>What's this?</h1>
            <p>Job Tree connects Stanford students directly to opportunities at companies and organizations. There's no online application here: we'll give you contact information and you can start talking to real employees and recruiters right away.</p>
          </div>
        </div>
        <div id="jobsAnchor" className="mainContent">
          <div className="jobFilters">
            <input type="search" id="searchInput" onChange={e => this.searchKey(e)} placeholder="Search by title, description, company, etc." name="search" />
            <div className="filter-row">
              <label>Job types</label>
              <label>Industries</label>
              <label>Locations</label>
            </div>
            <div className="filter-row">
              <div>
                <Select
                  value={selectedOption} isMulti
                  placeholder={'All types'}
                  onChange={this.handleChange}
                  options={typeOptions}
                  theme={theme => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#9FE5D8',
                      primary: '#11BF9F',
                    },
                  })}
                />
              </div>
              <div>
                <Select
                  value={selectedOption} isMulti
                  placeholder={'All industries'}
                  onChange={this.handleChange}
                  options={industryOptions}
                  theme={theme => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#9FE5D8',
                      primary: '#11BF9F',
                    },
                  })}
                />
              </div>
              <div>
                <Select
                  value={selectedOption} isMulti
                  placeholder={'All locations'}
                  onChange={this.handleChange}
                  options={locationOptions}
                  theme={theme => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#9FE5D8',
                      primary: '#11BF9F',
                    },
                  })}
                />
                {/* <div>{this.state.filter}</div> */}
              </div>
            </div>
          </div>
          {this.state.isLoaded &&
            <div className="lightTitle">{this.state.filteredItems.length} jobs found</div>
          }
          {!this.state.isLoaded &&
            <div className="lightTitle">Loading...</div>
          }
          <ul id="jobList" className="list">
            {this.state.filteredItems.map(job => <JobCard
              title={job.jobTitle}
              logo={job.companyLogo}
              company={job.companyName}
              location={job.jobLocation}
              excerpt={job.jobDescription}
              type={job.jobType}
              id={job.id} />
            )}
          </ul>
        </div>
        <div className="sideBar desktop">
          <div className="greenBackground">
            <h1>What's this?</h1>
            <p>Job Tree connects Stanford students directly to opportunities at companies and organizations. There's no online application here: we'll give you contact information and you can start talking to real employees and recruiters right away.</p>
          </div>
        </div>
        <div className="clear"></div>
      </div>);
  }
}


function JobCard(props) {
  return (
    <div>
      <li>
        <Link to={"/jobs/" + props.id}>
          <div className="companyLogo">
            <img src={props.logo} alt="" />
          </div>
          <div className="jobTitle">{props.title}</div>
          <div className="jobFacts">
            <span>
              <img className="icon" src={buildingIcon} alt="" />
              {props.company}
            </span>
            <span>
              <img className="icon" src={locationIcon} alt="" />
              {props.location}
            </span>
            <span>
              <img className="icon" src={dollarIcon} alt="" />
              {props.type}
            </span>
          </div>
          <div className="jobExcerpt"  dangerouslySetInnerHTML={{__html: purify(props.excerpt)}} />
        </Link>
      </li>
    </div>
  );
}

export default Jobs;
