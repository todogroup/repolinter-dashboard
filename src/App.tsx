import * as React from 'react';
import { Link, Route, Router, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/react-bootstrap-sweetalert/lib/css/animations.css';
import history from './history';
import logo from './logo.png';
import './style/custom.css';

import Admin from './browser/containers/Admin';
import Lint from './browser/containers/LintSingleRepo';
import Org from './browser/containers/OrgResults';

class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div>
              <a className="navbar-brand" href="/">
                <img src={logo} />
                <small className="text-muted"> Dashboard</small>
              </a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav ml-auto">
                <div className="collapse navbar-collapse">
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link">
                      Admin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/lint" className="nav-link">
                      Lint Repo
                    </Link>
                  </li>
                </div>
                <li className="nav-item">
                  <Link to="/org" className="nav-link">
                    Org Results
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    target="_blank"
                    href="https://github.com/amzn/dashboard-for-repolinter/issues"
                    className="nav-link"
                  >
                    <i className="fa fa-question-circle" /> Help
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div id="router-div">
            <Switch>
              <Route
                exact={true}
                path="/admin"
                component={Admin}
                key="adminRoute"
              />
              <Route
                exact={true}
                path="/lint"
                component={Lint}
                key="lintSingleRepo"
              />
              <Route
                exact={true}
                path="/org"
                component={Org}
                key="orgresults"
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
