from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required
from database.index import get_conn, put_conn
from helpers import paginate_params

events_bp = Blueprint('events', __name__, template_folder='../templates/events')

@events_bp.route('/')
def list_events():
    q = request.args.get('q', '').strip()
    page, per_page, offset = paginate_params(request, per_page=6)
    conn = get_conn(); cur = conn.cursor()

    where = ""
    params = []
    if q:
        where = "WHERE LOWER(name) LIKE %s"
        params.append('%' + q.lower() + '%')

    count_sql = f"SELECT COUNT(*) FROM events {where}"
    cur.execute(count_sql, params)
    total = cur.fetchone()[0]

    sql = f"""
        SELECT e.id, e.name, e.date, e.location, o.name AS organizer_name
        FROM events e
        JOIN organizers o ON e.organizer_id=o.id
        {where}
        ORDER BY e.date ASC
        LIMIT %s OFFSET %s
    """
    cur.execute(sql, params + [per_page, offset])
    rows = cur.fetchall()
    cur.close(); put_conn(conn)

    return render_template('events/index.html', events=rows, q=q, page=page, per_page=per_page, total=total, title='Events')

@events_bp.route('/create', methods=['GET','POST'])
@login_required
def create_event():
    if request.method == 'POST':
        name = request.form.get('name'); date = request.form.get('date')
        location = request.form.get('location'); description = request.form.get('description')
        organizer_id = request.form.get('organizer_id')
        if not (name and date and location and organizer_id):
            flash('Name, date, location and organizer are required.', 'error')
            return redirect(url_for('events.create_event'))
        conn = get_conn(); cur = conn.cursor()
        try:
            cur.execute(
                "INSERT INTO events (name, date, location, description, organizer_id) VALUES (%s,%s,%s,%s,%s)",
                (name, date, location, description, organizer_id)
            )
            conn.commit(); flash('Event created.', 'success')
            return redirect(url_for('events.list_events'))
        except Exception as e:
            conn.rollback(); flash('Create failed: '+str(e), 'error')
        finally:
            cur.close(); put_conn(conn)
    # load organizers for select
    conn = get_conn(); cur = conn.cursor()
    cur.execute("SELECT id, name FROM organizers ORDER BY name")
    organizers = cur.fetchall(); cur.close(); put_conn(conn)
    return render_template('events/create.html', organizers=organizers, title='Create Event')

@events_bp.route('/<int:event_id>')
def details(event_id):
    conn = get_conn(); cur = conn.cursor()
    cur.execute("""
        SELECT e.id, e.name, e.date, e.location, e.description, o.name
        FROM events e JOIN organizers o ON e.organizer_id=o.id
        WHERE e.id=%s
    """, (event_id,))
    event = cur.fetchone()
    cur.execute("""
        SELECT a.id, a.name, a.email, t.created_at
        FROM tickets t
        JOIN attendees a ON a.id=t.attendee_id
        WHERE t.event_id=%s
        ORDER BY t.created_at DESC
    """, (event_id,))
    attendees = cur.fetchall()
    cur.close(); put_conn(conn)
    if not event:
        flash('Event not found.', 'error')
        return redirect(url_for('events.list_events'))
    return render_template('events/details.html', event=event, attendees=attendees, title='Event Details')

@events_bp.route('/<int:event_id>/edit', methods=['GET','POST'])
@login_required
def edit_event(event_id):
    conn = get_conn(); cur = conn.cursor()
    if request.method == 'POST':
        name = request.form.get('name'); date = request.form.get('date')
        location = request.form.get('location'); description = request.form.get('description')
        organizer_id = request.form.get('organizer_id')
        try:
            cur.execute(
                "UPDATE events SET name=%s, date=%s, location=%s, description=%s, organizer_id=%s WHERE id=%s",
                (name, date, location, description, organizer_id, event_id)
            )
            conn.commit(); flash('Event updated.', 'success')
            return redirect(url_for('events.details', event_id=event_id))
        except Exception as e:
            conn.rollback(); flash('Update failed: '+str(e), 'error')
        finally:
            cur.close(); put_conn(conn)
    else:
        cur.execute("SELECT id, name, date, location, description, organizer_id FROM events WHERE id=%s", (event_id,))
        event = cur.fetchone()
        cur.execute("SELECT id, name FROM organizers ORDER BY name")
        organizers = cur.fetchall(); cur.close(); put_conn(conn)
        if not event:
            flash('Event not found.', 'error')
            return redirect(url_for('events.list_events'))
        return render_template('events/edit.html', event=event, organizers=organizers, title='Edit Event')

@events_bp.route('/<int:event_id>/delete', methods=['POST'])
@login_required
def delete_event(event_id):
    conn = get_conn(); cur = conn.cursor()
    try:
        cur.execute("DELETE FROM events WHERE id=%s", (event_id,))
        conn.commit(); flash('Event deleted.', 'success')
    except Exception as e:
        conn.rollback(); flash('Delete failed: '+str(e), 'error')
    finally:
        cur.close(); put_conn(conn)
    return redirect(url_for('events.list_events'))
