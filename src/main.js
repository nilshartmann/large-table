import React from "react";
import ReactDOM from "react-dom";

import HelloMessage from "./HelloMessage";

function renderImpl() {
  const mountNode = document.getElementById("mount");
  console.time("render");
  ReactDOM.render(
    <HelloMessage onUpdateChecked={updateChecked} state={state} onClickRow={onClickRow} onUnclickRow={onUnclickRow} />,
    mountNode
  );
  console.timeEnd("render");
}

// const render = _.throttle(renderImpl, 16);
const render = renderImpl;

let state = {
  value: "",
  checked: {}
};

let currentRow = 0;

// function updateValue(value) {
// 	console.time("updateValue");
// 	state = { ...state, value };
// 	console.timeEnd("updateValue");
// 	render();
// }

function onClickRow() {
  updateChecked(currentRow, !state.checked[currentRow]);
  currentRow++;
}

function onUnclickRow() {
  currentRow--;
  if (currentRow < 0) {
    currentRow = 0;
  }

  updateChecked(currentRow, !state.checked[currentRow]);
}

function updateChecked(idx, checked) {
  console.time("updateChecked");
  state = { ...state, checked: { ...state.checked, [idx]: checked } };
  console.timeEnd("updateChecked");
  render();
}

render();
