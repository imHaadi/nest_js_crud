import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateDtoTodo } from './dto/creat-todo.dto';

@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService) { }


    @Get('list')
    list() {
        return this.todosService.getList();
    }

    @Get(':id/show')
    show(@Param('id') id: number) {
        return this.todosService.getById(id);
    }


    @Post('store')
    store(@Body() dto: CreateDtoTodo) {
        return this.todosService.createTodo(dto);
    }

    @Put(':id/update')
    update(@Param('id') id: number, @Body() dto: CreateDtoTodo) {
        return this.todosService.updateTodo(id, dto);
    }

    @Delete(':id/delete')
    delete(@Param('id') id: number) {
        return this.todosService.deleteTodo(id);
    }
}
