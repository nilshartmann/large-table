import React from "react";
import * as _ from "lodash";

export default class HelloMessage extends React.Component {
  render() {
    console.log("RENDERING HelloMessage");
    return (
      <div>
        {/* <input onChange={event => this.props.onUpdateValue(event.target.value)} value={this.props.state.value} /> */}
        <button onClick={this.props.onClickRow}>Click Row (React)</button>{" "}
        <button onClick={this.props.onUnclickRow}>Unlick Row (React)</button>
        <Table onUpdateChecked={this.props.onUpdateChecked} checkedSet={this.props.state.checked} />
      </div>
    );
  }
}

const ROWS = 20000;

class Table extends React.PureComponent {
  render() {
    return (
      <table>
        <tbody>
          {_.range(0, 10000).map(idx => (
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

  componentDidMount() {
    this.log = true;
  }

  toggle = e => {
    const newState = e.target.checked;
    for (let i = 0; i < 10; i++) {
      const cellId = `cell_${e.target.dataset.rowid}_${i}`;
      document.getElementById(cellId).checked = newState;
    }
  };

  registerCheckbox = checkBoxRef => {
    if (!checkBoxRef) {
      return; // schade
    }

    checkBoxRef.addEventListener("change", this.toggle);
  };

  render() {
    const rowId = this.props.idx;
    this.log && console.log("Render TableRow ", rowId);

    return (
      <tr>
        {_.range(0, 10).map(tdIdx => (
          <td id={tdIdx} key={tdIdx}>
            {/* Ursprünglicher Ansatz, State in React */}
            <input
              type="checkbox"
              id={`cell_${rowId}_${tdIdx}`}
              checked={this.props.checked ? true : false}
              onChange={this.onUpdateChecked}
            />

            {/* State Management über DOM, statt über React. Hängt nach jedem x-ten Click für einen Augenblick */}
            {/* <input type="checkbox" id={`cell_${rowId}_${tdIdx}`} data-rowid={rowId} onClick={this.toggle} /> */}

            {/* State Management über DOM auch Event Listener und Handler über nativen DOM. 
                Selbes Problem: nach jedem x-ten Click hängt die Anwendung
            */}
            {/* <input type="checkbox" id={`cell_${rowId}_${tdIdx}`} data-rowid={rowId} ref={this.registerCheckbox} /> */}

            {/* Wie ursprünglich: State über React, Changes aber nur über die Buttons, dh hier kein Listener mehr */}
            {/* <input type="checkbox" id={`cell_${rowId}_${tdIdx}`} checked={this.props.checked ? true : false} /> */}
          </td>
        ))}
      </tr>
    );
  }

  onUpdateChecked = event => {
    this.props.onUpdateChecked && this.props.onUpdateChecked(this.props.idx, event.target.checked);
  };
}
