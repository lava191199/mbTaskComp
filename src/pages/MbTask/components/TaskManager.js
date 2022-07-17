import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { Button, FormGroup, Input, Label, Row, Col, Table } from 'reactstrap';
import { ParentContext, SuperParentContext } from '../container/cotext';

function TaskManager() {
    const context = useContext(SuperParentContext);
    const totalData = useSelector((state) => state?.taskReducer?.totalData);
    const length = useSelector((state) => state?.taskReducer?.length);
    const searchKey = useSelector((state) => state?.taskReducer?.searchKey);
    const filteredData = totalData?.length !==0 && searchKey?.length !==0 ?
        totalData?.filter((item) => (
            item?.name?.toLowerCase()?.startsWith(searchKey?.toLowerCase()) ||
            item?.email?.toLowerCase()?.startsWith(searchKey?.toLowerCase())
        )) : totalData;
    console.log("TaskManager_length", length,searchKey);

    return (
        <>
            {searchKey?.length === 0 && filteredData?.length ===0 && <h3>No Data Found</h3>}
            {searchKey?.length !== 0 && filteredData?.length ===0 && <h3>No Search Data Found</h3>}
            {filteredData?.length !== 0 && <Table responsive>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Name
                        </th>

                        <th>
                            Email
                        </th>
                        <th>
                            Phone
                        </th>

                        <th>
                            College
                        </th>
                        <th>
                            View
                        </th>
                        <th>
                            Edit
                        </th>
                        <th>
                            Delete
                        </th>
                    </tr>
                </thead>
                {filteredData?.map((item, index) => {
                    return (
                        <ParentContext.Provider key={item?.id} value={{ id: item?.id, index: index }}>
                            <context.item />
                        </ParentContext.Provider>
                    )
                })}
            </Table>}
        </>
    )
}

export default TaskManager