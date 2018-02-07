import React from "react";
import * as _ from "lodash";

export default class HelloMessage extends React.Component {
	render() {
		console.log("RENDERING HelloMessage");
		return (
			<div>
				<input onChange={event => this.props.onUpdateValue(event.target.value)} value={this.props.state.value} />
				<Table onUpdateChecked={this.props.onUpdateChecked} checkedSet={this.props.state.checked} />
			</div>
		);
	}
}

class Table extends React.PureComponent {
	render() {
		return (
			<table>
				<tbody>
					{_.range(0, 5000).map(idx => (
						<TableRow key={idx} idx={idx} onUpdateChecked={this.props.onUpdateChecked} checked={this.props.checkedSet[idx]} />
					))}
				</tbody>
			</table>
		);
	}
}

class TableRow extends React.Component {
	shouldComponentUpdate(nextProps) {
		return this.props.checked !== nextProps.checked;
	}
	render() {
		console.log("RENDERING TableRow");
		return (
			<tr>
				<td>
					<input type="checkbox" checked={this.props.checked ? true : false} onChange={this.onUpdateChecked} />
				</td>
				<td>
					<input type="checkbox" checked={this.props.checked ? true : false} onChange={this.onUpdateChecked} />
				</td>
				<td>
					<input type="checkbox" checked={this.props.checked ? true : false} onChange={this.onUpdateChecked} />
				</td>
				<td>
					<input type="checkbox" checked={this.props.checked ? true : false} onChange={this.onUpdateChecked} />
				</td>
				<td>
					<input type="checkbox" checked={this.props.checked ? true : false} onChange={this.onUpdateChecked} />
				</td>
				<td>
					<input type="checkbox" checked={this.props.checked ? true : false} onChange={this.onUpdateChecked} />
				</td>
				<td>
					<input type="checkbox" checked={this.props.checked ? true : false} onChange={this.onUpdateChecked} />
				</td>
				<td>
					<input type="checkbox" checked={this.props.checked ? true : false} onChange={this.onUpdateChecked} />
				</td>
				<td>
					<input type="checkbox" checked={this.props.checked ? true : false} onChange={this.onUpdateChecked} />
				</td>
				<td>
					<input type="checkbox" checked={this.props.checked ? true : false} onChange={this.onUpdateChecked} />
				</td>
			</tr>
		);
	}

	onUpdateChecked = event => {
		this.props.onUpdateChecked(this.props.idx, event.target.checked);
	};
}
