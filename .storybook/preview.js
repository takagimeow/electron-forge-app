import React from 'react';
import { addDecorator } from '@storybook/react';
// import { withInfo } from "@storybook/addon-info";
import { Layout } from '../src/renderer/components/StorybookLayout';

addDecorator((storyFn) => {
  return <Layout>{storyFn()}</Layout>;
});
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
