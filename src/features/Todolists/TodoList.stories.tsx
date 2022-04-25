import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../../app/ReduxStoreProviderDecorator";
import {TodoList} from "./TodoList";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TodoList/TodoList',
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof TodoList>;


const Template: ComponentStory<typeof TodoList> = (args) => <TodoList {...args}/>;

export const TodoListStory = Template.bind({});

TodoListStory.args = {
    todolist: {
        id: "todolistId1",
        title: "What to learn",
        filter: "all",
        order: 0,
        addedDate: '',
        entityStatus: "idle"
    },
    changeTodoListStatus: action('changeTodoListStatus'),
    removeTodolist: action('removeTodolist'),
    changeFilter: action('changeFilter')
};

