export class User {
  username: string;
  name: string;
  password: string;

  constructor()

  constructor(username?, name?, password?) {
    this.username = username;
    this.name = name;
    this.password = password;
  }
}
