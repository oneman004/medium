export interface Blog {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
    };
}

export interface SignupInput {
    name?: string;
    email: string;
    password: string;
}
  