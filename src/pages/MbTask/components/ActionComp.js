import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import moment from 'moment';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import { addButton, addOrUpdateStudentDetailsRequest } from '../../../store/actions';
import 'react-datepicker/dist/react-datepicker.css'


function ActionComp() {
    const dispatch = useDispatch();
    const collegeData = useSelector((state) => state?.taskReducer?.collegeData) || [];
    const collegeOptions = [...collegeData]?.map((item) => ({ ...item, value: item?.name, label: item?.name }));
    const actionData = useSelector((state) => state?.taskReducer?.actionData);
    const actionType = useSelector((state) => state?.taskReducer?.actionType) || "unselect";
    console.log("collegeOptions__",collegeOptions, collegeData);
    return (
        <Formik
            initialValues={{
                name: actionData?.name || '',
                birthDate: actionData?.birthDate ? moment(actionData?.birthDate)?.toDate() : '',
                email: actionData?.email || '',
                phone: actionData?.phone || '',
                gender: actionData?.gender || '',
                college: actionData?.college || '',
                hobbies: actionData?.hobbies || [],
                streetName: actionData?.streetName || '',
                city: actionData?.city || '',
                state: actionData?.state || '',
                zip: actionData?.zip || '',
                other: actionData?.other || '',
                otherHobbie: actionData?.otherHobbie || '',
            }}
            onSubmit={(values) => {
                const reqObj = {
                    name: values?.name || '',
                    birthDate: values?.birthDate ? moment(values?.birthDate)?.format("YYYY-MM-DD") : '',
                    email: values?.email || '',
                    phone: values?.phone || '',
                    gender: values?.gender || '',
                    college: values?.college || '',
                    hobbies: values?.hobbies || [],
                    streetName: values?.streetName || '',
                    city: values?.city || '',
                    state: values?.state || '',
                    other: values?.other || '',
                    otherHobbie: values?.otherHobbie || '',
                    zip: values?.zip || '',
                    id: actionData?.id || Math.random() * 100
                }
                console.log("OnSubmitValuyes", values, reqObj);
                dispatch(addOrUpdateStudentDetailsRequest(actionType, reqObj))
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().min(2, "Must be more than 1 characters").max(30, "Must be less than 30 characters").required("This field is requried")
                    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
                college: Yup.string().required("This Field Is Required"),
                email: Yup.string().email("Invalid Email Formate").required("This Field Is Required"),
                phone: Yup.number().typeError("That doesn't look like a phone number").positive("A phone number can't start with a minus")
                    .integer("A phone number can't include a decimal point").min(9999999, "Minimum 8 digits Required").required('This field is requried'),
                birthDate: Yup.string().required("This field is requried"),
                gender: Yup.string().required("This field is requried"),
                city: Yup.string().required("This field is requried"),
                streetName: Yup.string().required("This field is requried"),
                state: Yup.string().required("This field is requried"),
                zip: Yup.number().typeError("That doesn't look like a zip code").positive("A zip code can't start with a minus")
                    .integer("A zip code can't include a decimal point").min(9999, "Minimum  5 digits Required").required('This field is requried'),
                otherHobbie: Yup.mixed().when("other", {
                    is: (other) => other === true,
                    then: Yup.string().required("This Field Is Required"),
                    otherwise: Yup.string().notRequired()
                })
            })}
        >
            {({ values, errors, setFieldValue, setFieldTouched, touched, isValid }) => {
                console.log("adsffda__sfd",values,errors);
                return <Form>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Name </Label>
                                <Field id="exampleEmail" name="name" placeholder="Enter Name" className={'form-control ' + (errors.name && touched.name ? 'is-invalid' : '')} type="text" />
                                <div className='error-message'><ErrorMessage name='name' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>College  </Label>
                                <Select
                                    name="selectedSheet"
                                    placeholder="Select College"
                                    value={(values?.college && collegeOptions?.length) !==0 ? collegeOptions?.find((item) => item?.value === values?.college):''}
                                    onChange={(e) => setFieldValue("college", e.value)}
                                    options={collegeOptions}
                                    getOptionLabel={option => option.label}
                                    getOptionValue={option => option.value}
                                    onBlur={() => setFieldTouched('college', true)}
                                    noOptionsMessage={() => "No Colleges To Select"}
                                />
                                {errors.college && touched.college && <div className='error-message'>{errors.college}</div>}

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Field id="exampleEmail" name="email" placeholder="Enter Email" className={'form-control ' + (errors.email && touched.email ? 'is-invalid' : '')} type="email" />
                                <div className='error-message'><ErrorMessage name='email' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Phone Number</Label>
                                <Field id="exampleEmail" name="phone" placeholder="Enter Mobile Nmuber" className={'form-control ' + (errors.phone && touched.phone ? 'is-invalid' : '')} />
                                <div className='error-message'><ErrorMessage name='phone' /></div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Date Of Birth
                                </Label>
                                <DatePicker
                                    name="birthDate"
                                    wrapperClassName="datePicker"
                                    placeholderText="Enter Date Of Birth"
                                    selected={values?.birthDate}
                                    popperModifiers={{
                                        name: "preventOverflow",
                                        options: {
                                            rootBoundary: "viewport",
                                            tether: false,
                                            altAxis: true,
                                        }
                                    }}
                                    popperProps={{
                                        positionFixed: true // use this to make the popper position: fixed
                                    }}
                                    onChange={(e) => {
                                        setFieldValue('birthDate', e);
                                    }}
                                    dateFormat="yyyy-mm-dd"
                                    showMonthDropdown
                                    showYearDropdown
                                    onBlur={() => setFieldTouched('birthDate', true)}
                                    autoComplete="off"
                                />
                                {errors?.birthDate && touched?.birthDate && <div className='error-message'>{errors?.birthDate}</div>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="gender">
                                Gender
                            </Label>
                            <Row className="w50">
                                <Col>
                                    <Input type="radio" id="gender" name="gender" value={values?.gender} checked={values?.gender === 'male'} onChange={() => setFieldValue("gender", "male")} />
                                    <Label for="gender">Male</Label>
                                </Col>
                                <Col>
                                    <Input type="radio" id="gender" name="gender" value={values?.gender} checked={values?.gender === 'female'} onChange={() => setFieldValue("gender", "female")} />
                                    <Label for="gender">Female</Label>
                                </Col>
                                <Col>
                                    <Input type="radio" id="gender" name="gender" value={values?.gender} checked={values?.gender === 'other'} onChange={() => setFieldValue("gender", "other")} />
                                    <Label for="gender">Other</Label>
                                </Col>
                            </Row>
                            <div className='error-message'><ErrorMessage name='gender' /></div>
                        </FormGroup>
                    </Col>

                    <Col>
                        <Label>Hobbies</Label>
                        <Col>
                            <FormGroup check inline >
                                <Field type="checkbox" name="hobbies" value="reading"/>
                                <Label check> Reading </Label>
                            </FormGroup>
                            <FormGroup check inline >
                                <Field type="checkbox" name="hobbies" value="gaming" />
                                <Label check>  Gaming </Label>
                            </FormGroup>
                            <FormGroup check inline >
                                <Field type="checkbox" name="hobbies" value="traveling" />
                                <Label check>  Traveling </Label>
                            </FormGroup>
                            <FormGroup check inline >
                                <Field type="checkbox" name="hobbies" value="drawing" />
                                <Label check>  Drawing </Label>
                            </FormGroup>
                            <FormGroup check inline >
                                <Input type="checkbox" name="other" checked={!!values?.other} onChange={(e) => {
                                    e.target.checked ? setFieldValue("other", true) : setFieldValue("other", false)
                                }} />
                                <Label check>  Other </Label>
                            </FormGroup>
                            {values?.other === true &&
                                <FormGroup check inline >
                                    <Field id="otherHobbie" name="otherHobbie" placeholder="Enter Other Hobbie" className="form-control" />
                                    <div className='error-message'><ErrorMessage name='otherHobbie' /></div>
                                </FormGroup>}
                        </Col>

                    </Col>

                    <FormGroup>
                        <Label for="streetName"> Address</Label>
                        <Field id="streetName" name="streetName" placeholder="Enter Address" className={'form-control ' + (errors.streetName && touched.streetName ? 'is-invalid' : '')} />
                        <div className='error-message'> <ErrorMessage name='streetName' /></div>
                    </FormGroup>

                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleCity"> City </Label>
                                <Field id="exampleCity" name="city" placeholder="Enter City" className={'form-control ' + (errors.city && touched.city ? 'is-invalid' : '')} />
                                <div className='error-message'>  <ErrorMessage name='city' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleState"> State </Label>
                                <Field id="exampleState" name="state" placeholder="Enter State" className={'form-control ' + (errors.state && touched.state ? 'is-invalid' : '')} />
                                <div className='error-message'> <ErrorMessage name='state' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="exampleZip">  Zip </Label>
                                <Field id="exampleZip" name="zip" placeholder="Enter Zip Code" className={'form-control ' + (errors.zip && touched.zip ? 'is-invalid' : '')} />
                                <div className='error-message'> <ErrorMessage name='zip' /></div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type='submit' disabled={!isValid}>{actionType === 'add' ? "Save" : "Update"}  </Button>
                        </Col>
                        <Col>
                            <Button onClick={() => dispatch(addButton('unselect', null))}> Back </Button>
                        </Col>
                    </Row>
                </Form>
            }}
        </Formik>
    )
}
export default ActionComp