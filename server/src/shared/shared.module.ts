import { Module, Global } from '@nestjs/common';

// import { DBDynamicModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { GraphQLDynamicModule } from './graphql/graphql.module';

@Global()
@Module({
    imports: [
        ConfigModule,
        // DBDynamicModule,
        GraphQLDynamicModule,
    ],
    exports: [
        ConfigModule,
        // DBDynamicModule,
        GraphQLDynamicModule,
    ],
})
export class SharedModule { }
