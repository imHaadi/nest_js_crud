import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateDtoTodo } from './dto/creat-todo.dto';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,) { }

    async getList() {
        return await this.todoRepository.find();
    }

    async getById(id: number) {
        const found = await this.todoRepository.findOne({ where: { id: id } })
        if (!found) throw new NotFoundException(`Todo ${id} not found`);
        return found;
    }

    async createTodo(dto: CreateDtoTodo): Promise<Todo> {
        const todo = this.todoRepository.create(dto)

        return await this.todoRepository.save(todo)
    }

    async updateTodo(id: number, dto: CreateDtoTodo): Promise<Todo> {
        const todo = await this.getById(id);

        Object.assign(todo, dto);

        await this.todoRepository.save(todo);

        return todo;

    }

    async deleteTodo(id: number) {
        const todo = await this.getById(id);

        await this.todoRepository.remove(todo);

        return null;

    }
}
