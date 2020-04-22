const db = require('../../../config/db');
const {age,date} = require('../lib/utils');

module.exports = {

    all(callback){
    
        db.query('SELECT * from members ORDER BY name ASC',function(err,results) {
            if (err)  throw `Erro Detectado:${err}`;
 
            callback(results.rows);
        })

    },

    create(data,callback) {

        console.log(data);
        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                email,
                birth_date,
                grade_school,
                workload,
                instructor_id
            ) VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id
        `;
        
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth_date).iso,
            data.grade_school,
            data.workload,
            data.instructor
        ]

        db.query(query,values,function(err,results){
            if (err)  throw `Erro Detectado:${err}`;
            callback(results.rows[0]);
             
         })
    },

    find(id,callback) {
        const query = `SELECT members.*, instructors.name AS instructor_name
                     FROM members
                     LEFT JOIN instructors ON (members.instructor_id = instructors.id)
                    WHERE members.id = $1;`;

        db.query(query,[id],function(err,results){
            if (err)  throw `Erro Detectado:${err}`;

            callback(results.rows[0]);

        })
    },

    update(data,callback) {

        console.log(data);
        const query=` 
        UPDATE members SET
            avatar_url=($1),
            name=($2),
            email=($3),
            birth_date=($4),
            grade_school=($5),
            workload=($6),
            instructor_id=($7)
        WHERE id = $8`

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth_date).iso,
            data.grade_school,
            data.workload,
            data.instructor,
            data.id
        ];

        db.query(query,values,function(err,results){
            if (err)  throw `Erro Detectado:${err}`;
            callback();
             
         })
    },
    delete(id,callback) {
        db.query('DELETE FROM members WHERE id = $1',[id],function(err,results){
            if (err)  throw `Erro Detectado:${err}`;
            callback();
        })
    },
    InstructorSelectOptions(callback) {
        db.query(`SELECT id,name FROM instructors`,function(err,results){
            if (err) throw `Erro: ${err}`

            callback(results.rows);

        })
    },
    paginate(params){

        const {filter,limit,offset,callback} = params;

        let query = "",
        filterQuery= "",
        totalQuery = `(
            SELECT count(*) FROM members
        ) AS total`

        if(filter) {
    
            filterQuery = `
            WHERE members.name ILIKE '%${filter}%'
            OR members.email ILIKE '%${filter}%'
            `;         

            totalQuery = `(
                SELECT count(*) FROM members
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT members.*, ${totalQuery}
            FROM members
            ${filterQuery}
            LIMIT ${limit} OFFSET ${offset}
            `

        console.log(`Exibindo a query:${query}`);    
        db.query(query,function(err,results){
            if (err) throw `Erro detectado: ${err}`
          
            callback(results.rows);
            
        })

    }
}