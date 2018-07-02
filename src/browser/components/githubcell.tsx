import * as React from 'react';
import '../../../node_modules/font-awesome/css/font-awesome.css'

interface Props {
 link: string
}

export default class GithubCell extends React.Component<Props> {

public render(){
 return(
	<div className="center">
	<a href={this.props.link}>
	<i className="fa fa-github fa-2x"></i></a>
 	</div>
  )
 }
}