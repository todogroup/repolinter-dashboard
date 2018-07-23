import * as React from 'react';
import Select from 'react-select';
import { reqJSON } from '../../utils/fetcher';

interface Props {}

interface State {
  orgs: any;
  removeOrg: string;
  addOrg: string;
}

export default class Admin extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      orgs: [],
      removeOrg: '',
      addOrg: '',
    };
  }

  public componentWillMount() {
    reqJSON('/orglist').then(data =>
      this.setState({
        orgs: data.data,
      })
    );
  }

  handleRemoveOrg = (e: any) => {
    this.setState({
      removeOrg: e.value,
    });
  };

  handleAddOrg = (e: any) => {
    this.setState({
      addOrg: e.target.value,
    });
  };

  handleRemoveRequest = () => {
    reqJSON('/removeorg/' + this.state.removeOrg);
  };

  handleAddRequest = () => {
    reqJSON('/addorg/' + this.state.addOrg);
  };

  public render() {
    return (
      <div className="container padding-top">
        <p className="fancy">Add org</p>
        <div className="input-group mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Org Url"
            onChange={this.handleAddOrg}
            required={true}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleAddRequest}
            >
              Submit
            </button>
          </div>
        </div>
        <p className="fancy">Remove org</p>
        <div className="input-group mb-5">
          <Select
            id="state-select"
            placeholder="Select Org"
            options={this.state.orgs.map((obj: any) => {
              return { label: obj.org_name, value: obj.org_name };
            })}
            required={true}
            value={this.state.removeOrg}
            onChange={this.handleRemoveOrg}
            menuContainerStyle={{ zIndex: 4 }}
            openOnFocus={true}
            clearable={true}
            className="flex"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleRemoveRequest}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }
}
