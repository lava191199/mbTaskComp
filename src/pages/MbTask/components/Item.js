import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addButton, deleteStudentDetailsRequest } from '../../../store/actions';
import { ParentContext } from '../container/cotext';
import {  Button } from 'reactstrap';

function Item() {
    const context = useContext(ParentContext);
    const dispatch = useDispatch();
    const dataObject = useSelector((state) => state?.taskReducer?.totalData?.find((item) => item?.id === context?.id))
    return (
        <tbody >
            <tr className='item-card'>
                <th scope="row">
                    {context?.index + 1}
                </th>
                <td>
                    {dataObject?.name}
                </td>
                <td>
                    {dataObject?.email}
                </td>
                <td>
                    {dataObject?.phone}
                </td>
                <td>
                    {dataObject?.college}
                </td>
                <td   >
                    <Button onClick={() => dispatch(addButton("view", dataObject))} color="info" outline> View </Button>
                </td>
                <td   >
                    <Button onClick={() => dispatch(addButton("edit", dataObject))} color="warning" outline> Edit </Button>
                </td>
                <td >
                    <Button onClick={()=> dispatch(deleteStudentDetailsRequest(dataObject?.id))} color="danger" outline> Delete </Button>
                </td>

            </tr>
        </tbody>
    )
}

export default Item