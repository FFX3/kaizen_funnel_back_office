import React, { useEffect, useState, useRef } from "react";
import { BaseRecord } from "@pankod/refine-core";
import {
    Edit,
    Form,
    useForm,
    Input,
    Select,
    Table,
    List,
    Space,
    EditButton,
    ShowButton,
    DeleteButton,
    CreateButton,
    Button,
} from "@pankod/refine-antd";

import DragDropSortingTable from './DragDropSortingTable'

export const VariationEdit = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();
    const [isNewOrder, setIsNewOrder] = useState(false)
    const [newOrder, setNewOrder] = useState([])
    const originalOrder = useRef([])
    
    useEffect(()=>{
        const form = formProps.form
        if(form){
            if(isNewOrder){
                form.setFieldValue("step_order", newOrder)
            } else {
                form.setFieldValue("step_order", undefined)
            }
        }
    },[newOrder])

    const variationsData = queryResult?.data?.data;
    const isLoading = queryResult?.isFetched ?? false 
    const dataSource = variationsData?.steps

    useEffect(()=>{
        if(!(typeof isLoading === "undefined") && isLoading){
            originalOrder.current = dataSource.map(item => item.id)
        }
    },[isLoading])

    const tableProps = {
        dataSource: variationsData?.steps,
        loading: queryResult?.isFetched ?? false,
        setNewOrder,
        setIsNewOrder,
    }

    const listProps = {
        headerButtons:()=>{ 
            return (<>
                {isNewOrder && <Button>reset order</Button>}
                <Button
                    size="middle"
                    href={`/steps/create?variation_id=${variationsData?.id}&order=${variationsData?.steps.length}`}
                >
                    Create
                </Button>
            </>)
        },
        breadcrumb: '',
        resourceNameOrRouteName: 'steps',
        title: 'Steps'
    }

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Label"
                    name={["label"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <List {...listProps} >
                    <DragDropSortingTable {...tableProps} />
                </List>
                <Form.Item
                    name={["step_order"]}
                    hidden={true}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
