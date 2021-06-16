export function pcLabelHandlerMain() {
    const labels = document.querySelectorAll('.pc_label')
    labels.forEach((label) => {
        label.addEventListener('change', (event) => {
            let input = event.target
            let loader = event.target.parentElement.parentElement.parentElement.querySelector('.loading')
            let card = event.target.parentElement.parentElement.parentElement.querySelector('.card')
            loader.style.visibility = 'visible'
            card.style.opacity = '0.6'
            fetch(`/pc/${input.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    'label': input.value
                })
            })
            setTimeout(() => {
                loader.style.visibility = 'hidden'
                card.style.opacity = '1'
            }, 1500)
        })
    })
}

export function inputsHandler() {
    const inputs = document.querySelector('.pc_view').querySelectorAll('input')
    const textareas = document.querySelector('.data').querySelectorAll('textarea')
    const pcName = document.querySelector('#pc_name').value
    inputs.forEach((input) => {
        input.addEventListener('change', () => {
            let inputId = input.id
            fetch(`/pc/${pcName}`, {
                method: 'PUT',
                body: JSON.stringify({
                    'field': inputId,
                    'value': input.value
                })
            }).then(() => {
                input.parentElement.classList.toggle('saved')
                setTimeout(() => {
                    input.parentElement.classList.toggle('saved')
                }, 1000)
            })
        })
    })

    textareas.forEach((input) => {
        input.addEventListener('change', () => {
            let inputId = input.id
            fetch(`/pc/${pcName}`, {
                method: 'PUT',
                body: JSON.stringify({
                    'field': inputId,
                    'value': input.value
                })
            }).then(() => {
                input.parentElement.classList.toggle('saved')
                setTimeout(() => {
                    input.parentElement.classList.toggle('saved')
                }, 1000)
            })
        })
    })
}

export function deleteHandler() {
    const delButton = document.querySelector('#delete')
    delButton.addEventListener('click', () => {
        fetch(`/pc/${pcName}`, {
            method: 'DELETE'
        }).then(() => {
            window.location.assign(window.location.origin)
        })
    })
}

export function ramHandler() {
    const banks = document.querySelectorAll('input[id^=ram]')
    const addRam = document.querySelector('#addRam')
    if (!banks[0].parentElement.parentElement.querySelectorAll('p.hide').length) {
        addRam.style.display = 'none'
    }
    addRam.addEventListener('click', () => {
        for (let bank of banks) {
            if (bank.parentElement.classList.contains('hide')) {
                bank.parentElement.classList.remove('hide')
                break
            }
        }
        if (!banks[0].parentElement.parentElement.querySelectorAll('p.hide').length) {
            addRam.style.display = 'none'
        }
    })

    for (let bank of banks) {
        bank.addEventListener('input', () => {
            if (!bank.parentElement.querySelectorAll('span').length) {
                let valueHolder = document.createElement('span')
                valueHolder.textContent = 'GB'
                bank.parentElement.appendChild(valueHolder)
            }
            let ram_sum = 0
            for (let item of banks) {
                if (item.value) ram_sum += parseInt(item.value)
            }
            bank.parentElement.parentElement.querySelector('p.head span').textContent = `${ram_sum} GB`
        })
        bank.addEventListener('change', () => {
            if (!bank.value) bank.parentElement.classList.add('hide')
        })
    }
}


export function hwTypeHandler() {
    const hwType = document.querySelector('#hw_type')
    const hwPopup = document.querySelector('#hw_type_popup')
    const hwDots = hwType.parentElement.querySelector('.dots')
    hwDots.addEventListener('click', () => {
        hwPopup.classList.remove('animate__slideOutRight')
        hwPopup.classList.add('animate__slideInRight', 'active')
    })
    for (let node of hwPopup.children) {
        node.addEventListener('click', () => {
            let img = node.children[0]
            hwType.src = img.src
            hwPopup.classList.add('animate__slideOutRight')
            hwPopup.classList.remove('animate__slideInRight', 'active')
            let hw_type = node.id
            fetch(`/pc/${pcName}`, {
                method: 'PUT',
                body: JSON.stringify({
                    'field': 'hardware_type',
                    'value': hw_type
                })
            })
        })
    }
}