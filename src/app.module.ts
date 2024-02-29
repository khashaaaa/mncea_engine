import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { envconfig } from 'config/envconfig'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { BasecategoryModule } from './basecategory/basecategory.module'
import { MidcategoryModule } from './midcategory/midcategory.module'
import { SubcategoryModule } from './subcategory/subcategory.module'
import { PostModule } from './post/post.module'
import { UserModule } from './user/user.module'
import { PageModule } from './page/page.module'
import { CompliantModule } from './compliant/compliant.module'
import { PartnershipModule } from './partnership/partnership.module'
import { SearchModule } from './search/search.module'
import { HeadcategoryModule } from './headcategory/headcategory.module';
import { SocialModule } from './social/social.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/variables/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [envconfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        host: cs.get('PG_HOST'),
        port: cs.get('PG_PORT'),
        username: cs.get('PG_USER'),
        password: cs.get('PG_PWD'),
        database: cs.get('PG_NAME'),
        synchronize: true,
        autoLoadEntities: true
      })
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (confs: ConfigService) => ({
        global: true,
        secret: confs.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d'
        }
      }),
      inject: [ConfigService]
    }),
    BasecategoryModule,
    MidcategoryModule,
    SubcategoryModule,
    PostModule,
    UserModule,
    PageModule,
    CompliantModule,
    PartnershipModule,
    SearchModule,
    HeadcategoryModule,
    SocialModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
