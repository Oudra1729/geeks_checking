import os
import psycopg2
from psycopg2 import pool
from urllib.parse import urlparse
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://neondb_owner:npg_ZTUNa4k1QbEn@ep-icy-fog-adkvryxg-pooler.c-2.us-east-1.aws.neon.tech/eventms?sslmode=require&channel_binding=require")

_conn_pool = None

def init_db_pool(minconn=1, maxconn=10):
    global _conn_pool
    if _conn_pool is None:
        _conn_pool = pool.SimpleConnectionPool(minconn, maxconn, dsn=DATABASE_URL)
    return _conn_pool

def get_conn():
    if _conn_pool is None:
        init_db_pool()
    return _conn_pool.getconn()

def put_conn(conn):
    if _conn_pool:
        _conn_pool.putconn(conn)
