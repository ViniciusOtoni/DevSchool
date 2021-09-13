import db from './db.js';
import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json())

app.get('/matricula', async (req, resp) => {
    try {
        let r = await db.tb_matricula.findAll()
        resp.send(r)
    } catch (error) {
        resp.send({ erro: error })
    }
})


app.post('/matricula', async (req, resp) => {
try {
    
    let r = req.body;
    let e = await db.tb_matricula.findOne({ where: { nm_turma: r.nm_turma, nr_chamada: r.nr_chamada } })
 if(e != null)
 resp.send({ erro: "Não Pode Inserir Aluno Com a Mesma Chamada Em uma Mesma Turma!"})
  

    let s = await db.tb_matricula.create({
        nm_aluno: r.nm_aluno,
        nr_chamada: r.nr_chamada,
        nm_curso: r.nm_curso,
        nm_turma: r.nm_turma
    })
    resp.send(s);
} catch (error) {
    resp.send({ erro: "Digite Um Número no Campo Chamada" })
}
})

app.put('/matricula/:id', async (req, resp) => {
    try {
        
        
        let ob = req.body;


     


        let r = await db.tb_matricula.update({ nm_aluno: ob.nome, 
            nr_chamada: ob.numero, 
            nm_curso: ob.curso, 
            nm_turma: ob.turma },
        {
            where: { id_matricula: req.params.id }
        });
        resp.sendStatus(200)
    } catch (error) {
        resp.send( { erro: "Não foi Possível Concluir essa alteração!, Verifique Se os Campos então corretos!" })
    }
});

app.delete('/matricula/:id', async (req, resp) => {
try {
    let r = await db.tb_matricula.destroy({ where: { id_matricula: req.params.id } })
    resp.sendStatus(200)
} catch (error) {
    resp.send( { erro: error.toString() })
}
})



app.listen(process.env.PORT,
           x => console.log(`Servidor Subiu na Porta ${process.env.PORT} '-' `))