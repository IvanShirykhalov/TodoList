import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../State/ReduxStoreProviderDecorator";
import {TodoList} from "../TodoList";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TodoList/TodoList',
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof TodoList>;


const Template: ComponentStory<typeof TodoList> = (args) => <TodoList {...args}/>;

export const TodoListStory = Template.bind({});

TodoListStory.args = {
    id: "todolistId1",
    title: "What to learn",
    filter: "all",
    changeTodoListStatus: action('changeTodoListStatus'),
    removeTodolist: action('removeTodolist'),
    changeFilter: action('changeFilter')
};

