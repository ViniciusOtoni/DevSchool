import { useEffect, useState, useRef } from "react"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

import Cabecalho  from "./components/cabecalho"

import  { StyledInput } from "./components/input/styled.js"


import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import Menu from "./components/menu"

import { Conteudo } from "./styled.cop"

import Api from "../service/api"
const api = new Api();

export default function  ConteudoPrinci() {
    
    const [idAlterado, setIdAlterado] = useState(0);
    const [alunos, setAlunos] = useState([]);
    const [nm, setNm] = useState('');
    const [num, setNum] = useState('');
    const [curso, setCurso] = useState('');
    const [turma, setTurma] = useState('');
    

    const loading = useRef(null);
    
    const listar = async () => {
      
        loading.current.continuousStart();

        const  r = await api.listarAlunos()
        setAlunos(r) 

        loading.current.complete();
    }

 
    useEffect(() => {
       
        
        listar()

       
    }, [])

    

    const validarResposta = (resp) => {
       
        
        if (!resp.erro)
            return true;
            toast.error(`${resp.erro}`);
        return false;
    }


    const criarAluno = async () => {
     
        if(num < 0)
        return  toast.error('Não pode  inserir número negativo')

       

        if(nm === '')
        return toast.error("O Campo Nome Precisa ser Preenchido!");
    
        if(num === '')
        return toast.error("O Campo Chamada Precisa ser Preenchido!");
    
        if(curso  === '')
        return toast.error("O Campo Curso Precisa ser Preenchido!");
    
        if(turma  === '')
        return toast.error("O Campo Turma Precisa ser Preenchido!");
     
        if(idAlterado === 0) {
        const r = await api.inserirAluno(nm,num,curso,turma)
        if (!validarResposta(r)) 
        return        
        toast.success('Aluno Inserido Com Sucesso')
     } else {
       const r = await api.alterarAluno(idAlterado, nm, num, curso, turma)
        if (!validarResposta(r)) 
        return
       toast.success('Aluno Alterado Com Sucesso')
    }
        reset()
        listar()
    }

    async function reset() {
        setIdAlterado(0);
        setNm('');
        setNum('');
        setCurso('');
        setTurma('');
    }


   async function alterarAluno(item)  {
        
        setIdAlterado(item.id_matricula);
        setNm(item.nm_aluno);
        setNum(item.nr_chamada);
        setCurso(item.nm_curso);
        setTurma(item.nm_turma);
    }




    const deletarAluno = async(info) => {
        confirmAlert({
            title: 'Deletar Numero',
            message: `Certeza Que Deseja Deletar O Aluno ${info.nm_aluno} ?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        await api.removerAluno(info.id_matricula)
                        toast.success('Aluno Deletado Com Sucesso')

                        listar()
                    }
                },
                {
                label: 'Não',
                }
            ]
        })
    }

    
    

    return  (
    <Conteudo> 
    <ToastContainer />
    <LoadingBar color= "#986cdf" ref={loading} />
    <Menu />
      <div className="right-box"> 
      <Cabecalho />
       
        <div className="botton-bar-right-reader"> </div>
      
        <div className="body-right-box">
            <div className="new-student-box">
                <div className="text-new-student">
                    <div className="bar-new-student"></div>
                    <div className="text-new-student">{ idAlterado > 0 ? `Alterar Aluno${idAlterado}`  : `Novo Aluno` }</div>
                </div>
                <div className="input-new-student"> 
                    <div className="input-left">
                       <div className="agp-input"> 
                        
                        <div className="name-student"> Nome: </div>  
                        <StyledInput value={nm} onChange={e => setNm(e.target.value)} />  
                    </div> 
                    <div className="agp-input">
                        <div className="number-student"> Chamada: </div>  
                        <StyledInput value={num} onChange={e => setNum(e.target.value)} placeholder={'Apenas Números'} /> 

                       </div>
                    </div>
                    <div className="input-right">
                     <div className="agp-input">
                        <div className="corse-student"> Curso: </div>  
                        <StyledInput value={curso} onChange={ e => setCurso(e.target.value)}/> 
                        </div>
                     <div className="agp-input">
                        <div className="class-student"> Turma: </div>  
                        <StyledInput value={turma} onChange={e => setTurma(e.target.value)}/> 
                        </div>
                    </div>
                    <div className="button-create"> <button onClick={criarAluno}> { idAlterado > 0 ? "Alterar" : "Cadastrar" } </button> </div>
                </div>
            </div>

            <div className="student-registered-box">
               <div className="row-bar"> 
                <div className= "bar-new-student"> </div>
                <div className="text-registered-student"> Alunos Matriculados </div>
               </div>
            
                <table className ="table-user">
                    
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> Nome </th>
                            <th> Chamada </th>
                            <th> Turma </th>
                            <th> Curso </th>
                            <th className="a"> </th>
                            <th className="a"> </th>
                             
                        </tr>
                    </thead>
            

            
                  
                      
                        <tbody>

                        {alunos.map((x, i) => 

                            <tr className={i % 2 === 0 ? "int" : ""}>
                                <td> {x.id_matricula} </td>
                                <td title={x.nm_aluno}> 
                                {x.nm_aluno != null && x.nm_aluno.length >= 20 
                                ? x.nm_aluno.substr(0,20) + "..." 
                                : x.nm_aluno} 
                                </td>
                                <td> {x.nr_chamada} </td>
                                <td> {x.nm_curso} </td>
                                <td> {x.nm_turma} </td>
                                    <td> <button onClick={ () => alterarAluno(x) }> <img   src="/assets/images/editiButton.svg" alt="" /> </button> </td>
                                <td> <button onClick={ () => deletarAluno(x) }> <img  src="/assets/images/Group106.svg" alt="" /> </button> </td>
                            </tr>

                           
                            )}

                    
                           
                        </tbody> 
                        
                        
        </table>
                    
        </div>
                    
        </div>
                    
    </div>
    </Conteudo>
)}

