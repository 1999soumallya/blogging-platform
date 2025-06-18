import { MODAL_LAYOUT } from "@/config/modal"

export const MODAL_CONSTANTS = {
    MODAL_OPEN: 'MODAL_OPEN',
    MODAL_CLOSE: 'MODAL_CLOSE',
}

export const MODAL_INIT = {
    isOpen: false,
    size: 'lg',
    header: '',
    body: MODAL_LAYOUT.DEFAULT,
    others: {}
}