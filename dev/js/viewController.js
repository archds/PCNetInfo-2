import {pcListRender} from "./func";
import {makeQuery} from "./api";
// import GET_ITEMS from './graphql/queries/getView.graphql'

export class ViewController {
    // TODO: make controller for notification in this class

    constructor(sortSelector, filterSelector, searchSelector) {
        this.sorter = {
            element: document.querySelector(sortSelector).querySelector('ul'),
            triggers: document.querySelector(sortSelector).querySelector('ul').querySelectorAll('a')
        }
        this.filter = {
            element: document.querySelector(filterSelector),
            controllers: document.querySelector(filterSelector).querySelectorAll('button')
        }
        this.sorter.triggers.forEach(trigger => {
            trigger.parentElement.addEventListener('click', () => {
                this.sorter.triggers.forEach(trigger => {
                    trigger.classList.remove('active')
                })
                trigger.classList.add('active')
                this.render(this.collectViewOptions())
            })
        })
        this.filter.controllers.forEach(controller => {
            const triggers = this.filter.element.querySelector(`ul[aria-labelledby="${controller.id}"]`)
                .querySelectorAll('li')
            triggers.forEach(trigger => {
                trigger.addEventListener('click', () => {
                    triggers.forEach(trigger => {
                        trigger.firstElementChild.classList.remove('active')
                    })
                    trigger.firstElementChild.classList.add('active')
                    controller.querySelector('.selected').textContent = trigger.firstElementChild.textContent
                    this.render(this.collectViewOptions())
                })
            })
        })
    }

    collectViewOptions() {
        let options = {
            sort: this.sorter.element.querySelector('.active').attributes.sort.value,
            filter: {
                serialNumber: this.filter.element.querySelector('ul[aria-labelledby="serialNumber"]')
                    .querySelector('.active').attributes.filter.value
            }
        }
        this.filter.controllers.forEach(controller => {
            options.filter[controller.id] = this.filter.element.querySelector(`ul[aria-labelledby="${controller.id}"]`)
                    .querySelector('.active').attributes.filter.value
        })
        return options
    }

    render(options) {
        const query = `query {
            getView(
            view: {
                sort: "${options.sort}"
                filter: {
                    serialNumber: ${options.filter.serialNumber}
                }
            }
            ) {
                    name
                    ip
                    label
                    cpu {
                        clock
                        cores
                        threads
                        }
                    videocard {
                        name
                        }
                    ram {
                        size
                        }
                    }
                }`
        makeQuery(query).then(data => {
            pcListRender(data.data.getView)
        })

    }
}