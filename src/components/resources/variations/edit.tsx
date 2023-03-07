import React, { useEffect, useState } from "react";
import { BaseRecord } from "@pankod/refine-core";
import {
    Edit,
    Form,
    useForm,
    Input,
    useSelect,
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

    const { selectProps: funnelSelectProps } = useSelect({
        resource: "funnels",
        defaultValue: variationsData?.funnel_id,
        optionLabel: "label",
    });

    const tableProps = {
        dataSource: variationsData?.steps,
        loading: false,
    }

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Id"
                    name={["id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input readOnly disabled />
                </Form.Item>
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
                <Form.Item
                    label="Funnel"
                    name={"funnel_id"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...funnelSelectProps} />
                </Form.Item>
                <List 
                    resource="steps"
                    breadcrumb=""
                >
                    <DragDropSortingTable dataSource={tableProps.dataSource} />
                </List>
                <List 
                    resource="steps"
                    breadcrumb=""
                >
                    <Table {...tableProps} rowKey="id">
                        <Table.Column dataIndex="id" title="Id" />
                        <Table.Column dataIndex="label" title="Label" />
                        <Table.Column
                            title="Actions"
                            dataIndex="actions"
                            render={(_, record: BaseRecord) => (
                                <Space>
                                    <EditButton
                                        resourceNameOrRouteName="steps"
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                    <ShowButton
                                        resourceNameOrRouteName="steps"
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                    <DeleteButton
                                        resourceNameOrRouteName="steps"
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                </Space>
                            )}
                        />
                    </Table>
                </List>
            </Form>
        </Edit>
    );
};
