import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Create,
    Form,
    useForm,
    Input,
    useSelect,
    Select,
} from "@pankod/refine-antd";
import { useRouter } from "next/router";

export const StepCreate: React.FC<IResourceComponentsProps> = () => {
    const router = useRouter()
    
    const query = router.query

    const { formProps, saveButtonProps, queryResult } = useForm({ redirect: "edit" });

    const { selectProps: variationSelectProps } = useSelect({
        resource: "variations",
        optionLabel: "label",
    });

    const HiddenFields = () => {
        if(query?.variation_id && query?.order !== undefined) {
            return <>
                <Form.Item
                    label="Variation"
                    name={"variation_id"}
                    initialValue={parseInt(query?.variation_id)}
                    hidden={true}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Order"
                    name={["order"]}
                    initialValue={parseInt(query?.order)}
                    hidden={true}
                >
                    <Input />
                </Form.Item>
            </>
        }

        return <>
            <Form.Item
                label="Funnel"
                name={"funnel_id"}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select 
                    {...variationSelectProps} 
                />
            </Form.Item>
            <Form.Item
                label="Order"
                name={["order"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </>
    }

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name={["title"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <HiddenFields />
            </Form>
        </Create>
    );
};

