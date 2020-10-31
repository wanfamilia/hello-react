import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'
import HelloRichardComponent from './HelloRichardComponent';
import {setupServer} from "msw/node";
import {rest} from "msw";
import {waitFor} from "@testing-library/react";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    ReactDOM.render(<HelloRichardComponent />, container);
    document.body.appendChild(container);
});

const server = setupServer(
  rest.get('http://localhost:8080/hello-world', (req, res, ctx) => {
      return res(ctx.json('hello there'))
  }),
)

afterEach(() => {
    document.body.removeChild(container);
    container = null;
    server.resetHandlers()
});


// it('renders without crashing', async () => {
//     server.listen()
//     expect(textValue('.jt_welcome')).toBe("initial message")
//     await waitFor(() => {
//         let textContent = textValue('.jt_welcome');
//         expect(textContent).toBe("hello there")
//     })
// });

function textValue(selectors) {
    return container.querySelector(selectors).textContent;
}

it('increments counter on button push', () => {
    expect(textValue('.jt_counter')).toBe('55')
    let button = container.querySelector('.jt_counter .btn')
    button.click()
    expect(textValue('.jt_counter')).toBe('58')
});

it('copies text on button push', () => {
    expect(textValue('.jt_welcome')).toBe("initial message")
    let button = container.querySelector('.jt_welcome .btn')
    button.click()
    expect(textValue('.jt_welcome')).toBe('user text')

    let input = container.querySelector('.jt_copy input')
    let newValue = "new value";
    input.value = newValue
    ReactTestUtils.Simulate.change(input);
    button.click()
    expect(textValue('.jt_welcome')).toBe(newValue)
});


