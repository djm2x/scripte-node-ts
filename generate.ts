import * as fs from 'fs';
import { ClassReader } from './class-reader';


export class Generate {

  methode() {

    const cr = new ClassReader();
    const oldName = 'region';
    const oldCap = oldName.charAt(0).toUpperCase() + oldName.slice(1);

    const dir = `./${oldName}`;
    let tableRow = `<ng-container matColumnDef="{name}">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>{name}</th>
      <td mat-cell *matCellDef="let row">{{row.{name}{pipe}}}</td>
    </ng-container>`;

    const formField = `<mat-form-field appearance="fill" class="col-md-6">
      <mat-label>{name}</mat-label>
      <input matInput formControlName="{name}" required>
    </mat-form-field>`;

    let selectField = `<mat-form-field appearance="fill" class="col-md-6">
    <mat-label>{class}</mat-label>
    <mat-select formControlName="id{class}" readonly>
      <mat-option *ngFor="let e of uow.{class}s" [value]="e.id">{{ e.{name} }}</mat-option>
    </mat-select>
  </mat-form-field>`;



    const files = fs.readdirSync(dir);
    const sub = fs.readdirSync(dir + '/update');



    const models = cr.methode();

    // console.log(models);



    models.forEach(e => {
      const newName = e.class.toLowerCase();
      const newCap = newName.charAt(0).toUpperCase() + newName.slice(1);
      const newdir = `./generation/${newName}`;

      if (!fs.existsSync(newdir)) {
        fs.mkdirSync(newdir);
      }


      files.forEach(file => {
        if (!fs.lstatSync(`${dir}/${file}`).isDirectory()) {
          const content = fs.readFileSync(`${dir}/${file}`, 'utf8');

          let newContent = content.replace(new RegExp(oldName, 'g'), newName);
          newContent = newContent.replace(new RegExp(oldCap, 'g'), newCap);

          let tableRows = '';
          let columnDefs = '';
          let b = '';
          e.properties.forEach(p => {
            if (!p.name.includes('id')) {
              if (p.name.includes('date')) {
                // console.log('>>>>>>>>>>>>>>>>>>>>', p.name)
                b = tableRow.replace(new RegExp('{pipe}', 'g'), ' | date : "dd/MM/yyyy"');
                tableRows += b.replace(new RegExp('{name}', 'g'), p.name);
              } else {
                // console.log('>>>>>>>>>>>>>>>>>>>>', p.name)
                b = tableRow.replace(new RegExp('{pipe}', 'g')
                  , p.type.includes('bool') ? ` ? 'Oui' : 'Non'` : '');
                tableRows += b.replace(new RegExp('{name}', 'g'), p.name);
              }
              // columnDefs += JSON.stringify(p.name) + ',';
              columnDefs += `'${p.name}' ,`;
            }
          })

          newContent = newContent.replace('{tableRows}', tableRows);
          newContent = newContent.replace('/*{columnDefs}*/', columnDefs);
          //
          // console.log(oldName, newName, oldCap, newCap)
          const fileName = file.replace(oldName, newName);
          // console.log(fileName, content.substring(0, 20))

          fs.writeFileSync(`${newdir}/${fileName}`, newContent);

        } 

        // fs.renameSync(filePath, newFilePath);
      });

      sub.forEach(sb => {
        const file = 'update';
          if (!fs.existsSync(`${newdir}/${file}`)) {
            fs.mkdirSync(`${newdir}/${file}`);
          }

          const fls = fs.readdirSync(`${dir}/${file}`);

          fls.forEach(f => {
            const content = fs.readFileSync(`${dir}/${file}/${f}`, 'utf8');

            let newContent = content.replace(new RegExp(oldName, 'g'), newName);
            newContent = newContent.replace(new RegExp(oldCap, 'g'), newCap);

            let formFields = '';
            let myFormfields = '';
            // let select = '';
            if (f.startsWith('update')) {
              e.properties.forEach(p => {
                if (!p.name.includes('id')) {


                  if (['string', 'boolean', 'Date', 'number'].indexOf(p.type) >= 0) {
                    formFields += formField.replace(new RegExp('{name}', 'g'), p.name) + '\r\n';
                  } else {
                    // generate a select input html 
                    const cls = models.find(c => c.class === p.type)

                    if (cls) {
                      // add select input to html
                      console.log(cls.class)

                      selectField = selectField.replace(new RegExp('{class}', 'g'), cls.class);
                      formFields += selectField.replace(new RegExp('{name}', 'g'), cls.properties[1].name);
                    }
                  }
                }
                // columnDefs += JSON.stringify(p.name) + ',';
                myFormfields += `${p.name}: [this.o.${p.name}, Validators.required],\r\n`;
              })
            }

            // newContent = newContent.replace('{selectFields}', select);
            newContent = newContent.replace('{formFields}', formFields);
            newContent = newContent.replace('/*{myFormfields}*/', myFormfields);
            // //
            // // console.log(oldName, newName, oldCap, newCap)
            // const fileName = file.replace(oldName, newName);
            // // console.log(fileName, content.substring(0, 20))

            fs.writeFileSync(`${newdir}/update/${f}`, newContent);
          })


        
      })

    });

    console.log('done')

  }
}