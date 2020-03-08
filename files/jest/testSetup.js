/**
 * Defines the React 16 Adapter for Enzyme. 
 *
 * @link http://airbnb.io/enzyme/docs/installation/#working-with-react-16
 * @copyright 2017 Airbnb, Inc.
 */
const jsdom = require('jsdom');
const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>');

const { window } = dom;
enzyme.configure({ adapter: new Adapter() });
global.window = window;
global.document = window.document;