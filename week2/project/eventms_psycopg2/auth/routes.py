from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from database.index import get_conn, put_conn

auth_bp = Blueprint('auth', __name__, template_folder='../templates/auth')
login_manager = LoginManager()
login_manager.login_view = 'auth.login'

class User(UserMixin):
    def __init__(self, id, username, email, password_hash):
        self.id = str(id)
        self.username = username
        self.email = email
        self.password_hash = password_hash

@login_manager.user_loader
def load_user(user_id):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, username, email, password_hash FROM users WHERE id=%s", (user_id,))
    row = cur.fetchone()
    cur.close(); put_conn(conn)
    if row:
        return User(*row)
    return None

def ensure_admin_seed():
    # Ensure 'admin' user exists with password 'password'
    conn = get_conn(); cur = conn.cursor()
    cur.execute("SELECT id FROM users WHERE username=%s", ('admin',))
    if not cur.fetchone():
        cur.execute(
            "INSERT INTO users (username, email, password_hash) VALUES (%s,%s,%s)",
            ('admin', 'admin@example.com', generate_password_hash('password'))
        )
        conn.commit()
    cur.close(); put_conn(conn)

@auth_bp.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        conn = get_conn(); cur = conn.cursor()
        cur.execute("SELECT id, username, email, password_hash FROM users WHERE username=%s", (username,))
        row = cur.fetchone()
        cur.close(); put_conn(conn)
        if row and check_password_hash(row[3], password):
            user = User(*row)
            login_user(user)
            flash('Logged in successfully.', 'success')
            return redirect(url_for('events.list_events'))
        flash('Invalid credentials.', 'error')
    return render_template('auth/login.html', title='Login')

@auth_bp.route('/register', methods=['GET','POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        if not username or not email or not password:
            flash('All fields are required.', 'error')
            return render_template('auth/register.html', title='Register')
        conn = get_conn(); cur = conn.cursor()
        try:
            cur.execute(
                "INSERT INTO users (username, email, password_hash) VALUES (%s,%s,%s) RETURNING id",
                (username, email, generate_password_hash(password))
            )
            conn.commit()
            flash('Account created. Please login.', 'success')
            return redirect(url_for('auth.login'))
        except Exception as e:
            conn.rollback()
            flash('Registration failed: ' + str(e), 'error')
        finally:
            cur.close(); put_conn(conn)
    return render_template('auth/register.html', title='Register')

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out.', 'success')
    return redirect(url_for('auth.login'))
