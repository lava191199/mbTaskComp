import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { addButton } from '../../../store/actions';


function View() {
    const dispatch = useDispatch();
    const actionData = useSelector((state) => state?.taskReducer?.actionData);
    console.log("ActionDAta_view", actionData);
    return (
        <>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleEmail">Name </Label>
                        <Input value={actionData?.name} disabled={true} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label>College  </Label>
                        <Input value={actionData?.college} disabled={true} />
                    </FormGroup>
                </Col>

            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input value={actionData?.email} disabled={true} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleEmail">Phone Number</Label>
                        <Input value={actionData?.phone} disabled={true} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Date Of Birth
                        </Label>
                        <Input value={actionData?.birthDate || "-"} disabled={true} />
                    </FormGroup>
                </Col>

            </Row>
            <Col md={6}>
                <FormGroup>
                    <Label for="gender">
                        Gender
                    </Label>
                    <Input value={actionData?.gender || "-"} disabled={true} />

                </FormGroup>
            </Col>

            <Col>

                <Label>Hobbies</Label>

                <Col className='view-hobie'>
                    {actionData?.hobbies?.join(',')}
                </Col>


            </Col>

            <FormGroup>
                <Label for="streetName"> Address</Label>
                <Input value={actionData?.streetName || "-"} disabled={true} />
            </FormGroup>
            <Row>
                <Col md={4}>
                    <FormGroup>
                        <Label for="exampleCity"> City </Label>
                        <Input value={actionData?.city || "-"} disabled={true} />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="exampleState"> State </Label>
                        <Input value={actionData?.state || "-"} disabled={true} />
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label for="exampleZip">  Zip </Label>
                        <Input value={actionData?.zip || "-"} disabled={true} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={()=> dispatch(addButton('unselect', null))}> Back </Button>
                </Col>
            </Row>
        </>
    )
}

export default View