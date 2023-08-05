import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate("/")
    }
    return(
        <>
        <h1>Welcome</h1>
        <button className="logout" onClick={handleClick}>LogOut</button></>
    )
}