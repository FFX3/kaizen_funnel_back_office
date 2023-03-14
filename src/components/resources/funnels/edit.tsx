import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@pankod/refine-core";
import { 
    Edit,
    Form,
    useForm,
    Input,
    Table,
    useTable,
    List,
    EditButton,
    DeleteButton,
    ShowButton,
    Space,
    Button
} from "@pankod/refine-antd";

export const FunnelEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const funnelData = queryResult?.data?.data;

    const tableProps = {
        dataSource: funnelData?.variations,
        loading: false,
    }
    const listProps = {
        headerButtons: (
            <Button
                size="middle"
                href={`/variations/create?funnel_id=${funnelData?.id}`}
            >
                Create
            </Button>
        ),
        breadcrumb: '',
        resourceNameOrRouteName: 'steps',
        title: 'Steps'
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
                    label="slug"
                    name={["slug"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <List {...listProps} >
                    <Table {...tableProps} rowKey="id">
                        <Table.Column dataIndex="id" title="Id" />
                        <Table.Column dataIndex="label" title="Label" />
                        <Table.Column
                            title="Actions"
                            dataIndex="actions"
                            render={(_, record: BaseRecord) => (
                                <Space>
                                    <EditButton
                                        resourceNameOrRouteName="variations"
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                    <ShowButton
                                        resourceNameOrRouteName="variations"
                                        hideText
                                        size="small"
                                        recordItemId={record.id}
                                    />
                                    <DeleteButton
                                        resourceNameOrRouteName="variations"
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

