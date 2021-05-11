const Sortable = require('@shopify/draggable')

document.addEventListener('DOMContentLoaded', () => {
    main()
})

function main() {
    console.log('Loaded')
    const list = new Sortable(document.querySelector('#pc_list'))
}