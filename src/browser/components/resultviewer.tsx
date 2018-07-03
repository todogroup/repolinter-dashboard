import * as React from 'react';
import { PropagateLoader } from 'react-spinners';

interface Props {
  result: any,
}

interface State{
  spinner: boolean
  spinnerColor: string
}

export default class ResultViewer extends React.Component<Props, State> {
  constructor(props:any) {
    super(props);
    this.state = {
      spinner: true,
      spinnerColor:'#FFD036'
    }
  }
  
  public getFaIcon(status:boolean){
    if(status){
       return <i className="fa fa-thumbs-o-up green" aria-hidden="true"><strong>Passed</strong></i>;
    }
    else{
      return <i className="fa fa-exclamation-triangle yellow" aria-hidden="true"><strong>Failed</strong></i>;
    }
  }

  public recursiveRenderResult(object:any){
    const res = object.map((element:any) => {
     if(element.length === 1 && Array.isArray(element)){
        const singleResult = element[0];;
      return (<div>
        {this.getFaIcon(singleResult.passed)}
        <li className="list-group-item li-font" key={singleResult.message}>{" Test Type:"+ singleResult.rule.id}
        &emsp;<strong>|</strong>&emsp; {singleResult.message}</li>
        </div>);
     }
     else if (!Array.isArray(element)){
      return (<div>
        {this.getFaIcon(element.passed)}
        <li className="list-group-item li-font" key={element.message}>{" Test Type:"+ element.rule.id}
        &emsp;<strong>|</strong>&emsp; {element.message}</li>
        </div>)
     }
     else{
       return this.recursiveRenderResult(element);
     }
   });
    return res;
  }

  public async wait(ms:number){ 
  	return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async color(){
  	await this.wait(1000);
  	if(this.state.spinnerColor ==='' || this.state.spinnerColor ==='#FFD036'){
  		this.setState({
  			spinnerColor:"#97CD34"
  		});
  	}
  	else{
  		this.setState({
  			spinnerColor:'#FFD036'
  		});
  	}
  }

  public renderResult(){
    if (this.props.result.length != 0){ 
      return (this.recursiveRenderResult(this.props.result.data));
    }
    else{
      return(<div className='sweet-loading center-div'>
        <PropagateLoader
          color={this.state.spinnerColor} 
          loading={this.state.spinner}
          size={32}
        />
      </div>);
    } 	
  }

  public render() {
  	this.props.result.length == 0 && this.color();
    return (
      <div>
      {this.renderResult()}  
      </div>
    )
  }
}
