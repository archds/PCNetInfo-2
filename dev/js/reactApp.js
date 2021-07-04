import React from 'react'
import ReactDOM from "react-dom";
import {AddElementDropdown} from "./components/addElement";

export function viewPageReact() {
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
                label: 'Memory size',
                type: 'number'
            }
        ]
    }
    ReactDOM.render(<AddElementDropdown {...dropdownOptions} />, document.getElementById('addElementDropdown'))
}




