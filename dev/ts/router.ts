export class Router {
    root: string = window.location.origin + '/'

    private getLoc(): string {
        return window.location.href
    }

    is_home(): boolean {
        return this.getLoc() === this.root
    }

    is_pc(): boolean {
        return window.location.pathname.startsWith('/pc/')
    }

    getPCName(): string {
        const pcHiddenInput: HTMLInputElement = document.querySelector('#pc_name')
        return pcHiddenInput.value
    }
}