import { Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { Post } from 'src/entities/posts.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PostsService {
  private readonly updateAttributtes: Partial<keyof Post>[] = [
    'content',
    'title',
  ];

  constructor(@InjectModel(Post) private model: typeof Post) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    return this.model.create(createPostDto);
  }

  findAll(): Promise<Post[]> {
    return this.model.findAll();
  }

  findOne(id: string): Promise<Post> {
    return this.model.findByPk(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const [, [entity]] = await this.model.update(updatePostDto, {
      where: { id },
      returning: true,
    });
    return entity;
  }

  async delete(id: string): Promise<void> {
    const post = await this.findOne(id);
    await post.destroy();
  }
}
