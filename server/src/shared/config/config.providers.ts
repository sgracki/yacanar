import { Provider } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

import { ConfigService } from './config.service';

export const configProviders: Provider[] = [{
    provide: ConfigService,
    useValue: new ConfigService(
        fs.readFileSync(join(__dirname, '../../../.env')).toString(),
    ),
}];
