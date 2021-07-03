import {pcCard} from "./components/card";


export function pcListRender(pcCards) {
    const pcList = document.querySelector('#pc_list')
    pcList.style.opacity = '0'
    pcList.innerHTML = ''
    setTimeout(() => {
        pcList.style.opacity = '1'
        pcCards.forEach((pc) => {
            pcList.appendChild(pcCard(pc))
        })
    }, 300)
}

export function gqSelectHandler() {
    document.querySelectorAll('select.gq').forEach(item => {
        item.addEventListener('change', item => {
            const pcName = document.querySelector('#pc_name').value
            const value = item.target.value
            const field = item.target.id
            const query = `mutation {
          updateField(field: "${field}", value: "${value}", pcName: "${pcName}")
        }`
            makeQuery(query)
                .then(r => console.log(r))
        })
    })
}