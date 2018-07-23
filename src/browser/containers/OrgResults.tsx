import * as React from 'react';
import Select from 'react-select';
import '../../../node_modules/react-select/dist/react-select.css';
import { reqJSON } from '../../utils/fetcher';
import OrgRepoTable from '../components/orgrepotable';

interface Props {
  params: any;
}

interface State {
  orgs: object[];
  currentorg: string;
  orgData: object[];
}

export default class OrgResults extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      orgs: [],
      currentorg: '',
      orgData: [],
    };
  }

  public componentWillMount() {
    reqJSON('/orglist').then(data =>
      this.setState({
        orgs: data.data,
      })
    );
  }

  public getProcessedList(orgList: object[]) {
    return orgList.map((obj: any) => {
      return {
        label: obj.org_name,
        value: obj.org_name,
      };
    });
  }

  public renderTable() {
    if (this.state.currentorg !== '') {
      return (
        <OrgRepoTable
          orgName={this.state.currentorg}
          orgResult={this.state.orgData}
        />
      );
    }
    return <div />;
  }

  public handleOrgChange = (e: any) => {
    this.setState({
      currentorg: e.value,
    });
    reqJSON('/orgresult/' + e.value).then(listObject =>
      this.setState({
        orgData: listObject.data,
      })
    );
  };

  public render() {
    return (
      <div id="orgResults" className="container padding-top">
        <Select
          id="state-select"
          placeholder="Select Organisation"
          options={this.getProcessedList(this.state.orgs)}
          onChange={this.handleOrgChange}
          required={true}
          value={this.state.currentorg}
          menuContainerStyle={{ zIndex: 4 }}
          openOnFocus={true}
          clearable={true}
        />
        {this.renderTable()}
      </div>
    );
  }
}
