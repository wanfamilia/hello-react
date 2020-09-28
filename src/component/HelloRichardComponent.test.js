import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'
import HelloRichardComponent from './HelloRichardComponent';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    ReactDOM.render(<HelloRichardComponent />, container);
    document.body.appendChild(container);
});

it('renders without crashing', () => {
    expect(container.querySelector('.jt_welcome').textContent).toBe("Error Processing Request")
});

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
    expect(textValue('.jt_welcome')).toBe("Error Processing Request")
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


