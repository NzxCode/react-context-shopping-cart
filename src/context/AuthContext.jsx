import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return new Promise((resolve, reject) => {
            try {
                const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
                const isDuplicate = existingUsers.some(user => user.email === email);
                
                if (isDuplicate) {
                    throw new Error("Email sudah terdaftar!");
                }

                const newUser = {
                    id: Date.now().toString(),
                    email: email,
                    password: password,
                    role: "user"
                };

                const updatedUsers = [...existingUsers, newUser];
                localStorage.setItem("users", JSON.stringify(updatedUsers));

                resolve(newUser);
            } catch (error) {
                reject(error);
            }
        });
    }

    function login(email, password) {
        return new Promise((resolve, reject) => {
            try {
                const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
                const user = existingUsers.find(
                    u => u.email === email && u.password === password
                );

                if (user) {
                    localStorage.setItem("activeUser", JSON.stringify(user));
                    setCurrentUser(user);
                    resolve(user);
                } else {
                    throw new Error("Email atau Password salah!");
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    function logout() {
        localStorage.removeItem("activeUser");
        setCurrentUser(null);
        return Promise.resolve();
    }

    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem("activeUser");
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}