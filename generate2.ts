import * as fse from 'fs-extra';
import { ClassReader } from './class-reader';

const ADMIN_ROUTING_MODULE_TS = 'admin-routing.module.ts';
const ADMIN_MODULE_TS = 'admin.module.ts';
const DATASEEDING_CS = 'DataSeeding.cs';
const MODELS_TS = 'models.ts';
const MYCONTEXT_CS = 'MyContext.cs';
const SUPER_SERVICE_TS = 'super.service.ts';
const SUPERCONTROLLER_CS = 'SuperController.cs';
const STATIC = 'static';
const UOW_SERVICE_TS = 'uow.service.ts';
const ACCOUNT_SERVICE_TS = 'account.service.ts';
const UPDATE_COMPONENT_HTML = 'update.component.html';
const UPDATE_COMPONENT_SCSS = 'update.component.scss';
const UPDATE_COMPONENT_TS = 'update.component.ts';
const USER_COMPONENT_HTML = 'user.component.html';
const USER_COMPONENT_SCSS = 'user.component.scss';
const USER_COMPONENT_TS = 'user.component.ts';
const USER_CS = 'User.cs';
const USER_SERVICE_TS = 'user.service.ts';
const USERSCONTROLLER_CS = 'UsersController.cs';
export class Generate2 {

    constructor() { }

