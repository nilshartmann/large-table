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
          {_.range(0, 1000).map(idx => (
            <TableRow
              id={idx}
              key={idx}
              idx={idx}
              onUpdateChecked={this.props.onUpdateChecked}
              checked={this.props.checkedSet[idx]}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

class TableRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    const x = this.props.checked !== nextProps.checked;
    return x;
  }

  toggle = e => {
    console.log(e);
  };

  render() {
    console.log("RENDERING TableRow");
    const rowId = this.props.idx;

    return (
      <tr>
        {_.range(0, 10).map(tdIdx => (
          <td id={tdIdx} key={tdIdx}>
            <input
              type="checkbox"
              id={`cell_${rowId}_${tdIdx}`}
              checked={this.props.checked ? true : false}
              onChange={this.onUpdateChecked}
            />
          </td>
        ))}
      </tr>
    );
  }

  onUpdateChecked = event => {
    this.props.onUpdateChecked && this.props.onUpdateChecked(this.props.idx, event.target.checked);
  };
}
