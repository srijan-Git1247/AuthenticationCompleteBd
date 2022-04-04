import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL, APP_URL } from "../config/index";

//creating context
const AuthContext = createContext();

//Creating the context provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //userstate
  const [error, setError] = useState(null); //errorstate
  useEffect(() => checkUserLoggedIn(), []);
  const router=useRouter();
  //Registration Method

  const register = async (user) => {
    const res = await fetch(`${APP_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    //console.log({ identifier, password });
    const data = await res.json();
   // console.log(data);
    if (res.ok) {
      //coming from api/login
      setUser(data.user);
      router.push("/");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  //login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${APP_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    console.log({ identifier, password });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      //coming from api/login
      setUser(data.user);
      router.push("/");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  //Logout user
  const logout = async () => {
    const res=await fetch(`${APP_URL}/api/logout`,{

        method:"POST"




    });
    if(res.ok)
    {
        setUser(null);
        router.push("/");
    }
  };
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${APP_URL}/api/user`)
    const data = await res.json()

    if (res.ok) {
      setUser(data.user);
      router.push("/account/profile");
    } else {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
