import {Router} from "./router";
import {pcLabelHandler} from "./func";
import {inputsHandler} from "./func";
import {deleteHandler} from "./func";

const router = new Router()

function main() {
    if (router.is_home()) {
        const labels: NodeListOf<HTMLInputElement> = document.querySelectorAll('.pc_label')
        pcLabelHandler(labels)
    }

    if (router.is_pc()) {
        const pcName: string = router.getPCName()
        inputsHandler(document.querySelector('.pc_view').querySelectorAll('input'), pcName)
        inputsHandler(document.querySelector('.data').querySelectorAll('textarea'), pcName)
        deleteHandler(document.querySelector('#delete'), pcName)
    }
}