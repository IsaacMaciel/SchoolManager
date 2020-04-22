const db = require('../../../config/db');
const {age,date} = require('../lib/utils');

module.exports = {

    all(callback){
        const query = `SELECT instructors.*, count(members) AS total_students
                        from instructors
                        LEFT JOIN members ON (instructors.id = members.instructor_id)
                        GROUP BY instructors.id
                        ORDER BY total_students DESC`;

        db.query(query,function(err,results) {
            if (err)  throw `Erro Detectado:${err}`;
 
            callback(results.rows);
        })

    },

    create(data,callback) {

        console.log(data);
        const query = `
            INSERT INTO instructors (
                avatar_url,
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                created_at
            ) VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id
        `;
        
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).iso
        ]

        db.query(query,values,function(err,results){
            if (err)  throw `Erro Detectado:${err}`;
            callback(results.rows[0]);
             
         })
    },

    find(id,callback) {
        db.query(`SELECT * from instructors WHERE id = $1`,[id],function(err,results){
            if (err)  throw `Erro Detectado:${err}`;

            callback(results.rows[0]);

        })
    },

    update(data,callback) {

        console.log(data);
        const query=` 
        UPDATE instructors SET
            avatar_url=($1),
            name=($2),
            birth_date=($3),
            education_level=($4),
            class_type=($5),
            subjects_taught=($6)
        WHERE id = $7`

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            data.id
        ];

        db.query(query,values,function(err,results){
            if (err)  throw `Erro Detectado:${err}`;
            callback();
             
         })
    },
    delete(id,callback) {
        db.query('DELETE FROM instructors WHERE id = $1',[id],function(err,results){
            if (err)  throw `Erro Detectado:${err}`;
            callback();
        })
    },
    findBy(filter,callback) {
        const query = `SELECT instructors.*, count(members) as total_students
        FROM instructors
        LEFT JOIN members ON (instructors.id = members.instructor_id)
        WHERE instructors.name ILIKE '%${filter}%'
        OR instructors.subjects_taught ILIKE '%${filter}%'
        GROUP BY instructors.id
        ORDER BY total_students DESC`;

        db.query(query,function(err,results){
            if (err) throw `Erro Detecado: ${err}`      
            callback(results.rows);
        })

    },
    paginate(params){

        const {filter,limit,offset,callback} = params;

        let query = "",
        filterQuery= "",
        totalQuery = `(
            SELECT count(*) FROM instructors
        ) AS total`

        if(filter) {
    
            filterQuery = `
            WHERE instructors.name ILIKE '%${filter}%'
            OR instructors.subjects_taught ILIKE '%${filter}%'
            `;         

            totalQuery = `(
                SELECT count(*) FROM instructors
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT instructors.*, ${totalQuery},count (members) AS total_students  
            FROM instructors
            LEFT JOIN members ON (instructors.id = members.instructor_id)
            ${filterQuery}
            GROUP BY instructors.id LIMIT ${limit} OFFSET ${offset}
            `
        db.query(query,function(err,results){
            if (err) throw `Erro detectado: ${err}`
    
            callback(results.rows);
            
        })

    }
}