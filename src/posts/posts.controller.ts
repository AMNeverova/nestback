import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { LoginGuard } from 'src/common/guards/login.guard';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) { }
    
    @Get('tagged')
    getPostsWithTags(@Query() params) {
        let tagsArray = params.tags.split(',')
        return this.postService.getPosts(tagsArray);
    }

    @Get(':id')
    getPost(@Param() params) {
        let id = params.id;
        return this.postService.getRow(id);
    }

    @UseGuards(LoginGuard)
    @Put(':id/addtag')
    addTagToPost(@Param() params, @Query() data) {
        let id = params.id;
        let tagsArray = data.tags.split(',');
        this.postService.addTagToPost(id, tagsArray);       
    }

    @UseGuards(LoginGuard)
    @Delete(':id/deletetag')
    deleteTagFromPost(@Param() params, @Query() data) {
        let id = params.id;
        let tagsArray = data.tags.split(',');
        this.postService.deleteTagsFromPost(id, tagsArray);    }

    @Get()
    getPosts() {
        return this.postService.getFullTable();
    }

    @Post()
    addPost(@Body() data) {
        return this.postService.addRow(data);
    }

    @UseGuards(LoginGuard)
    @Put(':id')
    updatePost(@Body() data, @Param() params) {
        console.log('2')
        let id = params.id;
        return this.postService.updateRow(data, id);
    }
}
