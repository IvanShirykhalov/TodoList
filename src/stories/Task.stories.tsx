import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../State/ReduxStoreProviderDecorator";
import {Task} from "../Task";
import {v1} from "uuid";


export default {
    title: 'TodoList/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>;

export const TaskStory = Template.bind({});

TaskStory.args = {
    todolistId: "todolistId1",
    task: {id: v1(), title: "HTML", isDone: true},
};

