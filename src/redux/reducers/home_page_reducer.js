let defaultState = {
    isLoading: false,
    isLoadingSubmit: false,
    data: null,
    phone: '',
    qty: '',
    desc: '',
    isDelivery: true,
}

const home_page_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'home_page-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'home_page-isLoadingSubmit':
            return {
                ...state,
                isLoadingSubmit: action.data,
            }

        case 'home_page-data':
            return {
                ...state,
                data: action.data,
            }
        case 'home_page-phone-value':
        case 'home_page-qty-value':
        case 'home_page-desc-value':
        case 'home_page-isDelivery-value':
            return {
                ...state,
                [action.data.id]: action.data.value,
            }
        default:
            return {
                ...state,
            }
    }
}

export default home_page_reducer
