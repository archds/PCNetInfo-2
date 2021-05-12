

const labels = document.querySelectorAll('.pc_label')
labels.forEach(function () {
    this.addEventListener('change', (event) => {
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

