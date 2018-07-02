/* Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
import * as React from 'react';
import ReactTable from 'react-table';
import GithubCell from './githubcell';

import '../../../node_modules/react-table/react-table.css'


interface Props {
  orgName: string;
  orgResult: object[];
}

interface State {
}


export default class OrgRepoTable extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      orgData: []
    };
  }

  public sliceDate(date:any) {
    return date.updated_at.slice(0, 10);
  }

  public getLicense(obj:any){
    if(obj.license){
      return obj.license.name
    }
  }

  public getTable = () => {
    console.log(this.state);
    if (this.props.orgName != '') {
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
              Cell: row => <GithubCell link={row.value}/>
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
              id: 'repolinter_scan',
              accessor: d => d.toString(),
            }
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
