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

export const VariationCreate: React.FC<IResourceComponentsProps> = () => {
    const router = useRouter()
    
    const query = router.query

    const { 
        formProps,
        saveButtonProps,
        queryResult,
    } = useForm({
        redirect: "edit"
    });


    const { selectProps: funnelSelectProps } = useSelect({
        resource: "funnels",
        optionLabel: "label",
    });

    const FunnelInput = ()=>{
        if(query?.funnel_id) {
            return (
            <Form.Item
                label="Funnel"
                name={"funnel_id"}
                initialValue={parseInt(query?.funnel_id)}
                hidden={true}
            >
                <Input />
            </Form.Item>
            )
        }
        return (
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
                    {...funnelSelectProps} 
                />
            </Form.Item>
        )
    }


    return (
        <Create saveButtonProps={saveButtonProps}>
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
                <FunnelInput />
            </Form>
        </Create>
    );
};

