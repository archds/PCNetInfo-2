import {pcListRender} from "./func";
import {gql, GraphQLClient} from 'graphql-request'
import {pcCard} from "./card";


// import GET_ITEMS from './graphql/queries/getView.graphql'

export class ViewController {
    pcListWrapper = document.querySelector('#pc_list')

    // TODO: make controller for notification in this class
    // TODO: make func.js in this module

    constructor(sortSelector, filterSelector, searchSelector, gqlClient) {
        this.client = gqlClient
        this.sorter = {
            element: document.querySelector(sortSelector).querySelector('ul'),
            triggers: document.querySelector(sortSelector).querySelector('ul').querySelectorAll('a')
        }
        this.filter = {
            element: document.querySelector(filterSelector),
            controllers: document.querySelector(filterSelector).querySelectorAll('button')
        }
        this.search = {
            element: document.querySelector(searchSelector),
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
        this.search.element.addEventListener('change', () => {
            // const searchValue = this.search.element.value
            // if (searchValue.length < 2) return
            this.render(this.collectViewOptions())
        })
    }

    collectViewOptions() {
        let options = {
            sort: this.sorter.element.querySelector('.active').attributes.sort.value,
            filter: {},
            search: {
                searchValue: this.search.element.value.length > 2 ? this.search.element.value : '',
                searchType: this.search.element.attributes.search.value
            }
        }
        this.filter.controllers.forEach(controller => {
            options.filter[controller.id] = this.filter.element.querySelector(`ul[aria-labelledby="${controller.id}"]`)
                .querySelector('.active').attributes.filter.value
        })
        return options
    }

    render(options) {
        const query = gql`query getView($view: ViewControllerInput!){
            getView(
                view: $view
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
        this.client.request(query, {view: options}).then(data => {
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

export class LabelController {
    constructor(selector, gqlClient) {
        this.labels = document.querySelectorAll(selector)
        this.client = gqlClient
        this.labels.forEach(label => {
            label.addEventListener('change', () => {
                const query = gql`mutation updateField($field: String, $value: String, $pcName: String){
                    updateField(
                        field: $field
                        value: $value
                        pcName: $pcName
                    )
                }`
                this.client.request(
                    query,
                    {
                        field: 'label',
                        value: label.value,
                        pcName: label.id
                    }
                ).then(data => {
                    const loader = label.parentElement.parentElement.parentElement.querySelector('.loading')
                    const card = label.parentElement.parentElement.parentElement.querySelector('.card')
                    loader.style.visibility = 'visible'
                    card.style.opacity = '0.6'
                    if (data.updateField) {
                        setTimeout(() => {
                            loader.style.visibility = 'hidden'
                            card.style.opacity = '1'
                        }, 1500)
                    } else {
                        console.log(data)
                    }
                })
            })
        })
    }
}