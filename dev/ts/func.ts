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


