export function pcCard(data) {
    const pc = data['PC']
    const html = `<div class="loader-wrapper">
                        <div class="loading" style="visibility: visible"></div>
                        <div class="card" style="opacity: 0.6">
                            <a class="wrap" href="/pc/${pc.name}">
                                <div class="caption">
                                    <img id="hw_type" src="/static/img/computer.png">
                                    <p>${pc.name}</p>
                                </div>
                            </a>
                            <div class="chars">
                                <input id="${pc.name}" class="pc_label"
                                       value="" type="text"
                                       placeholder="Any label here">
                                <p>CPU:
                                    <span>${pc['cpu'].clock / 1000} GHz; ${pc.cpu.cores}/${pc.cpu.threads}</span>
                                </p>
                                <p>Video: <span>${pc.videocard.name.slice(0, 25)}</span></p>
                                <p>RAM: <span>${pc.ram.capacity / 1024 / 1024} GB</span></p>
                            </div>
                        </div>
                    </div>`
    return new DOMParser().parseFromString(html, 'text/html').body.firstElementChild
}