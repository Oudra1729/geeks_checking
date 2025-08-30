from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required
from database.index import get_conn, put_conn
from helpers import paginate_params

organizers_bp = Blueprint('organizers', __name__, template_folder='../templates/organizers')

@organizers_bp.route('/')
def list_organizers():
    page, per_page, offset = paginate_params(request, per_page=6)
    conn = get_conn(); cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM organizers")
    total = cur.fetchone()[0]
    cur.execute("""
        SELECT id, name, contact_info
        FROM organizers
        ORDER BY name ASC
        LIMIT %s OFFSET %s
    """, (per_page, offset))
    rows = cur.fetchall(); cur.close(); put_conn(conn)
    return render_template('organizers/index.html', organizers=rows, page=page, per_page=per_page, total=total, title='Organizers')

@organizers_bp.route('/create', methods=['GET','POST'])
@login_required
def create_organizer():
    if request.method == 'POST':
        name = request.form.get('name'); contact_info = request.form.get('contact_info')
        if not name:
            flash('Name is required.', 'error')
            return redirect(url_for('organizers.create_organizer'))
        conn = get_conn(); cur = conn.cursor()
        try:
            cur.execute("INSERT INTO organizers (name, contact_info) VALUES (%s,%s)", (name, contact_info))
            conn.commit(); flash('Organizer created.', 'success')
            return redirect(url_for('organizers.list_organizers'))
        except Exception as e:
            conn.rollback(); flash('Create failed: '+str(e), 'error')
        finally:
            cur.close(); put_conn(conn)
    return render_template('organizers/create.html', title='Create Organizer')

@organizers_bp.route('/<int:org_id>/edit', methods=['GET','POST'])
@login_required
def edit_organizer(org_id):
    conn = get_conn(); cur = conn.cursor()
    if request.method == 'POST':
        name = request.form.get('name'); contact_info = request.form.get('contact_info')
        try:
            cur.execute("UPDATE organizers SET name=%s, contact_info=%s WHERE id=%s", (name, contact_info, org_id))
            conn.commit(); flash('Organizer updated.', 'success')
            return redirect(url_for('organizers.list_organizers'))
        except Exception as e:
            conn.rollback(); flash('Update failed: '+str(e), 'error')
        finally:
            cur.close(); put_conn(conn)
    else:
        cur.execute("SELECT id, name, contact_info FROM organizers WHERE id=%s", (org_id,))
        org = cur.fetchone(); cur.close(); put_conn(conn)
        if not org:
            flash('Organizer not found.', 'error')
            return redirect(url_for('organizers.list_organizers'))
        return render_template('organizers/edit.html', organizer=org, title='Edit Organizer')

@organizers_bp.route('/<int:org_id>/delete', methods=['POST'])
@login_required
def delete_organizer(org_id):
    conn = get_conn(); cur = conn.cursor()
    try:
        cur.execute("DELETE FROM organizers WHERE id=%s", (org_id,))
        conn.commit(); flash('Organizer deleted.', 'success')
    except Exception as e:
        conn.rollback(); flash('Delete failed: '+str(e), 'error')
    finally:
        cur.close(); put_conn(conn)
    return redirect(url_for('organizers.list_organizers'))
