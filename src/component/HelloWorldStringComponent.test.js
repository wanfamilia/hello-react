import React from 'react';
import ReactDOM from 'react-dom';

import SUT from './HelloWorldStringComponent';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    ReactDOM.render(<SUT />, container);
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('has a welcome message', async () => {
    expect(container.querySelector('.jt_message').textContent).toBe("initial message")
});