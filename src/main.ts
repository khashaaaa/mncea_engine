import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { json, urlencoded } from 'express'

async function bootstrap() {

  const port = process.env.PROG_PORT || 8080

  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'
  })

  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))

  await app.listen(port)
}

bootstrap()