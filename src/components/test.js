'use client'
import {useState, useEffect, useRef} from 'react'
import TestUser from './testUser'
export default function Test() {

    const someRef = useRef()
    const [users, setUsers] = useState([{
        name: "Askar",
        id: 1
    },{
        name: "Aruzhan",
        id: 2
    },{
        name: "Igor",
        id: 3
    }])

    const deleteUser = (id) => {
        for(let i = 0; i < users.length; i++) {
            if(users[i].id === id) {
                let temp = [...users]
                temp.splice(i, 1)
                return setUsers(temp)
            }
        }
    }

    const test = {}

    useEffect(() => {
        console.log("didMount - срабатывает один раз после первого рендера")

        return () => {
            console.log("componentWillUnMount - срабатывает перед закрытием компонента")
        }
    }, [])

    useEffect(() => {
        console.log("useEffect когда меняется Users")
        console.log(someRef)
    }, [users])

    console.log("Render")
    console.log(someRef)
    return (<div ref={someRef}>
        {users.map(item => (<TestUser key={item.id} user={item} deleteUser={deleteUser}/>))}
    </div>)
}