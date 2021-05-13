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

const inputs = document.querySelector('.pc_view').querySelectorAll('input')
const textareas = document.querySelector('.data').querySelectorAll('textarea')
const pcName = document.querySelector('#pc_name').value
inputs.forEach((input) => {
    input.addEventListener('change', () => {
        let inputId = input.id
        fetch(`/pc/${pcName}`,{
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
        fetch(`/pc/${pcName}`,{
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

const delButton = document.querySelector('#delete')
delButton.addEventListener('click', () => {
    fetch(`/pc/${pcName}`, {
        method: 'DELETE'
    }).then(() => {window.location.assign(window.location.origin)})

})