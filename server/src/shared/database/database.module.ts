// import { MongooseModule } from '@nestjs/mongoose';

// import { ConfigService } from 'app/shared/config/config.service';

// export const DBDynamicModule = MongooseModule.forRootAsync({
//     useFactory: async (configService: ConfigService) => {
//         const { username, password } = configService.getConfigFor('db');

//         return {
//             uri: `mongodb+srv://${username}:${password}@quiz-khgyk.mongodb.net/test?retryWrites=true&w=majority`,
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         };
//     },
//     inject: [ConfigService],
// });
