
let global = "js";
import * as util from './util/index.js';
import * as dom from './dom/index.js';

window[global] = {
    util,
    dom
}