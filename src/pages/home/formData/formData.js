import React from 'react'
import { FloatingLabel, Form, InputGroup, FormControl } from 'react-bootstrap'

const FormData = (props) => {
    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    maxLength={9}
                    value={props.phone}
                    type="text"
                    onChange={(e) =>
                        props.handleInputChange({
                            value: e.target.value,
                            id: 'phone',
                        })
                    }
                    placeholder="9x-xxx-xx-xx"
                    style={{ direction: 'ltr' }}
                />
                <InputGroup.Text id="basic-addon2">218+</InputGroup.Text>
            </InputGroup>
            <FloatingLabel className="mb-3" label="الكمية">
                <Form.Control
                    min={1}
                    value={props.qty}
                    onChange={(e) => {
                        if (!/^[1-9]+[0-9]*$/.test(e.target.value)) {
                            return
                        }
                        props.handleInputChange({
                            value: e.target.value,
                            id: 'qty',
                        })
                    }}
                    style={{ width: '12rem' }}
                    type="number"
                    placeholder="الكمية"
                />
            </FloatingLabel>
            <FloatingLabel label="ملاحظات" className="mb-3">
                <Form.Control
                    maxLength={150}
                    value={props.desc}
                    onChange={(e) =>
                        props.handleInputChange({
                            value: e.target.value,
                            id: 'desc',
                        })
                    }
                    style={{ height: '7rem' }}
                    as="textarea"
                    placeholder="ملاحظات"
                />
            </FloatingLabel>
            <Form.Check
                style={{ color: 'wnite' }}
                className="mb-3"
                checked={props.isDelivery}
                onChange={(e) =>
                    props.handleInputChange({
                        value: e.target.checked,
                        id: 'isDelivery',
                    })
                }
                type="switch"
                label="مع التوصيل"
            />
        </>
    )
}

export default FormData
