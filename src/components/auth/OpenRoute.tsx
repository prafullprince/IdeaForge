import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const OpenRoute = ({children}:any) => {
  const { token } = useSelector((state:any)=> state.auth);

  if(token){
    return <Navigate to={'/dashboard/profile'} />
  }
  else{
    return children;
  }
}

export default OpenRoute
