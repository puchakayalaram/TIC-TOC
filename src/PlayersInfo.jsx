import {useState} from "react";

export default function PlayersInfo({initialname,symbol,isActive,onName}){

    const [name,setName]=useState(initialname)
    const [isEdit,setIsEdit]=useState(false)

    function handleEdit(){
        setIsEdit((editing)=>!editing)
        if(isEdit){
          onName(symbol,name);
        }
    }

    function handleName(event){
      setName(event.target.value)
    }

    return(
        <li className={isActive ? 'active':undefined}>
          <span className="player">
            {!isEdit ?<span className="player-name">{name}</span> : <input type="text" value={name} onChange={handleName} required></input>}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEdit}>{isEdit ? "Save" :"Edit"}</button>
        </li>
    )
}