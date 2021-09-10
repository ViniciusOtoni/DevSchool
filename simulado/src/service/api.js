import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3030'
})

export default class Api {
    
    async listarAlunos () {
        let r = await api.get(`/matricula`)
        return r.data;
    }

    async inserirAluno (nmAluno, nrChamada, nmCurso, nmTurma) {

        let alunoJSON = {
             nm_aluno: nmAluno ,
             nr_chamada: nrChamada ,
            nm_curso: nmCurso ,
            nm_turma: nmTurma 
        }
        
        let r = await api.post(`/matricula`,  alunoJSON )
        return r.data;
    }

    async removerAluno (id) {
        let r = await api.delete(`/matricula/${id}`)
        return r.data;
    }

    async alterarAluno (id, nmAluno, nrChamada, nmCurso, nmTurma ) {

        let alunoJSON = {
        nome: nmAluno,
        numero: nrChamada,
        curso: nmCurso,
        turma: nmTurma 
       }

        let r = await api.put(`/matricula/${id}`, alunoJSON)
        return r.data;
    }

   
}