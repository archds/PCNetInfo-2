export function pcLabelHandler(labels: NodeListOf<HTMLInputElement>): void {
    labels.forEach((label: HTMLInputElement) => {
        label.addEventListener('change', evt => {
            let loader: HTMLElement = label.parentElement.parentElement.parentElement.querySelector('.loading')
            let card: HTMLElement = label.parentElement.parentElement.parentElement.querySelector('.card')
            loader.style.visibility = 'visible'
            card.style.opacity = '0.6'
            fetch(`/pc/${label.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    'label': label.value
                })
            }).then(r => {
                setTimeout(() => {
                    loader.style.visibility = 'hidden'
                    card.style.opacity = '1'
                }, 1500)
            })
        })
    })
}


export function inputsHandler(elements: NodeListOf<HTMLInputElement> | NodeListOf<HTMLTextAreaElement>, pcName: string): void {
    elements.forEach(element => {
        element.addEventListener('change', () => {
            fetch(`/pc/${pcName}`, {
                method: 'PUT',
                body: JSON.stringify({
                    'field': element.id,
                    'value': element.value
                })
            }).then(() => {
                element.parentElement.classList.toggle('saved')
                setTimeout(() => {
                    element.parentElement.classList.toggle('saved')
                }, 1000)
            })
        })
    })
}

export function deleteHandler(delBtn: HTMLElement, pcName: string): void {
    delBtn.addEventListener('click', () => {
        fetch(`/pc/${pcName}`, {
            method: 'DELETE'
        }).then(() => {
            window.location.assign(window.location.origin)
        })
    })
}
