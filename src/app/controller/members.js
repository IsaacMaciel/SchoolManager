const {date,grade} = require('../lib/utils');
const member = require('../models/Member');


module.exports = {

    create(req,res) {
        member.InstructorSelectOptions(function(options){

            return res.render('members/create',{instructorOptions: options});
        })
        
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

           callback(members) {
               console.log(`Exibindo o valor do members: ${members}`);
                const pagination = {
                    page,
                    total: Math.ceil(members[0].total / limit),
                }
                
                return res.render('members/index',{members,pagination,filter});
            }
       };

        member.paginate(params);
        
    },
    post(req,res){
        const keys = Object.keys(req.body);

        for( key of keys) {
            if (req.body[key] == "") {
                return res.send('Favor, preencha todos os campos corretamente.');
            }
        }

        member.create(req.body,function(member){
            return res.render(`/members/${member.id}`);
        })
       
    
    },
    update(req,res){
        member.find(req.params.id,function(members){
            if (!members) return res.send("member not found!");
            members.birth_date = date(members.birth_date).iso;
            member.InstructorSelectOptions(function(options){

                    return res.render('members/edit',{members,instructorOptions: options});
        
                })
        })

       

    },
    put(req,res){

        const keys = Object.keys(req.body);

        for( key of keys) {
            if (req.body[key] == "") {
                return res.send('Favor, preencha todos os campos corretamente.');
            }
        }
        
        member.update(req.body,function(member) {
            return res.redirect(`/members/${req.body.id}`);
        })

    },
    show(req,res){
        member.find(req.params.id,function(members){
            if (!members) return res.send("member not found!");

            members.birth_date = date(members.birth_date).format;
            members.grade_school = grade(members.grade_school);
            res.render('members/show', {member:members});

            
            
        })
    },
    delete(req,res){
        member.delete(req.body.id,function(){
            return res.redirect('/members');
        })
    },
}
