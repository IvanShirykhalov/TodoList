import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../../app/ReduxStoreProviderDecorator";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


export default {
    title: 'TodoList/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = () => <Task
    task={{
        id: '1.1',
        title: "HTML",
        status: TaskStatuses.Completed,
        addedDate: '',
        description: '',
        deadline: '',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        todoListId: '1'
    }}
    todolistId={"todolistId1"}
/>;

export const TaskStory = Template.bind({});

TaskStory.args = {};

