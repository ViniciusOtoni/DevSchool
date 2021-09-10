import { StyledMenu } from "./styled"


export default function Menu() {
    return (
       <StyledMenu> 
        <header className="header-left-box">
            <div className="svg-cabecalho-left-box"> <img src="/assets/images/Group107.svg" /> </div>
            <div className="devSchool"> <span>Dev</span> School</div>
        </header>
        <div className="black-box"></div>
        <div className="left-box-management">
            <div> Gerenciamento </div>
            <img src="/assets/images/SetaBaixo.svg" />
        </div>
        <div className="left-box-aluno">
            <div> Alunos </div>
        </div> 
    </StyledMenu>
)}

