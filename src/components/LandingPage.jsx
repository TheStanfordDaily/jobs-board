import React from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import heroImage from './heroImage.svg';
import Stanford from './StanfordOval@2x.png'
import { getJobs, getArticles } from '../api/actions';
import { purify } from '../utils/purify';

export default class LandingPage extends React.Component {
  state = {
    selectedOption: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      jobs: [],
      articles: []
    };
  }


  async componentDidMount() {
    try {
      const [jobs, articles] = await Promise.all([getJobs(), getArticles()]);
      this.setState({
        isLoaded: true,
        jobs,
        articles
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
    return (
      <div className="home">
        <header>
          <img className="hero" src={heroImage} alt="" height="375px" />
          <h1>Find your dream job and contact recruiters right away.</h1>
          <Link to="/jobs" className="btnPrimary">Explore jobs</Link>
          {/*<a href="#" className="btnTertiary">Get alerts</a>  */}

        </header>
        <div className="newJobs">
          <h3>New positions</h3>
          <div className="mini">
            {this.state.jobs.slice(0, 3).map(job =>
              <Link to={"/jobs/" + job.id}>
                <div className="title">
                  {job.title}
                </div>
                <div>
                  {job.company}
                </div>
                <div className="lightTitle">
                  {job.location}
                </div>
              </Link>
            )
            }
          </div>
          <Link to="/jobs" className="seeMore">See more</Link>
        </div>

        <div className="newArticles">
          <h3>Student advice</h3>
          <div className="mini">
            {this.state.articles.map(article =>
              <a href={article.link}>
                <div className="title">
                  {purify(article.title.rendered)}
                </div>
                <div>
                  {article._embedded.author[0].name}
                </div>
              </a>
            )
            }
          </div>
          <Link to="/jobs" className="seeMore">See more</Link>
        </div>

        <div className="secondHeader">
          <div className="column">
            <img src={Stanford} alt="Stanford Oval" />
          </div>
          <div className="column">
            <div className="right">
            <div className="title">Employers</div>
            <h1>Hire talented students and new grads.</h1>
            <Link to="/post" className="btnPrimary">Post a job</Link>
          </div>
          </div>
          <div style={{clear:"both"}}></div>
        </div>
      </div>
    );
  }
}

