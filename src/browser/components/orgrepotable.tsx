import * as React from 'react';
import ReactTable from 'react-table';
import GithubCell from './githubcell';
import ResultCell from './resultviewcell';

import '../../../node_modules/react-table/react-table.css';

interface Props {
  orgName: string;
  orgResult: object[];
}

interface State {}

export default class OrgRepoTable extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      orgData: [],
    };
  }

  public sliceDate(date: any) {
    return date.updated_at.slice(0, 10);
  }

  public getLicense(obj: any) {
    if (obj.license) {
      return obj.license.name;
    }
  }

  public getTable = () => {
    if (this.props.orgName !== '') {
      return (
        <div key="contribution_edit_div">
          <h4>{this.props.orgName}</h4>
          <ReactTable
            data={this.props.orgResult}
            columns={[
              {
                Header: <strong>Repository</strong>,
                accessor: 'repo_name',
              },
              {
                Header: <strong>Clone Url</strong>,
                accessor: 'clone_url',
                Cell: row => <GithubCell link={row.value} />,
              },
              {
                Header: <strong>Update Date</strong>,
                id: 'updated_at',
                accessor: d => this.sliceDate(d),
              },
              {
                Header: <strong>Language</strong>,
                accessor: 'language',
              },
              {
                Header: <strong>License</strong>,
                id: 'license',
                accessor: d => this.getLicense(d),
              },
              {
                Header: <strong>RepoLinter Scan</strong>,
                accessor: 'repolinter_scan',
                Cell: row => <ResultCell scanData={row.value} />,
              },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
            filterable={true}
          />
        </div>
      );
    } else {
      return <p>Select an Org to show results</p>;
    }
  };

  public render() {
    const tables = this.getTable();
    return <div>{tables}</div>;
  }
}
