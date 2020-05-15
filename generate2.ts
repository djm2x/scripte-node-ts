import * as fse from 'fs-extra';

export class Generate2 {

    constructor() { }

    methode() {
        const source = 'source';
        const asp = 'asp';
        const angular = `${asp}/angular/admin`;
        const files = fse.readdirSync('source');

        files.forEach(file => {

            if (file === 'admin-routing.module.ts') {
                fs.ensureDirSync(angular);
                const content = fs.readFileSync(`${source}/'admin-routing.module.ts'`, 'utf8');
            }


            else if (file === 'admin.module.ts') {

            }


            else if (file === 'DataSeeding.cs') {

            }


            else if (file === 'models.ts') {

            }


            else if (file === 'MyContext.cs') {

            }


            else if (file === 'static') {

            }


            else if (file === 'uow.service.ts') {

            }


            else if (file === 'update.component.html') {

            }


            else if (file === 'update.component.scss') {

            }


            else if (file === 'update.component.ts') {

            }


            else if (file === 'user.component.html') {

            }


            else if (file === 'user.component.scss') {

            }


            else if (file === 'user.component.ts') {

            }


            else if (file === 'User.cs') {

            }


            else if (file === 'user.service.ts') {

            }


            else if (file === 'UsersController.cs') {

            }







        })
    }
}