import { Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { envConfig } from 'src/shared/configs';
import {
  accessSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import path, { join } from 'path';
import { Post } from 'src/entities/posts.entity';
import { v4 } from 'uuid';
import { pick } from 'lodash';

const { dataFolderPath } = envConfig;
const filePath = join(dataFolderPath, 'posts.json');

@Injectable()
export class PostsService {
  private readonly updateAttributtes: Partial<keyof Post>[] = [
    'content',
    'title',
  ];

  private createIfNotExists = () => {
    const exists = existsSync(filePath);

    if (!exists) {
      writeFileSync(filePath, JSON.stringify([]), 'utf-8');
    }
  };

  private readFile = (): Post[] => {
    this.createIfNotExists();
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  };

  private writeFile = (posts: Post[]) => {
    this.createIfNotExists();
    writeFileSync(filePath, JSON.stringify(posts), 'utf-8');
  };

  create(createPostDto: CreatePostDto): Post {
    const newItem = {
      id: v4(),
      ...createPostDto,
    };
    this.writeFile([...this.readFile(), newItem]);
    return newItem;
  }

  findAll(): Post[] {
    return this.readFile();
  }

  findOne(id: string): Post {
    return this.readFile().find((post) => post.id === id);
  }

  update(id: string, updatePostDto: UpdatePostDto): Post {
    const data = this.readFile();
    const updates = pick(updatePostDto, this.updateAttributtes);
    const item = data.find((post) => post.id === id);
    const index = data.findIndex((post) => post.id === id);

    const updatedItem = {
      ...item,
      ...updates,
    };

    if (item && index !== undefined) {
      this.writeFile([
        ...data.slice(0, index),
        updatedItem,
        ...data.slice(index + 1),
      ]);
    }
    return updatedItem;
  }

  remove(id: string) {
    this.writeFile(this.readFile().filter((post) => post.id !== id));
    return;
  }
}
