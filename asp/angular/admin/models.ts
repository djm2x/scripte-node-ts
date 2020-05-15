export class User {
    id = 0;
    name = '';
    date = new Date();
    isActive = false;
    idRole = 0;
    role = new Role();
    blogs: Blog[] = [];
}

export class Role {
    id = 0;
    name = '';
}

export class Blog {
    id = 0;
    title = '';
    discription = '';
    imageUrl = '';
    date = new Date();
    idUser = 0;
    user = new User();
    category = new Category();
}

export class Category {
    id = 0;
    name = '';
    blogs: Blog[] = [];
}