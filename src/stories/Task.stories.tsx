import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../State/ReduxStoreProviderDecorator";
import {Task} from "../Task";


export default {
    title: 'TodoList/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task
    task={{id: '1.1', title: "HTML", isDone: true}}
    todolistId={"todolistId1"}
/>;

export const TaskStory = Template.bind({});

TaskStory.args = {};

