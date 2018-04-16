import ibm_db

connStr = "DATABASE=ANDWDB;HOSTNAME=154.84.100.115;PORT=60000;PROTOCOL=TCPIP;UID=andw;PWD=andw"
conn = None

try:
    conn = ibm_db.connect(connStr, "", "")
    sql = "SELECT name FROM sysibm.systables"
    stmt = ibm_db.exec_immediate(conn, sql)
    r = ibm_db.fetch_both(stmt)
    while (r):
        print(r)
        r = ibm_db.fetch_both(stmt)
except Exception as e:
    print(e)
finally:
    ibm_db.close(conn)