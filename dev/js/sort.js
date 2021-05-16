import { Sortable, Plugins } from "@shopify/draggable";

export function sortHandler() {
    const sortable = new Sortable(document.querySelectorAll('.cards'), {
        draggable: '.card',
    });
}