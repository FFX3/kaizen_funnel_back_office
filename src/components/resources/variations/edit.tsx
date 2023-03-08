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
        // doesnt seem to be the right prop
        extra: (<>
            <CreateButton
                size="middle"
                resourceNameOrRouteName="steps"
            />
            {isNewOrder && <Space><Button>reset order</Button></Space>}
        </>),
        breadcrumb: '',
        resourceNameOrRouteName: 'steps'
    }

    console.log(isNewOrder)

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
            </Form>
        </Edit>
    );
};
