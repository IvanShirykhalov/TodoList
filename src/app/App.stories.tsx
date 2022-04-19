import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import App from "./App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: 'TodoList/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = (args) => <App/>;

export const AppStory = Template.bind({});

AppStory.args = {};

