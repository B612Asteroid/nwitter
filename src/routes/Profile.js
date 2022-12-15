import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({ loginedUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(loginedUser.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (loginedUser.displayName !== newDisplayName) {
            await loginedUser.updateProfile({
                displayName: newDisplayName,
            });
        }
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};