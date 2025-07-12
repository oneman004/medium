


import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios  from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { SignupInput } from "../types/types";


export const Auth = ({type}: {type: "signup" | "signin"}) => {
    

    const [userInputs, setUserInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",

    })
    const navigate = useNavigate();

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup" }`, userInputs);
            const jwt = response.data.token;
            console.log(jwt);
            localStorage.setItem("token", jwt);
            navigate("/blogs"); 
        }
        catch(e){
            alert("error while signing in");
        }
    }
    return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div >
                <div className="px-10">
                    <div className="text-3xl text-center font-bold">
                        {type === "signin" ? "Login" : "Create an account"}
                    </div>
                    <div className="text-slate-400 mb-4 text-center">
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"}  
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type=== "signin"? "Sign Up" : "Login"}</Link>
                    </div>
                    </div>
                <div className="pt-2">
                    {type === "signup" ? <LabelledInput label="Name" type="text" placeholder="name" onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                name: e.target.value
                            })
                    }}/> : null} 
                    <LabelledInput label="email" type="text" placeholder="Enter your email" onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                email: e.target.value
                            })
                    }}/>
                    <LabelledInput label="Password" type="password" placeholder="m@example.com" onChange={(e) => {
                            setUserInputs({
                                ...userInputs,
                                password: e.target.value
                            })
                    }}/>
                </div>
                
                <button onClick={sendRequest} className="mt-6 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white            transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    {type === "signup" ? "Sign Up" : "Sign In"}
                </button>
                
            </div>
        </div>
        
    </div>
}

interface labelledInputstypes{
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}


function LabelledInput({label,placeholder, onChange,type}: labelledInputstypes){
    return <div className="my-4">
                <label className="block mb-1 text-sm font-bold text-slate-800">
                    {label}
                </label>
                <input onChange={onChange}
                    type={type}
                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    placeholder={placeholder} />
    </div>
}


