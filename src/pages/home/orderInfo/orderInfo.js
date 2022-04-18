import React from 'react'
import { Row, Col, ListGroup, Badge } from 'react-bootstrap'
import styles from './styles.module.scss'
const OrderInfo = (props) => {
    return (
        <ListGroup className={styles.listGroup} horizontal as={Row}>
            {/* <Col xs={6} md={'auto'}>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">رقم العملية</div>
                        <span>{props.orderDetails?.RefrenceNo}</span>
                    </div>
                    <Badge className={styles.badge} bg="warning" pill>
                        #
                    </Badge>
                </ListGroup.Item>
            </Col> */}
            <Col xs={12} sm={6}>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">سعر الآي كاش</div>
                        <div className={styles.content}>
                            {props.price
                                ? props.price + 'دينار ليبي'
                                : 'لايوجد'}
                        </div>
                    </div>
                    <Badge className={styles.badge} bg="warning" pill>
                        <i className="bi bi-currency-dollar"></i>
                    </Badge>
                </ListGroup.Item>
            </Col>
            <Col xs={12} sm={6}>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">الوصف</div>
                        <div className={styles.content}>
                            {props.desc ?? 'لايوجد'}
                        </div>
                    </div>
                    <Badge className={styles.badge} bg="warning" pill>
                        <i className="bi bi-chat-quote"></i>
                    </Badge>
                </ListGroup.Item>
            </Col>
        </ListGroup>
    )
}
export default OrderInfo
