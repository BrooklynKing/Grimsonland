import * as spells from './spells';
import * as logic from './logic';
import * as units from './units';
import * as layers from './layers';
import * as ui from './ui';
import * as etc from './etc';

import { IGameRuleConfig } from './types';

const rules: { [key: string]: IGameRuleConfig } = {
  ...logic,
  ...spells,
  ...units,
  ...layers,
  ...ui,
  ...etc,
};

export default rules;