    methode() {
        const primitivetypes = ['string', 'boolean', 'Date', 'number'];
        const source = 'source';
        const asp = 'asp';
        const angular = `${asp}/angular/admin`;
        const files = fse.readdirSync('source');

        const classes = new ClassReader().methode();

        files.forEach(file => {

            if (file === ADMIN_ROUTING_MODULE_TS) {
                // get content
                let content = fse.readFileSync(`${source}/${ADMIN_ROUTING_MODULE_TS}`, 'utf8');
                // let imports = '';
                let routes = '';
                // edit content
                classes.forEach(e => {
                    // imports += `import { ${this.Cap(e.class)}Component } from './${e.class}/${e.class}.component';\r\n`;
                    routes += `{ path: '${e.class}', loadChildren: () => import('./${e.class}/${e.class}.module').then(m => m.${this.Cap(e.class)}Module), data: {animation: '${e.class}'} },\r\n`;
                });

                // content = content.replace('/*{imports}*/', imports);
                content = content.replace('/*{routes}*/', routes);
                // write content in new location
                fse.ensureDirSync(angular);
                fse.writeFileSync(`./${angular}/${ADMIN_ROUTING_MODULE_TS}`, content);
                console.log(`>> ${ADMIN_ROUTING_MODULE_TS} done`);
            }

            else if (file === ADMIN_MODULE_TS) {
                // get content
                let content = fse.readFileSync(`${source}/${ADMIN_MODULE_TS}`, 'utf8');
                fse.writeFileSync(`./${angular}/${ADMIN_MODULE_TS}`, content);
                console.log(`>> ${ADMIN_MODULE_TS} done`);
            }


            else if (file === DATASEEDING_CS) {

            }


            else if (file === MODELS_TS) {
                let content = fse.readFileSync(`${MODELS_TS}`, 'utf8');
                fse.writeFileSync(`./${angular}/${MODELS_TS}`, content);
                console.log(`>> ${MODELS_TS} done`);
            }


            else if (file === MYCONTEXT_CS) {
                let content = fse.readFileSync(`${source}/${MYCONTEXT_CS}`, 'utf8');
                let entities = '';
                let models = '';

                fse.ensureDirSync(`./${asp}/Models`);

                classes.forEach(e => {
                    entities += `modelBuilder.Entity<${this.Cap(e.class)}>(entity => \r\n{`;
                    models = `using System; \r\n`;
                    models += `using System.Collections.Generic; \r\n`;
                    models += `namespace Models \r\n {`;
                    models += `public partial class ${this.Cap(e.class)} \r\n{`;
                    e.properties.forEach(p => {
                        const isTypePrimitive = primitivetypes.indexOf(p.type) >= 0;
                        if (isTypePrimitive) {
                            if (p.name.toLowerCase() === 'id') {
                                entities += `entity.HasKey(e => e.${this.Cap(p.name)});\r\n`;
                                entities += `entity.Property(e => e.${this.Cap(p.name)}).ValueGeneratedOnAdd();\r\n`;

                                models += `public ${p.type !== 'Date' ? p.type : 'DateTime'} ${this.Cap(p.name)} { get; set; }\r\n`;
                            } else {
                                entities += `entity.Property(e => e.${this.Cap(p.name)}).IsRequired(false);\r\n`;

                                models += `public ${p.type !== 'Date' ? p.type : 'DateTime'} ${this.Cap(p.name)} { get; set; }\r\n`;
                            }
                        } else {
                            if (p.type.includes('[]')) {
                                const cls = p.type.replace('[]', '').toLowerCase();
                                entities += `entity.HasMany(d => d.${this.Cap(cls)}s).WithOne(p => p.${this.Cap(e.class)}).HasForeignKey(d => d.Id${this.Cap(e.class)}).OnDelete(DeleteBehavior.NoAction);\r\n`;

                                models += `public virtual ICollection<${this.Cap(cls)}> ${this.Cap(cls)}s { get; set; }\r\n`;
                            } else {
                                entities += `entity.HasOne(d => d.${this.Cap(p.type)}).WithMany(p => p.${this.Cap(e.class)}s).HasForeignKey(d => d.Id${this.Cap(p.type)});\r\n`;

                                models += `public virtual ${this.Cap(p.type)} ${this.Cap(p.type)} { get; set; }\r\n`;
                            }
                        }

                    });
                    entities += '});\r\n\r\n';
                    models += '}\r\n}\r\n';

                    fse.writeFileSync(`./${asp}/Models/${this.Cap(e.class)}.cs`, models);
                });
                // content = content.replace('/*{imports}*/', imports);
                content = content.replace('/*{entities}*/', entities);
                // write content in new location

                fse.writeFileSync(`./${asp}/Models/${MYCONTEXT_CS}`, content);
                console.log(`>> ${MYCONTEXT_CS} done`);

                // create models


            }

            else if (file === USERSCONTROLLER_CS) {
                let content = fse.readFileSync(`${source}/${USERSCONTROLLER_CS}`, 'utf8');
                // edit content
                classes.forEach(e => {
                    let whereClause = '';
                    let params = '';
                    let params2 = '';

                    e.properties.forEach(p => {
                        const isTypePrimitive = primitivetypes.indexOf(p.type) >= 0;
                        if (isTypePrimitive && p.name.toLowerCase() !== 'id' && p.type !== 'Date' && p.type !== 'boolean'
                            && !p.name.startsWith('im') && !p.name.startsWith('disc')) {

                            params += `/{${p.name}}`;
                            params2 += `, ${p.type === 'number' ? 'int' : p.type} ${p.name}`;

                            if (p.type === 'number') {
                                whereClause += `.Where(e => ${p.name} == 0 ? true : e.${this.Cap(p.name)} == ${p.name})\r\n`;
                            } else {
                                whereClause += `.Where(e => ${p.name} == "*" ? true : e.${this.Cap(p.name)}.ToLower().Contains(${p.name}.ToLower()))\r\n`;
                            }
                        }
                    });

                    // content = content.replace('/*{imports}*/', imports);
                    let newContent = content.replace('/*{params}*/', params);
                    newContent = newContent.replace('/*{params2}*/', params2);
                    newContent = newContent.replace('/*{whereClause}*/', whereClause);

                    newContent = newContent.replace(/User/g, this.Cap(e.class));
                    // write content in new location

                    fse.ensureDirSync(`./${asp}/Controllers`);

                    fse.writeFileSync(`./${asp}/Controllers/${this.Cap(e.class)}Controller.cs`, newContent);
                    console.log(`>> ${this.Cap(e.class)}Controller.cs done`);
                });

                const distination = `${asp}/Controllers`;
                fse.ensureDirSync(distination);
                fse.copySync(`${source}/${SUPERCONTROLLER_CS}`, `${distination}/${SUPERCONTROLLER_CS}`)
            }


            // else if (file === STATIC) {

            // }

            // else if (file === SUPER_SERVICE_TS) {
            // fs.copySync('/tmp/myfile', '/tmp/mynewfile')
            // }


            // else if (file === SUPERCONTROLLER_CS) {

            // }


            else if (file === UOW_SERVICE_TS) {
                const distination = `${asp}/angular/src/app/services`;
                fse.ensureDirSync(distination);
                fse.copySync(`${source}/${SUPER_SERVICE_TS}`, `${distination}/${SUPER_SERVICE_TS}`);
                fse.copySync(`${source}/${ACCOUNT_SERVICE_TS}`, `${distination}/${ACCOUNT_SERVICE_TS}`);

                let content = fse.readFileSync(`${source}/${UOW_SERVICE_TS}`, 'utf8');
                let contentService = fse.readFileSync(`${source}/${USER_SERVICE_TS}`, 'utf8');

                let imports = '';
                let services = '';
                // edit content
                classes.forEach(e => {
                    let params = '';
                    let params2 = '';
                    imports += `import { ${this.Cap(e.class)}Service } from './${e.class}.service';\r\n`;
                    services += `${e.class}s = new ${this.Cap(e.class)}Service();\r\n`;

                    e.properties.forEach(p => {
                        const isTypePrimitive = primitivetypes.indexOf(p.type) >= 0;

                        if (isTypePrimitive && p.name.toLowerCase() !== 'id' && p.type !== 'Date' && p.type !== 'boolean'
                            && !p.name.startsWith('im') && !p.name.startsWith('disc')) {

                            params += `, ${p.name}`;
                            params2 += `/\${${p.name}}`;
                        }
                    });

                    // content = content.replace('/*{imports}*/', imports);
                    contentService = contentService.replace('/*{params}*/', params);
                    contentService = contentService.replace('/*{params2}*/', params2);
                    contentService = contentService.replace(/User\$/g, this.Cap(e.class));
                    contentService = contentService.replace(`('users')`, `('${e.class}s')`);

                    // write content in new location
                    fse.writeFileSync(`./${distination}/${e.class}.service.ts`, contentService);
                    console.log(`>> ${e.class}.service.ts done`);
                });

                content = content.replace('/*{imports}*/', imports);
                content = content.replace('/*{services}*/', services);
                // write content in new location
                fse.writeFileSync(`./${distination}/${UOW_SERVICE_TS}`, content);
                console.log(`>> ${UOW_SERVICE_TS} done`);
            }

            // angular
            else if (file === UPDATE_COMPONENT_HTML) {

            }


            // else if (file === UPDATE_COMPONENT_SCSS) {

            // }


            else if (file === UPDATE_COMPONENT_TS) {

            }


            else if (file === USER_COMPONENT_HTML) {



            }


            // else if (file === USER_COMPONENT_SCSS) {

            // }


            else if (file === USER_COMPONENT_TS) {

            }


            // else if (file === USER_CS) {

            // }


            // else if (file === USER_SERVICE_TS) {

            // }




        })
    }

    Cap(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
}