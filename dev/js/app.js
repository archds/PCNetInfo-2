// JS
import * as funcs from './func'
import {subOn} from "./api";
import {pcCard} from "./card";
import {Toast} from "bootstrap";

// Style
import '@fortawesome/fontawesome-free/js/all.min'
import '../style/main.scss'

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
                capacity
                }
            }
        }`
    subOn(query, pcNotify)

}

document.addEventListener('DOMContentLoaded', main)