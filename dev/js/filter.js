import {pcListRender} from "./func";
import {pcCard} from "./card";
import {viewController} from "./func";

export default class Filter {
    constructor(selector) {
        this.HTMLElement = document.querySelector(selector)
        this.filters = [
            'serialNumber'
        ]
        this.result = []
    }
    get id() {
        return this.HTMLElement.id
    }
    get options() {
        if (this.HTMLElement.nextElementSibling.classList.contains('dropdown-menu')) {
            return this.HTMLElement.nextElementSibling.children
        } else {
            throw 'Unable to find dropdown!'
        }
    }
    serialNumber() {
        const trigger = {
            any() {

            }
        }
    }
}