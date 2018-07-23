import * as React from 'react';
import AceEditor from 'react-ace';
import { postJSON, reqJSON } from '../../utils/fetcher';

import ResultViewer from '../components/resultviewer';

import 'brace/mode/json';
import 'brace/theme/monokai';

interface Props {}

interface State {
  ruleSetType: string;
  jsonSchema: any;
  resultView: boolean;
  scanData: object[];
  git_link: string;
}

export default class LintSingleRepo extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      ruleSetType: 'default',
      jsonSchema: '',
      resultView: false,
      scanData: [],
      git_link: '',
    };
  }

  public handleScan = (e: any) => {
    e.preventDefault();
    this.setState({
      resultView: true,
      scanData: [],
    });

    let params = null;
    if (this.state.ruleSetType === 'custom') {
      params = {
        git_link: this.state.git_link.replace(/([/])/g, '%'),
        ruleSet: JSON.parse(this.state.jsonSchema),
      };
    } else {
      params = {
        git_link: this.state.git_link.replace(/([/])/g, '%'),
        ruleSet: null,
      };
    }

    params = JSON.stringify(params);
    postJSON('/scan', params).then(scanResult =>
      this.setState({
        scanData: scanResult,
      })
    );
  };

  public componentWillMount() {
    reqJSON('/jsonSchema').then(data => {
      this.setState({
        jsonSchema: data.data,
      });
    });
  }

  public handleSchemaChange = (e: any) => {
    this.setState({
      jsonSchema: e,
    });
  };

  public handleRadioButtons = (e: any) => {
    this.setState({
      ruleSetType: e.target.value,
    });
  };

  public updateGitLink = (e: any) => {
    this.setState({
      git_link: e.target.value,
    });
  };

  public renderEditor = () => {
    return (
      this.state.ruleSetType === 'custom' && (
        <AceEditor
          mode="json"
          theme="monokai"
          onChange={this.handleSchemaChange}
          fontSize={12}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.jsonSchema}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      )
    );
  };
  public renderRadioButtons = () => {
    return (
      <div>
        <h4>
          <a href="https://github.com/todogroup/repolinter#rules">Ruleset</a>{' '}
          Type:
        </h4>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="rulesetType"
            value="default"
            onChange={this.handleRadioButtons}
            defaultChecked={true}
          />
          <label className="form-check-label">Default</label>
          &emsp; &emsp;
          <input
            className="form-check-input"
            type="radio"
            name="rulesetType"
            value="custom"
            onChange={this.handleRadioButtons}
          />
          <label className="form-check-label">Custom</label>
        </div>
      </div>
    );
  };

  public render() {
    return (
      <div>
        <div className="container padding-top">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Repository Url"
              onChange={this.updateGitLink}
              required={true}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.handleScan}
              >
                Scan
              </button>
            </div>
          </div>
        </div>
        <div id="buttons" className="padding-sides padding-top">
          {this.renderRadioButtons()}
          <div className="row">
            <div className="col-5">{this.renderEditor()}</div>
            <div className="col-7">
              {this.state.resultView && (
                <ResultViewer result={this.state.scanData} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
