import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { ConfigService } from '../config/config.service';

export const GraphQLDynamicModule = GraphQLModule.forRootAsync({
    useFactory: (configService: ConfigService) => {
        const { isDev } = configService.getConfigFor('env');

        return {
            typePaths: ['./**/*.graphql', './**/**/*.graphql'],
            context: ({ req }) => ({ req }),
            debug: isDev,
            playground: isDev,
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
                outputAs: 'class',
            },
        };
    },
});

// GraphQLModule.forRootAsync({
//     useFactory: (configService: ConfigService) => {
//         const { isDev } = configService.getConfigFor('env');

//         return {
//             playground: isDev,
//             autoSchemaFile: 'schema.gql',
//         };
//     },
//     inject: [ConfigService],
// });
