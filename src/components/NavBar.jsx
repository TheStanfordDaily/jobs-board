import React from 'react';
import logoImage from './logo.jpg';
import './styles.css';
import { Link } from "react-router-dom";
import StanfordLogin from '../login/StanfordLogin';
import { logout } from '../login/actions';

function NavBar( {user} ) {
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
            { // eslint-disable-next-line jsx-a11y/anchor-is-valid
            !user && <li><StanfordLogin><a className="btnSecondary">Login with Stanford</a></StanfordLogin></li>
            }
            { // eslint-disable-next-line jsx-a11y/anchor-is-valid
            user && <li><a className="btnSecondary" onClick={() => logout()}>Logout</a></li>
            }
          </ul>
        </nav>
    </div>
  );
}

export default NavBar;
