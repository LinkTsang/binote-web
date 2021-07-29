// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class User {
  userId: number;
  userName: string;

  constructor(userId: number, userName: string) {
    this.userId = userId;
    this.userName = userName;
  }
}

export default User;
