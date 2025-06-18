import { MODAL_CONSTANTS, MODAL_INIT } from "../constants/modal.constant";

export const ModalReducer = (state = MODAL_INIT, action) => {
    switch (action.type) {
        case MODAL_CONSTANTS.MODAL_CLOSE:
            return MODAL_INIT;
        case MODAL_CONSTANTS.MODAL_OPEN:
            return {
                isOpen: true,
                size: action.payload.size || state.size,
                header: action.payload.header || state.header,
                body: action.payload.body || state.body,
                others: action.payload.others || {}
            };
        default:
            return state;
    }
}