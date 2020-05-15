export class UserBase {
    id = null;
    firstName = 'mohamed';
    lastName = 'mourabit';
    email = 'dj-m2x@hotmail.com';
    password = '123';
    verificationCode = '';
    emailVerified = false;
    userStatus = false;
    role = 'user';
}

export class User extends UserBase {
  matricule = '123';
  service = 'DIPE';
  fonction = 'Cadre';
}
