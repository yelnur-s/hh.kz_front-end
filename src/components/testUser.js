
export default function TestUser({user, deleteUser}) {
    return (
        <div>{user.name} <button onClick={()=>deleteUser(user.id)}>Удалить</button></div>
    )
}