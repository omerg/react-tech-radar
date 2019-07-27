import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-console';
import {addParameters} from "@storybook/react";
import { themes } from '@storybook/theming';

// Option defaults.
addParameters({
    options: {
        theme: themes.dark,
    },
});
