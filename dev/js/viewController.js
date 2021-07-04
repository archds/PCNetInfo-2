import {pcListRender} from "./func";
import {gql} from 'graphql-request'
import {pcCard} from "./components/card";


// import GET_ITEMS from './graphql/queries/getView.graphql'

export class ViewController {
    pcListWrapper = document.querySelector('#pc_list')

    // TODO: make controller for notification in this class

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

export class PcViewController {
    constructor(gqlClient) {
        this.inputs = document.querySelector('.pc_view').querySelectorAll('input')
        this.textareas = document.querySelector('.data').querySelectorAll('textarea')
        this.formFactorSelect = document.querySelector('#form_factor')
        this.banks = document.querySelectorAll('input[id^=ram]')
        this.addRamButton = document.querySelector('#addRam')
        this.pcName = document.querySelector('#pc_name').value
        this.delButton = document.querySelector('#delete')
        this.hwTypeImg = document.querySelector('#hw_type')
        this.hwTypePopup = document.querySelector('#hw_type_popup')
        this.hwTypeButton = this.hwTypeImg.parentElement.querySelector('.dots')
        this.client = gqlClient
    }

    deleteController() {
        this.delButton.addEventListener('click', () => {
            const query = gql`mutation deletePC($pcName: String) {
                deletePC(pcName: $pcName)
            }`
            this.client.request(query, {pcName: this.pcName}).then(data => {
                if (data.deletePC) {
                    window.location.assign(window.location.origin)
                }
            })
        })
    }

    inputsController() {
        this.inputs.forEach((input) => {
            input.addEventListener('change', () => {
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
                        field: input.id,
                        value: input.value,
                        pcName: this.pcName
                    }
                ).then(data => {
                    if (data.updateField) {
                        input.parentElement.classList.toggle('saved')
                        setTimeout(() => {
                            input.parentElement.classList.toggle('saved')
                        }, 1000)
                    } else {
                        console.log(data)
                    }
                })
            })
        })

        this.textareas.forEach((input) => {
            input.addEventListener('change', () => {
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
                        field: input.id,
                        value: input.value,
                        pcName: this.pcName
                    }
                ).then(data => {
                    if (data.updateField) {
                        input.parentElement.classList.toggle('saved')
                        setTimeout(() => {
                            input.parentElement.classList.toggle('saved')
                        }, 1000)
                    } else {
                        console.log(data)
                    }
                })
            })
        })
    }

    ramController() {
        if (!this.banks[0].parentElement.parentElement.querySelectorAll('p.hide').length) {
            this.addRamButton.style.display = 'none'
        }
        this.addRamButton.addEventListener('click', () => {
            for (let bank of this.banks) {
                if (bank.parentElement.classList.contains('hide')) {
                    bank.parentElement.classList.remove('hide')
                    break
                }
            }
            if (!this.banks[0].parentElement.parentElement.querySelectorAll('p.hide').length) {
                this.addRamButton.style.display = 'none'
            }
        })

        for (let bank of this.banks) {
            const ramSumElement = bank.parentElement.parentElement.querySelector('p.head span')
            bank.addEventListener('input', () => {
                if (!bank.parentElement.querySelectorAll('span').length) {
                    let valueHolder = document.createElement('span')
                    valueHolder.textContent = 'GB'
                    bank.parentElement.appendChild(valueHolder)
                }
                let ram_sum = 0
                for (let item of this.banks) {
                    if (item.value) ram_sum += parseInt(item.value)
                }
                ramSumElement.textContent = `${ram_sum} GB`
            })
            bank.addEventListener('change', () => {
                if (!bank.value) bank.parentElement.classList.add('hide')
                const query = gql`mutation updateRamSize($ramSize: String!, $pcName: String!) {
                    updateField(field: "ram", value: $ramSize, pcName: $pcName)
                }`
                this.client.request(query, {ramSize: ramSumElement.textContent.replace(' GB', ''), pcName: this.pcName})
            })
        }
    }

    typeController() {
        this.hwTypeButton.addEventListener('click', () => {
            this.hwTypePopup.classList.remove('animate__slideOutRight')
            this.hwTypePopup.classList.add('animate__slideInRight', 'active')
        })
        for (let node of this.hwTypePopup.children) {
            node.addEventListener('click', () => {
                let img = node.children[0]
                this.hwTypeImg.src = img.src
                this.hwTypePopup.classList.add('animate__slideOutRight')
                this.hwTypePopup.classList.remove('animate__slideInRight', 'active')
                let hw_type = node.id
                const query = gql`mutation updateType($value: String, $pcName: String){
                    updateField(
                        field: "type"
                        value: $value
                        pcName: $pcName
                    )
                }`
                this.client.request(
                    query,
                    {
                        value: node.id,
                        pcName: this.pcName
                    }
                )
            })
        }
    }

    formFactorController() {
        this.formFactorSelect.addEventListener('change', () => {
            const query = gql`mutation updateFormFactor($value: String!, $pcName: String!) {
                updateField(field: "form_factor", value: $value, pcName: $pcName)
            }`
            this.client.request(query, {value: this.formFactorSelect.value, pcName: this.pcName})
        })
    }
}

export class AddElementController {
    constructor(gqlClient, elementName) {
        this.inputs = document.querySelectorAll('input')
        this.submit = document.querySelector('#add')
        this.elementName = elementName
        this.client = gqlClient
        this.handleClick()
    }

    validate(input) {
        if (input.required) {
            if (input.value) {
                input.classList.add('is-valid')
            } else {
                input.classList.add('is-invalid')
                input.addEventListener('input', () => {
                    input.classList.remove('is-invalid')
                    input.classList.add('is-valid')
                }, {once: true})
            }
        }
    }

    handleClick() {
        this.submit.addEventListener('click', () => {
            this.inputs.forEach(input => {
                this.validate(input)
            })
            if (!document.querySelectorAll('input.is-invalid')) return
            if (this.elementName === 'pc') {
                this.addPC()
            }
        })
    }

    addPC() {
        const query = gql`mutation CreatePC($input: CreatePCInput!) {
            createPC(input_data: $input)
        }`
        let options = {}
        this.inputs.forEach(input => {
            options[input.name] = input.type === 'number' ? parseInt(input.value) : input.value
        })
        this.client.request(query, {input: options}).then(data => {
            if (data.createPC) {
                document.location.assign(`/pc/${options.pcName}`)
            }
        })
    }
}