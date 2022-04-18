import { base_url } from '../../config'
import { toastOptionsAction } from './layout'

export const getData = ({ itemID }) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch(isLoading(true))
                const [orderDetails] = await Promise.all([
                    getOrderDetails({ itemID }),
                ])
                dispatch({
                    type: 'home_page-data',
                    data: orderDetails,
                })
                dispatch(isLoading(false))
                resolve(orderDetails)
            } catch (error) {
                console.log(error)
                dispatch(isLoading(false))
                reject()
            }
        })
    }
}

export const handleInputChange = ({ id, value }) => {
    return (dispatch) => {
        if (id === 'phone' && !/^(\s*|\d+)$/.test(value)) {
            return
        }
        if (id === 'qty' && !/^[+]?\d+([.]\d+)?$/.test(value)) {
            return
        }
        dispatch({ type: `home_page-${id}-value`, data: { value, id } })
    }
}

// export const onMapClick = ({ marker }) => {
//     return (dispatch, getState) => {
//         const locations =
//             getState().home_page_reducer.data.ClientLocations.slice()
//         locations.splice(-1)
//         locations.forEach((e) => (e.isSelected = false))
//         const newLocation = {
//             isSelected: true,
//             Lat: marker.latLng.lat(),
//             Lang: marker.latLng.lng(),
//         }
//         locations.push(newLocation)
//         dispatch({
//             type: 'home_page-data',
//             data: {
//                 ...getState().home_page_reducer.data,
//                 ClientLocations: locations,
//             },
//         })
//         dispatch({
//             type: 'home_page-selectedLocation',
//             data: newLocation,
//         })
//     }
// }

// export const handleMarkderClick = ({ item, marker, key }) => {
//     return (dispatch, getState) => {
//         const locations =
//             getState().home_page_reducer.data.ClientLocations.slice()
//         locations.splice(-1)
//         locations.forEach((e) => (e.isSelected = false))
//         locations.push({ ...item, isSelected: true })
//         dispatch({
//             type: 'home_page-data',
//             data: {
//                 ...getState().home_page_reducer.data,
//                 ClientLocations: locations,
//             },
//         })
//         dispatch({
//             type: 'home_page-selectedLocation',
//             data: item,
//         })
//     }
// }

export const isLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'home_page-isLoading', data: isLoading })
    }
}
export const isLoadingSubmit = (isLoadingSubmit) => {
    return (dispatch) => {
        dispatch({ type: 'home_page-isLoadingSubmit', data: isLoadingSubmit })
    }
}

const getOrderDetails = ({ itemID }) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        }
        try {
            var response = await fetch(
                `${base_url}/D/ItemOrderPage?id=${itemID}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}

const sendSubmitForm = ({ itemID, phone, desc, qty, isDelivery }) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        var urlencoded = new URLSearchParams()
        try {
            urlencoded.append('ItemID', itemID)
            urlencoded.append('Qty', qty)
            urlencoded.append('ClientTelNo', '00218' + phone)
            urlencoded.append('Desciption', desc)
            urlencoded.append('IsDelivery', isDelivery)
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow',
            }
            var response = await fetch(`${base_url}/D/NewOrder`, requestOptions)
            const responseText = await response.text()
            const body = responseText ? JSON.parse(responseText) : ''
            if (response.status >= 200 && response.status < 300) {
                resolve()
            } else {
                reject(body)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const submitForm = ({ itemID }) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { phone, qty, desc, isDelivery } =
                    getState().home_page_reducer
                dispatch(isLoadingSubmit(true))
                await sendSubmitForm({ itemID, phone, desc, qty, isDelivery })
                dispatch(isLoadingSubmit(false))
                resolve()
            } catch (error) {
                dispatch(
                    toastOptionsAction({
                        ...getState().layout_reducer.toast,
                        msg: error.toString(),
                        show: true,
                        header: `فشلت العملية`,
                        isWarning: true,
                        isAutoRemove: true,
                    })
                )
                dispatch(isLoadingSubmit(false))
                reject(error)
            }
        })
    }
}
