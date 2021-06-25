import {pcCard} from "./card";
import {pcListRender} from "./func";
import {makeQuery} from "./api";

export default class Search {
    constructor(selector, keys) {
        this.selector = selector
        this.keys = keys
        const searchInput = document.querySelector(selector)
        searchInput.addEventListener('change', () => {
            if (this.value.length > 2) {
                this.render(this.search())
            } else if (this.value.length === 0) {
                this.data.then(data => {
                    this.render(data)
                })
            }
        })
    }
    get value() {
        return document.querySelector(this.selector).value
    }
    search(data) {
        const result = []
        this.data.then(data => {
            data.forEach(item => {
                this.keys.forEach(key => {
                    if (item[key].includes(this.value)) {
                        result.push(item)
                    }
                })
            })
        })
        return result
    }
    render(items) {
        pcListRender(items)
    }
}