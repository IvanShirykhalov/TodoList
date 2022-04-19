import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'TodoList/EditableSpan',
    component: EditableSpan,

    argTypes: {
        onChange: {
            description: 'Changes span'
        },
        title: {
            description: 'Value to editableSpan',
            //defaultValue: 'HTML'
        },
    },
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
    onChange: action('changes EditableSpan'),
    title: 'JS'
};

