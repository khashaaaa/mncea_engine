import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import * as fs from 'fs'
import * as path from 'path'
import * as jwt from 'jsonwebtoken'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('/tinydrive')
  async generateTinyDriveJwt() {

    const privateKeyPath = path.join(process.env.HOME, 'tinydrive_key')

    const privateKey = fs.readFileSync(privateKeyPath, 'utf8').trim()

    const payload = {
      sub: '123',
      name: 'admin',
      exp: Math.floor(Date.now() / 1000) + 60 * 10
    }

    try {
      const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' })

      return { token }
    }
    catch (error) {
      console.log(error)
      return {
        ok: false,
        message: error.message
      }
    }
  }
}
