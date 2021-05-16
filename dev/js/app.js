// JS
import * as funcs from './func'
import {sortHandler} from "./sort";
import {searchHandler} from "./search";
import {autocomplete} from "./search";

// Style
import '@fortawesome/fontawesome-free/js/all.min'
import '../style/main.scss'


function main() {
    if (window.location.pathname.startsWith('/pc/')) {
        funcs.hwTypeHandler()
        funcs.deleteHandler()
        funcs.inputsHandler()
        funcs.ramHandler()
    }
    if (window.location.href === window.location.origin + '/') {
        funcs.pcLabelHandlerMain()
    }
}

document.addEventListener('DOMContentLoaded', main)