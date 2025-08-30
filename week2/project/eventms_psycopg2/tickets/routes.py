from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required
from database.index import get_conn, put_conn

tickets_bp = Blueprint('tickets', __name__, template_folder='../templates/tickets')

@tickets_bp.route('/register', methods=['GET','POST'])
@login_required
def register_ticket():
    conn = get_conn(); cur = conn.cursor()
    if request.method == 'POST':
        event_id = request.form.get('event_id'); attendee_id = request.form.get('attendee_id')
        try:
            cur.execute("INSERT INTO tickets (event_id, attendee_id) VALUES (%s,%s)", (event_id, attendee_id))
            conn.commit(); flash('Registration added.', 'success')
            return redirect(url_for('events.details', event_id=event_id))
        except Exception as e:
            conn.rollback(); flash('Registration failed: '+str(e), 'error')
        finally:
            cur.close(); put_conn(conn)
    # GET: show simple form
    cur = get_conn().cursor()
    conn2 = get_conn()
    cur1 = conn.cursor(); cur2 = conn2.cursor()
    cur1.execute("SELECT id, name FROM events ORDER BY date ASC")
    events = cur1.fetchall()
    cur2.execute("SELECT id, name FROM attendees ORDER BY name ASC")
    attendees = cur2.fetchall()
    cur1.close(); put_conn(conn)
    cur2.close(); put_conn(conn2)
    return render_template('tickets/create.html', events=events, attendees=attendees, title='Register Ticket')

@tickets_bp.route('/<int:ticket_id>/delete', methods=['POST'])
@login_required
def delete_ticket(ticket_id):
    conn = get_conn(); cur = conn.cursor()
    # need event_id to redirect back
    cur.execute("SELECT event_id FROM tickets WHERE id=%s", (ticket_id,))
    row = cur.fetchone()
    if not row:
        flash('Ticket not found.', 'error')
        cur.close(); put_conn(conn)
        return redirect(url_for('events.list_events'))
    event_id = row[0]
    try:
        cur.execute("DELETE FROM tickets WHERE id=%s", (ticket_id,))
        conn.commit(); flash('Registration removed.', 'success')
    except Exception as e:
        conn.rollback(); flash('Delete failed: '+str(e), 'error')
    finally:
        cur.close(); put_conn(conn)
    return redirect(url_for('events.details', event_id=event_id))
