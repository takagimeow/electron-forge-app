import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
// eslint-disable-next-line import/extensions
import { IconExample } from '../renderer/components/IconExample';

export default {
  title: 'Example/IconExample',
  component: IconExample,
} as Meta;

const Template: Story<Parameters<typeof IconExample>> = () => <IconExample />;

export const Normal = Template.bind({});
Normal.args = [];
