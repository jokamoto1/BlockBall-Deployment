import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

const Login = (props) => {
    const history = useHistory()
    const {setUserName} = props
    const {setAccessCode} = props
    const {userName} = props
    const {accesscode} = props
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(accesscode.length === 0){
            history.push('/')
            alert("Must give room code!")
        }else{

            history.push(`/game/${accesscode}`)
        }
    }


    return (
        <div className="bg-dark p-3 pb-2 d-flex flex-column w-25 m-auto mt-4 rounded">
            <h1 className="text-center align-middle"><span className="text-warning">Block</span><span
                className="text-danger">Ball</span><span className="text-info">.js</span></h1>
            <div className="text-center align-middle m-auto">
                <form onSubmit={handleSubmit}>
                    {/* <div className="form-group text-warning">
                        <label className="display-5">Username:</label>
                        <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)}></input>

                    </div> */}
                    <div className="form-group text-danger ">
                        <label className="display-5">Room Code:</label>
                        <input type="text" className="form-control" onChange={(e) => setAccessCode(e.target.value)}></input>
                    </div>

                    <button type="submit" className="mt-3 btn btn-success">Enter Game!</button>
                </form>
                <div className="text-warning mt-3">
                    <p>Created by: Jeremy Okamoto</p>
                    <p>Github: <a href="https://github.com/jokamoto1">Link</a> </p>
                </div>
            </div>
        </div>
    )
}
export default Login
