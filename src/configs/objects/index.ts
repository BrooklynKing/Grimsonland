import * as spells from './spells';
import * as logic from './logic';
import * as units from './units';
import * as effects from './effects';
import * as terrain from './terrain';
import * as ui from './ui';

export const objectConfigs = {
    ...spells,
    ...logic,
    ...units,
    ...effects,
    ...terrain,
    ...ui
}

export { ObjectTypes } from './types';

export type OBJECTS_ID = keyof typeof objectConfigs;