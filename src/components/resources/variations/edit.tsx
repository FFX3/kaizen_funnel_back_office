import React, { useEffect, useState } from "react";
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
    
    console.log(formProps)

    const variationsData = queryResult?.data?.data;

    const tableProps = {
        dataSource: variationsData?.steps,
        loading: queryResult?.isFetched ?? false,
        saveOrder: (order: number[]) => {
            fetch(process.env.NEXT_PUBLIC_API_URL + `/variations/reorder-steps/${variationsData?.id}`,{
                method: "PATCH",
                body: JSON.stringify(order)
            })
            console.log(order)
        }
    }

    const listProps = {
        headerButtons:()=>{ 
            return (<>
                {isNewOrder && <Button>reset order</Button>}
                <CreateButton
                    size="middle"
                    resourceNameOrRouteName="steps"
                />
            </>)
        },
        breadcrumb: '',
        resourceNameOrRouteName: 'steps'
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
                    <DragDropSortingTable setIsNewOrder={setIsNewOrder} {...tableProps} />
                </List>
                <Form.Item
                    name={["order"]}
                >
                    <Input type="hidden" />
                </Form.Item>
            </Form>
        </Edit>
    );
};
