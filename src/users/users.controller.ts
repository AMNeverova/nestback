import { Controller, Get, Post, Body, Put, Param, Options, Header, Delete, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { LoginGuard } from 'src/common/guards/login.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
    constructor(public userService: UsersService) { }

    @Options()
    @Header('Access-Control-Allow-Origin', '*')
    @Header('Access-Control-Allow-Headers', '*')
    @Header('Access-Control-Allow-Method', '*')
    response() {
        console.log('1')
    }
    
    @UseGuards(AuthenticatedGuard)
    @Get(':id/posts')
    getUserPosts(@Param() params) {
        let id = params.id;
        return this.userService.getPosts(id);
    }


    @Get(':id')
    getUser(@Param() params) {
        let id = params.id;
        return this.userService.getRow(id);
    }


    @Get()
    getUsers() {
        return this.userService.getFullTable();
    }

    @UseGuards(LoginGuard)
    @Post('login')
    login(@Res() res: Response) {
        res.redirect('')
    }

    @Post('register')
    addUser(@Body() user) {
        return this.userService.addRow(user);
    }

    @UseGuards(LoginGuard)
    @Put(':id')
    changeUser(@Param() params, @Body() data) {
        let id = params.id;
        this.userService.updateRow(data, id);
    }

    @UseGuards(LoginGuard)
    @Delete(':id')
    deleteUser(@Param() params) {
        let id = params.id;
        this.userService.deleteRow(id);
    }
}
