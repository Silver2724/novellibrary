import { useState } from "react";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleReset = async () => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:8080/api/auth/reset-password", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ email, newPassword }),
            });

            const text = await res.text();
            setMessage(text);
        } catch (err) {
            setMessage("Error resettin password.");
        }
    }

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleReset}>
                <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /> <br />
                <input
                    type="password"
                    placeholder="Enter a new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                /> <br />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}