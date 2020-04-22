module.exports = {

    //Função que calcula a idade em Anos da pessoa.

     age(timestamp){

            const today =  new Date()
            const birthDay = new Date (timestamp);

            let age = today.getFullYear() - birthDay.getFullYear();
            const month = today.getMonth() - birthDay.getMonth();

            if (month < 0 || month == 0 && today.getDate() <  birthDay.getDate()) {
                return age = age -1;
            }

            return age;

    },

    date(timestamp) {
        const birth = new Date(timestamp);

        const year = birth.getUTCFullYear();
        const month = `0${birth.getUTCMonth() + 1}`.slice(-2);
        const day = `0${birth.getUTCDate()}`.slice(-2);


        return {
            year,
            month,
            day,
            format:`${day}/${month}/${year}`,
            birthDay: `${day}/${month}`,
            iso:`${year}-${month}-${day}`
        }

    },

    classType(class_type) {

        if(class_type == 'ead') return 'À distância'
        else return 'Presencial'
    },

    grade(school_year) {

        if (school_year == '5F')
        return '5º Ano Ensino Fundamental';

        if (school_year == '6F')
        return '6º Ano Ensino Fundamental';

        if (school_year == '7F')
        return '7º Ano Ensino Fundamental';

        if (school_year == '8F')
        return '8º Ano Ensino Fundamental';

        if (school_year == '9F')
        return '9º Ano Ensino Fundamental';

        if (school_year == '1M')
        return '1º Ano Ensino Médio';

        if (school_year == '2M')
        return '2º Ano Ensino Médio';

        if (school_year == '3M')
        return '3º Ano Ensino Médio';
          

    }



}
