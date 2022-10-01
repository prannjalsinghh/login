import {useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios'
export default function Dashboard(){
    const navigate = useNavigate()
    const location = useLocation();
    const LogoutHandler =async ()=>{
        const obj = {email: location.state.id.email}
        const res = await axios.post('http://localhost:5000/logout',obj)
        navigate('/')
    }
    return(
        <>
            <p>Welcome {location.state.id?.name}!</p>
            <p>{location.state.id?.email}</p>
            <button onClick={LogoutHandler}>Logout</button>
        </>
    )
} 