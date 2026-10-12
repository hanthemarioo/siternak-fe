export const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login gagal');
    }

    const data = await res.json();

    // Token is now set as HttpOnly cookie by the server — not accessible via JavaScript
    localStorage.setItem('user', JSON.stringify(data.user));
};

export const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, password_confirmation }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registrasi gagal');
    }

    const data = await res.json();
    localStorage.setItem('user', JSON.stringify(data.user));
};

export const logout = async () => {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Gagal Logout');
    }

    localStorage.removeItem('user');
};

