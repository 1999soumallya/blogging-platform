import { MODAL_CONSTANTS } from "../constants/modal.constant"

export const openModal = (payload, dispatch) => {
    dispatch({ type: MODAL_CONSTANTS.MODAL_OPEN, payload })
}

export const closeModal = (dispatch) => {
    dispatch({ type: MODAL_CONSTANTS.MODAL_CLOSE })
}