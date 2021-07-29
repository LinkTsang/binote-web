// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import User from './User';

class Article {
  title: string;
  author: User;
  createTime: Date;
  createdAt: Date;
  modifiedAt: Date;

  constructor(
    title: string,
    author: User,
    createTime: Date,
    createdAt: Date,
    modifiedAt: Date
  ) {
    this.title = title;
    this.author = author;
    this.createTime = createTime;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }
}

export default Article;
