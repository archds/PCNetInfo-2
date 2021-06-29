import {pcListRender} from "./func";
import {gql, GraphQLClient} from 'graphql-request'
import {pcCard} from "./card";


// import GET_ITEMS from './graphql/queries/getView.graphql'

export class ViewController {
    client = new GraphQLClient('/api')
    pcListWrapper = document.querySelector('#pc_list')

    // TODO: make controller for notification in this class
    // TODO: make func.js in this module

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
        const query = gql`{
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
        this.client.request(query).then(data => {
            pcListRender(data.getView)
        })
    }

    pcLiveUpdate(data) {
        const pc = data['PC']
        const newPC = pcCard(pc)
        newPC.querySelector('.loading').style.visibility = 'visible'
        newPC.querySelector('.card').style.opacity = '0.6'
        setTimeout(() => {
            newPC.querySelector('.loading').style.visibility = 'hidden'
            newPC.querySelector('.card').style.opacity = '1'
        }, 1500)
        this.pcListWrapper.insertBefore(newPC, this.pcListWrapper.firstChild)
    }
}