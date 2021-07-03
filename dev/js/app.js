// JS
import * as funcs from './func'
import {subOn} from "./api";
import {Toast} from "bootstrap";
import {AddElementController, LabelController, PcViewController, ViewController} from "./viewController";
import React from 'react'
import ReactDOM from 'react-dom'
import {AddElementDropdown} from "./reactApp";


// Style
import '@fortawesome/fontawesome-free/js/all.min'
import '../style/main.scss'
import {GraphQLClient} from "graphql-request";

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
    console.log('shoot pcNotify')
    const pc = data['PC']
    const notifOptions = {
        heading: pc.name,
        text: `New PC added. <a href="/pc/${pc.name}">Take a look.</a>`,
        smallText: pc.ip,
    }
    notification(notifOptions).show()
}


function main() {
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
    const client = new GraphQLClient('/api/')
    if (window.location.pathname.startsWith('/pc/')) {
        console.log(true)
        // funcs.gqSelectHandler()
        // subOn(query, pcNotify)
        const pcController = new PcViewController(client)
        pcController.inputsController()
        pcController.deleteController()
        pcController.ramController()
        pcController.typeController()
    }
    if (window.location.href === window.location.origin + '/') {
        const view = new ViewController(
            '.sort-control',
            '#filter-content',
            '#searchInput',
            client
        )
        const labelController = new LabelController(
            '.pc_label',
            client
        )
        const dropdownOptions = {
            header: 'Add PC',
            inputs: [
                {
                    id: 'pcName',
                    label: 'PC Name',
                    type: 'text'
                },
                {
                    id: 'osName',
                    label: 'OS Name',
                    type: 'text'
                },
                {
                    id: 'cpuName',
                    label: 'CPU Name',
                    type: 'text'
                },
                {
                    id: 'ram',
                    label: 'ram',
                    type: 'number'
                }
            ]
        }
        ReactDOM.render(<AddElementDropdown {...dropdownOptions} />, document.getElementById('addElementDropdown'))
        // subOn(query, view.pcLiveUpdate)
    }


}

document.addEventListener('DOMContentLoaded', main)