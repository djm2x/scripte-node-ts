var express = require('express');
var app = express();
var sql = require("mssql");
var mysql = require('mysql');
var moment = require("moment");
const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../../Marit/connectingroup/project/database/database.sqlite');
var config = {
  user: 'sa',
  password: '123',
  server: 'DESKTOP-DSCSU8R\\DB_SERVER',
  database: 'ph20061488699_DB_CG',
  options: {
    enableArithAbort: false
  }
};

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'connectiongroup'
});


async function dbM() {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    // await sql.connect('mssql://sa:123@DESKTOP-DSCSU8R\\DB_SERVER/ph20061488699_DB_CG')
    await sql.connect(config);
    const req = ` 
      select a.Id_Article as id,
        a.Titre_Article as title,
        a.Contenu as description,
        a.Date as date,
        a.image as imageUrl,
        c.Libelle as type,
        1 as idUser,
        '2020-04-24 03:49:25' as created_at,
        '2020-04-24 03:49:25' as updated_at
      from Article a
        join Categorie c on c.Id_Categorie = a.Id_Categorie
      where c.Id_Categorie <> 1 and c.Id_Categorie <> 3 and c.Id_Categorie <> 30
      `;

    const rr = `
    select a.Id_Article as id,
      a.Titre_Article as title,
      a.Contenu as description,
      CAST(a.Date AS date) as date,
      a.image as imageUrl,
      '2020-04-24 03:49:25' as created_at,
      '2020-04-24 03:49:25' as updated_at
    from Article a
      join Categorie c on c.Id_Categorie = a.Id_Categorie

    where (a.Id_Article between 2 and 6 or a.Id_Article = 103 or a.Id_Article = 9)
    `;

    const member = `
    select [ID_MEMBRE] as id,
        ISNULL(NULLIF([NOM_MEMBRE], ''), 'no name') as nom,
        ISNULL(NULLIF([PRENOM_MEMBRE], ''), 'no name') as prenom,
        ISNULL(NULLIF([EMAIL_MEMBRE], ''), 'no-' + [NOM_MEMBRE] + '@email.com') as email,
            [TEl_MEMBRE] as phone,
            [ADRESSE_MEMBRE] as adresse,
            [CIN] as cin,
        [ORG_MEMBRE] as organisation,
        123 as password,
        'user' as role,
        [ID_REGION] as idRegion,
        Null as rememberToken,
        [IS_ACTIF_MEMBRE] as isActive,
        ISNULL(NULLIF([DATE_NAISSANCE], ''), '2020-05-01 00:00:00') as date,
            '2020-05-01 03:49:25' as created_at,
            '2020-05-01 03:49:25' as updated_at
    from [MEMBRE]
    where ID_MEMBRE <> 404
    `;

    const memberInsert = 'INSERT INTO users (nom, prenom, email, phone, adresse, cin, organisation, password, role, idRegion, remember_token, isActive, date, created_at, updated_at) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

    const r2 = 'select * from region'
    const result = await sql.query(rr)
    // console.dir(result.recordset)
    // return;
    const list = result.recordset as any[];
    // let s = 'insert into blogs values \r\n';

    list.forEach((e, i) => {


      // connection.query(memberInsert
      // , [e.nom, e.prenom, e.email, e.phone, e.adresse, e.cin, e.organisation, e.password, e.role
      //   , e.idRegion ? e.idRegion : 62, e.rememberToken, e.isActive === null ? 0 : e.isActive, e.date ? e.date : new Date(2020, 5, 1), e.created_at, e.updated_at]
      // , function (error, results, fields) {
      //   // if (error) throw error;
      //   // connected!
      // });

      // db.run(memberInsert, 
      // [e.nom, e.prenom, e.email, e.phone, e.adresse, e.cin, e.organisation, e.password, e.role
      //   , e.idRegion ? e.idRegion : 62, e.rememberToken, e.isActive, e.date ? moment(e.date).format('YYYY-MM-DD HH:MM:SS') : moment(new Date(2020, 5, 1)).format('YYYY-MM-DD HH:MM:SS'), e.created_at, e.updated_at]);



      // db.run("INSERT INTO blogs (title, description, date, imageUrl, type, idUser, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?)",
      //   [e.title, e.description, e.date ? moment(e.date).format('YYYY-MM-DD HH:MM:SS') : moment(new Date(2012, 1, 1)).format('YYYY-MM-DD HH:MM:SS'), e.imageUrl, e.type, e.idUser, e.created_at, e.updated_at]);


      // connection.query('INSERT INTO blogs (title, description, date, imageUrl, type, idUser, created_at, updated_at) values (?,?,?,?,?,?,?,?)'
      //   , [e.title, e.description, e.date, e.imageUrl, e.type, e.idUser, e.created_at, e.updated_at]
      //   , function (error, results, fields) {
      //     if (error) throw error;
      //     // connected!
      //   });

      connection.query('INSERT INTO articles (title, description, date, imageUrl, created_at, updated_at) values (?,?,?,?,?,?)'
      , [e.title, e.description,  e.date ? e.date : new Date(2012, 1, 1), e.imageUrl, e.created_at, e.updated_at]
      , function (error, results, fields) {
        if (error) throw error;
        // connected!
      });

      // db.run("INSERT INTO articles (title, description, date, imageUrl, created_at, updated_at) values (?,?,?,?,?,?)", 
      // [e.title, e.description,  e.date ? moment(e.date).format('YYYY-MM-DD') : moment(new Date(2012, 1, 1)).format('YYYY-MM-DD'), e.imageUrl, e.created_at, e.updated_at]);

    });

    // fs.writeFile('blog.sql', s, () => {});



    const ll = [
      {
        id: 13,
        title: 'Section Rabat - Kénitra Mme Asmae CHRAIBI',
        description: '<div>Section Rabat - K&#233;nitra</div><div>Mme Asmae CHRAIBI</div>',
        date: '2020-04-24',
        imageUrl: null,
        type: 'Sections nationales',
        idUser: 1,
        created_at: '2020-04-24 04:03:08',
        updated_at: '2020-04-27 20:41:49'
      },
      {
        id: 14,
        title: 'Section Fès Mme Siada MSEFER',
        description: '<div>Section F&#232;s Mme</div><div>Siada MSEFER</div>',
        date: '2020-04-24',
        imageUrl: null,
        type: 'Sections nationales',
        idUser: 1,
        created_at: '2020-04-24 04:03:31',
        updated_at: '2020-04-27 20:41:28'
      },
      {
        id: 15,
        title: 'Section Meknès  Nadia MAAZOUZ',
        description: '<div>Section Mekn&#232;s&#160; <br></div><div>Nadia MAAZOUZ</div>',
        date: '2020-04-24',
        imageUrl: null,
        type: 'Sections nationales',
        idUser: 1,
        created_at: '2020-04-24 04:03:45',
        updated_at: '2020-04-27 20:41:11'
      },
      {
        id: 16,
        title: 'Section Tanger Nawal BENHADDOU',
        description: '<div>Section Tanger <br></div><div>Nawal BENHADDOU</div>',
        date: '2020-04-24',
        imageUrl: null,
        type: 'Sections nationales',
        idUser: 1,
        created_at: '2020-04-24 04:03:57',
        updated_at: '2020-04-27 20:40:56'
      },
      {
        id: 17,
        title: 'Section Marrakech Bahija GOUIMI',
        description: '<div>Section Marrakech <br></div><div>Bahija GOUIMI</div>',
        date: '2020-04-24',
        imageUrl: null,
        type: 'Sections nationales',
        idUser: 1,
        created_at: '2020-04-24 04:04:09',
        updated_at: '2020-04-27 20:40:45'
      },
      {
        id: 18,
        title: 'Section Agadir Ibtissam SETTI',
        description: '<div>Section Agadir <br></div><div>Ibtissam SETTI</div>',
        date: '2020-04-24',
        imageUrl: '1573748992229_thumbnail_needyou.jpg;',
        type: 'Sections nationales',
        idUser: 1,
        created_at: '2020-04-24 04:04:19',
        updated_at: '2020-04-27 21:47:52'
      }
    ];

    // ll.forEach((e, i) => {
    //   // moment(e.date).format('YYYY-MM-DD')


    //   db.run("INSERT INTO blogs (title, description, date, imageUrl, type, idUser, created_at, updated_at) VALUES(?,?,?,?,?,?,?,?)",
    //     [e.title, e.description, e.date ? moment(e.date).format('YYYY-MM-DD HH:MM:SS') : moment(new Date(2012, 1, 1)).format('YYYY-MM-DD HH:MM:SS'), e.imageUrl, e.type, e.idUser, e.created_at, e.updated_at]);


    //   connection.query('INSERT INTO blogs (title, description, date, imageUrl, type, idUser, created_at, updated_at) values (?,?,?,?,?,?,?,?)'
    //     , [e.title, e.description, e.date, e.imageUrl, e.type, e.idUser, e.created_at, e.updated_at]
    //     , function (error, results, fields) {
    //       if (error) throw error;
    //       // connected!
    //     });
    // });

    // db.all('select * from blogs', (e, r) => {
    //   // console.log(r[0])
    //   r.forEach((e, i) => {
    //     console.log(e.id, moment(e.date).format('YYYY-MM-DD'))
    //     connection.query('INSERT INTO blogs (title, description, date, imageUrl, type, idUser, created_at, updated_at) values (?,?,?,?,?,?,?,?)'
    //       , [e.title, e.description, moment(e.date).format('YYYY-MM-DD') , e.imageUrl, e.type, e.idUser, e.created_at, e.updated_at]
    //       , function (error, results, fields) {
    //         if (error) throw error;
    //         // connected!
    //       });
    //   });
    // })



    console.log('write done')

  } catch (e) {
    console.log(e)
  }
}


dbM()
// var server = app.listen(5000, async function () {
//   await db()
//   console.log('Server is running..');


// });
