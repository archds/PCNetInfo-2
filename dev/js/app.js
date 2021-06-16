// JS
import * as funcs from './func'
import {subOn} from "./api";
import {pcCard} from "./card";

// Style
import '@fortawesome/fontawesome-free/js/all.min'
import '../style/main.scss'

function pcNotify(data) {
    const pcList = document.querySelector('#pc_list')
    const newPC = pcCard(data)
    setTimeout(() => {
        newPC.querySelector('.loading').style.visibility = 'hidden'
        newPC.querySelector('.card').style.opacity = '1'
    }, 1500)
    pcList.insertBefore(newPC, pcList.firstChild)
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