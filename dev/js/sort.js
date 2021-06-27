export default class Sort {
    constructor(sortWrapperSelector) {
        this.sorter = document.querySelector(sortWrapperSelector).querySelector('ul')
        this.triggers = this.sorter.querySelectorAll('a')
    }
    label() {
        this.triggers.querySelector('a[sort="label"]').addEventListener('click', () => {
            const query = ``
        })
    }
}