
export default function Account({ user }) {
    if(!user) {
        return <p>You are not logged in.</p>
    }

    return (
        <div className="account-page">
            <h2>Account Details</h2>
            <p><strong>Name: </strong> {user.name}</p>
            <p><strong>Email: </strong> {user.email}</p>
        </div>
    );
}