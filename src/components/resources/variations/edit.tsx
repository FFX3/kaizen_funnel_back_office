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
} from "@pankod/refine-antd";

import DragDropSortingTable from './DragDropSortingTable'

export const VariationEdit = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const variationsData = queryResult?.data?.data;

    const tableProps = {
        dataSource: variationsData?.steps,
        loading: queryResult?.isFetched ?? false,
        onOrderChange: (order: number[]) => {
            fetch(process.env.NEXT_PUBLIC_API_URL + `/variations/reorder-steps/${variationsData?.id}`,{
                method: "PATCH",
                body: JSON.stringify(order)
            })
            console.log(order)
        }
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
                <List 
                    resource="steps"
                    breadcrumb=""
                >
                    <DragDropSortingTable {...tableProps} />
                </List>
            </Form>
        </Edit>
    );
};
