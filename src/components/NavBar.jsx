import React from 'react';
import logoImage from './logo.jpg';
import './styles.css';
import { Link } from "react-router-dom";
import StanfordLogin from '../login/StanfordLogin';
import { logout } from '../login/actions';

function NavBar({ user }) {
  return (
    <div>
      <nav>
        <Link to="/" className="logo">
          <img src={logoImage} alt="Stanford Daily Logo" />
          <ul>
            <li>
              <div>Job Tree</div>
            </li>
          </ul>
        </Link>
        <ul>
          <li className="leftNav"><Link to="/jobs">Jobs</Link></li>
          {/* <li><a href="/">Email alerts</a></li> */}
          <li><Link to="/advice">Student advice</Link></li>
          <li><Link to="/post" className="btnSecondary">Post a job</Link></li>
          {
            !user && <li><StanfordLogin><button className="btnSecondary">Login with Stanford</button></StanfordLogin></li>
          }
          {
            user && <li><button className="btnSecondary" onClick={() => logout()}>Logout</button></li>
          }
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
