//create

const Instructor = require('../models/Instructor');
const intl = require('intl');
const {age,date,classType} = require('../lib/utils');

module.exports = {

    create(req,res) {
        return res.render('instructors/create');
    },
    index(req,res){
       let {filter,page,limit} = req.query;

       page = page || 1;
       limit = limit || 2;
       let offset = limit * (page -1);

       const params = {
           filter,
           page,
           limit,
           offset,

           callback(instructors) {
               console.log(`Exibindo o valor do instructors: ${instructors}`);
                const pagination = {
                    page,
                    total: Math.ceil(instructors[0].total / limit),
                }
                
                return res.render('instructors/index',{instructors,pagination,filter});
            }
       };

        Instructor.paginate(params);
      
    },
    post(req,res){
        const keys = Object.keys(req.body);

        for( key of keys) {
            if (req.body[key] == "") {
                return res.send('Favor, preencha todos os campos corretamente.');
            }
        }

        Instructor.create(req.body,function(instructor){
            return res.redirect(`/instructors/${instructor.id}`);
        })
       
    
    },
    update(req,res){
        Instructor.find(req.params.id,function(instructors){
            if (!instructors) return res.send("Instructor not found!");
            instructors.birth_date = date(instructors.birth_date).iso;
                res.render('instructors/edit', {instructors});
      
            
        })

    },
    put(req,res){

        const keys = Object.keys(req.body);

        for( key of keys) {
            if (req.body[key] == "") {
                return res.send('Favor, preencha todos os campos corretamente.');
            }
        }
        
        Instructor.update(req.body,function(instructor) {
            return res.redirect(`/instructors/${req.body.id}`);
        })

    },
    show(req,res){
        Instructor.find(req.params.id,function(instructors){
            if (!instructors) return res.send("Instructor not found!");

            instructors.birth_date = age(instructors.birth_date);
            instructors.class_type = classType(instructors.class_type);
            instructors.subjects_taught = instructors.subjects_taught.split(',');
            instructors.created_at = date(instructors.created_at).format;
            res.render('instructors/show', {instructors});

            
            
        })
    },
    delete(req,res){
        Instructor.delete(req.body.id,function(){
            return res.redirect('/instructors');
        })
    },
}
