// JS
import * as funcs from './func'
import {makeQuery, subOn} from "./api";
import {pcCard} from "./card";
import {Toast} from "bootstrap";
import Search from "./search";
import Sort from "./sort";

// Style
import '@fortawesome/fontawesome-free/js/all.min'
import '../style/main.scss'
import {gqSelectHandler, pcListRender} from "./func";

function notification(options = {}) {
    const standart = {
        heading: 'PCNetInfo',
        img: '/static/img/favicon/favicon-16x16.png',
        text: 'Notification has no text. Probably it\'s test case.',
        actions: [],
        smallText: '',
        toastOptions: {
            animation: true,
            autohide: true,
            delay: 120000,
        },
        container: '.notification'
    }
    const toastOptions = options.toastOptions ? options.toastOptions : standart.toastOptions
    const toast = document.createElement('div')
    toast.setAttribute('role', 'alert')
    toast.setAttribute('aria-live', 'assertive')
    toast.setAttribute('aria-atomic', 'true')
    toast.classList.add('toast')
    toast.innerHTML = `
            <div class="toast-header">
                <img src="" class="rounded me-2" alt="...">
                <strong class="me-auto"></strong>
                <small></small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body"></div>`
    toast.querySelector('.toast-header img').src = options.img ? options.img : standart.img
    toast.querySelector('.toast-header strong').textContent = options.heading ? options.heading : standart.heading
    toast.querySelector('.toast-body').innerHTML = options.text ? options.text : standart.text
    if (options.smallText) {
        toast.querySelector('.toast-header small').textContent = options.smallText
    }
    options.container = options.container ? options.container : standart.container
    document.querySelector(options.container).appendChild(toast)
    return new Toast(toast, toastOptions)
}

function pcNotify(data) {
    const pc = data['PC']
    if (window.location.href === window.location.origin + '/') {
        const pcList = document.querySelector('#pc_list')
        const newPC = pcCard(pc)
        newPC.querySelector('.loading').style.visibility = 'visible'
        newPC.querySelector('.card').style.opacity = '0.6'
        setTimeout(() => {
            newPC.querySelector('.loading').style.visibility = 'hidden'
            newPC.querySelector('.card').style.opacity = '1'
        }, 1500)
        pcList.insertBefore(newPC, pcList.firstChild)
    }
    if (window.location.pathname.startsWith('/pc/')) {
        const notifOptions = {
            heading: pc.name,
            text: `New PC added. <a href="/pc/${pc.name}">Take a look.</a>`,
            smallText: pc.ip,
        }
        notification(notifOptions).show()
    }
}

function test() {
    if (window.location.pathname.startsWith('/pc/')) {
        let notifOptions = {
            toastOptions: {
                delay: 1200000
            }
        }
        const testToast = notification(notifOptions)
        setTimeout(() => {
            testToast.show()
        }, 2000)
    }
}

class ViewController {
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
                this.render(this.collectViewOptions())
            })
        })
    }

    collectViewOptions() {
        return {
            sort: this.sorter.element.querySelector('.active').attributes.sort.value,
            filter: {
                serialNumber: this.filter.element.querySelector('ul[aria-labelledby="serialNumber"]')
                    .querySelector('.active').attributes.filter.value
            }
        }
    }

    render(options) {
        const query = `{
            getFilteredItems(
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
            pcListRender(data.data.getFilteredItems)
        })
    }
}

function main() {
    if (window.location.pathname.startsWith('/pc/')) {
        funcs.hwTypeHandler()
        funcs.deleteHandler()
        funcs.inputsHandler()
        funcs.ramHandler()
        funcs.gqSelectHandler()
    }
    if (window.location.href === window.location.origin + '/') {
        funcs.pcLabelHandlerMain()
        const view = new ViewController('.sort-control', '#filter-content')
        const mainpageSearch = new Search('#searchInput', ['name'])

    }
    const query = `subscription {
        PC {
            name
            ip
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
    subOn(query, pcNotify)

}

document.addEventListener('DOMContentLoaded', main)