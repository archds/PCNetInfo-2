import autoComplete from "@tarekraafat/autocomplete.js";
import 'regenerator-runtime/runtime'

export function searchHandler() {
    const search = document.querySelector('#search')
    const PCs = document.querySelectorAll('.card')
    const route = new URL(window.location.origin + '/search/pc')
    const PC_data = fetch('/search/pc')
    search.addEventListener('input', () => {
        fetch('/search/pc')
    })
}

export function autocomplete() {
    new autoComplete({
        selector: '#search',
        data: {
            src: async () => {
                const source = await fetch('/search/pc')
                return await source.json()
            },
            key: ['pc_name'],
            cache: true,
        },
        threshold: 3,
        debounce: 300,
    })
}