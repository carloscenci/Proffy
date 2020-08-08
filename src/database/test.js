const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    //Inserir Dados

    proffyValue = {
        name: "Carlos Cenci",
        avatar: "https://scontent.fjdo1-1.fna.fbcdn.net/v/t1.0-9/91206978_611017632960584_5007228222643896320_n.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_eui2=AeFq5UMvWOw7xRNCr5QAa6GGMWtZHPhabOoxa1kc-Fps6sU5QvsvJKZi8eKWEFugEZvf3WJwN8lNX5SbOc1CYtWo&_nc_ohc=ZkzKs85gq2EAX8XPS31&_nc_ht=scontent.fjdo1-1.fna&oh=b4b23878a25f349d9174cf7ca54dc7cd&oe=5F527743",
        whatsapp: "84994989429",
        bio: "Entusiasta das melhores tecnologias de artes avançada.<br><br>Apaixonado por desenhar personagens de mangá e por mudar a vida das pessoas através de experiências e ensinamentos. Mais de 200.000 pessoas já passaram por um dos meus conselhos.",  
    }

    classValue = {
        subject: "1",
        cost: "20" ,
        // O proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados após cadastramos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220, 
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1400, 
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //Consultar os dados inseridos

    //Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    //Consultar as classes de um determinado professor
    //E trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    // O horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // O horário do time_from (8h) precisa ser antes ou igual ao horário solicitado
    // O time_to precisa ser acima 

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "1300"
    `)

    //console.log(selectClassesSchedules)
})