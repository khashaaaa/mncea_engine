import { Body, Controller, Post } from "@nestjs/common"
import { SearchService } from "./search.service"

@Controller('search')
export class SearchController {

    constructor(private readonly searchServ: SearchService) { }

    @Post()
    async search(@Body() body: any) {
        return await this.searchServ.search(body)
    }
}