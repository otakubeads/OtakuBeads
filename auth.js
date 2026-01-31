const AUTH = {
    open() {
        document.getElementById('auth-sheet').classList.add('open');
        this.render();
    },
    render() {
        const root = document.getElementById('auth-root');
        const user = JSON.parse(localStorage.getItem('ob_user'));
        const lock = localStorage.getItem('ob_lock');
        if (user && lock !== 'true') {
            root.innerHTML = `<h2>Account</h2><p>${user.email}</p><button class="pill-btn" style="color:#F2B8B5; border-color:#603F3F;" onclick="AUTH.signOut()">SIGN OUT</button>`;
        } else {
            root.innerHTML = `<h2>Sign In</h2><div id="g_btn" style="display:flex; justify-content:center; margin:20px 0;"></div>`;
            this.initGoogle();
        }
    },
    initGoogle() {
        if (typeof google === 'undefined') return;
        google.accounts.id.initialize({
            client_id: "919544111369-2hhnhfnsc0hvrgnq1dn8fjc8ca3im7jv.apps.googleusercontent.com",
            callback: (r) => this.handleCallback(r)
        });
        google.accounts.id.renderButton(document.getElementById("g_btn"), { theme: "filled_black", shape: "pill" });
    },
    handleCallback(resp) {
        const u = JSON.parse(atob(resp.credential.split('.')[1]));
        localStorage.setItem('ob_user', JSON.stringify({name: u.given_name, email: u.email, picture: u.picture}));
        localStorage.removeItem('ob_lock');
        location.reload();
    },
    signOut() {
        localStorage.setItem('ob_lock', 'true');
        localStorage.removeItem('ob_user');
        location.reload();
    }
};
