import { ContainerCabecalho } from "./styled"









export  default function Cabecalho() {

  


    return (
       <ContainerCabecalho>
        <div className = "box-user"> 
          <div className ="user-image">  <img src="/assets/images/111.jpg" alt = "" /> <div className="absolute">  3   </div>  </div>
          
          <div className ="user-name"> olá, <b>  Vinicius Otoni da Silva </b> </div>
         </div>
         <div className ="box-image">
             <div className="refresh-button"> <button> <img  src="/assets/images/Vector.svg" alt = "" />  </button> </div>
             <div className="left-button"> <button> <img src="/assets/images/Group_104.svg" alt = "" />  </button> </div>
         </div>
    </ContainerCabecalho>
    
   
    )
}