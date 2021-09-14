import React,{useContext} from 'react'
import {Row,Col} from 'react-bootstrap'
import PrefixContext from "../../context/PrefixContext.js";

function NotFoundPage() {

    const PrefixContextData = useContext(PrefixContext);
    const notFoundImg = PrefixContextData.cdnPrefixUrl+'notfound_8cMlyORAac.svg';

    return (
        <>
            <section className="page-heading-margin">
                <Row className="w-100">
                    <Col md="6" className="mx-auto mt-4 mt-md-5 text-center">
                        <img className="w-75" src={notFoundImg} alt="Page Not Found"/>
                        <h4 className="text-center text-primary d-none mt-4">Page Not Found</h4>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default NotFoundPage
