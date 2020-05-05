export class User {
    id = 0;
    name = '';
    date = new Date();
    isActive = false;
    idRole = 0;
    role = new Role();
}

export class Role {
    id = 0;
    name = '';
}