import React from 'react';
import ReactDOM from 'react-dom';
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import { waitFor } from '@testing-library/react';

import SUT from './HelloWorldStringComponent';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    ReactDOM.render(<SUT />, container);
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

beforeAll(() => server.listen())
afterAll(() => server.close())

it('has a welcome message', async () => {
    expect(container.querySelector('.container').textContent).toBe("initial message")
    await waitFor(() => {
        let textContent = container.querySelector('.container').textContent;
        expect(textContent).toBe("hello there")
    })
});