import { Sortable } from '@shopify/draggable'

console.log('loaded index.js')

const list = new Sortable(document.querySelector('.cards'), {
    draggable: '.card',
})