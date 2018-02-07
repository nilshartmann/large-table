import React from "react";
import ReactDOM from "react-dom";

import HelloMessage from "./HelloMessage";

function renderImpl() {
	const mountNode = document.getElementById("mount");
	console.time("render");
	ReactDOM.render(<HelloMessage onUpdateValue={updateValue} onUpdateChecked={updateChecked} state={state} />, mountNode);
	console.timeEnd("render");
}

// const render = _.throttle(renderImpl, 16);
const render = renderImpl;

let state = {
	value: "",
	checked: {}
};

function updateValue(value) {
	console.time("updateValue");
	state = { ...state, value };
	console.timeEnd("updateValue");
	render();
}

function updateChecked(idx, checked) {
	console.time("updateChecked");
	state = { ...state, checked: { ...state.checked, [idx]: checked } };
	console.timeEnd("updateChecked");
	render();
}

render();
