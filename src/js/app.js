import '@scss/style';

import { pageNavigation } from '@js/modules/scroll/scroll'; pageNavigation();

import { lazyMedia } from '@js/libs/lazyLoad'; lazyMedia

import '@js/modules/scroll/watcher';

import '@js/components/popup';

import { formFieldsInit } from '@js/components/forms/formInit';
formFieldsInit();

import { formSubmit } from '@js/components/forms/formSubmit'; formSubmit();

import { webp } from '@js/modules/webp'; webp();

import '@js/modules/dynAdapt';
