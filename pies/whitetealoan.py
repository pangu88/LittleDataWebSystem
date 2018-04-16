# -*- coding: utf-8 -*-

import sys
import ibm_db
import traceback
import pymysql

print('两山白茶贷 取数中..')

if len(sys.argv) < 6:
    print("参数少于6：whitetealoan.py [sid] [date] [start_dt] [end_dt] [cust_isn ..]")
    exit(1)

sid = sys.argv[1]
date = sys.argv[2]
start_dt = sys.argv[3]
end_dt = sys.argv[4]
# s = "('101330327198602147245','101330523196506282515','101330523199803096827')"
s = "("
for i in range(5, len(sys.argv)):
    if i > 5:
        s += ","
    s += "'" + sys.argv[i] + "'"
s += ")"
resList = []

flag = True # DB2取数成功标识

connStr = "DATABASE=ANDWDB;HOSTNAME=154.84.100.115;PORT=60000;PROTOCOL=TCPIP;UID=andw;PWD=andw"
conn = None

try:
    conn = ibm_db.connect(connStr, "", "")
    sql = """
SELECT 
--	a.CINOCSNO, -- 客户内码
	trim(a.CUNAFLNM) KHXM, -- 客户姓名
	SUBSTR(a.CUIDCSID,4,18) SFZHM, -- 身份证号码
	b.YEAR_INCOME YEAR_INCOME, -- 家庭年收入
	c.FMY_LY_EXP YEAR_OUTLAY, -- 家庭年支出
	b.FMY_PPL FMY_PRESON_NUM, -- 家庭人数
	f.TTL_AST FMY_TOT_ZC, -- 家庭总资产
	f.TTL_LBTS FMY_TOT_FZ, -- 家庭总负债
	i.YEAR_DAILY_CK YEAR_DAILY_CK, -- 年日均存款
	h.AMT YEAR_AMT, -- 年账户交易额度
	dec(dec(h.CNT,17,4)/dec(12,17,4),17,4) MONTH_FREQ, -- 月账户交易频率
	g.CPGLD CPGLD, -- 产品关联度
	d.OVERDUE_COUNT OVERDUE_COUNT, -- 贷款逾期笔数
	d.CARD_OVERDUE CARD_OVERDUE, -- 信用卡逾期月数
	d.BAST_CREDIT_RECORD FXYQ_CNT, -- 付息逾期次数
	(CASE WHEN b.MRG='10' THEN '未婚'
		WHEN b.MRG='20' THEN '已婚'
		WHEN b.MRG='30' THEN '丧偶'
		WHEN b.MRG='40' THEN '离婚'
		WHEN b.MRG='90' THEN '未说明婚姻状况'
		ELSE b.MRG END) MARRY_STAT, -- 婚姻状况
	(CASE WHEN c.IS_OTH_DEBT_DIS='0' THEN '无'
		WHEN c.IS_OTH_DEBT_DIS='1' THEN '有'
		ELSE '' END) IS_OTH_DEBT_DIS, -- 信誉不良
	(CASE WHEN c.IS_BAST_HABIT='1' THEN '有'
		ELSE '无' END) IS_BAST_HABIT, -- 涉毒
	(CASE WHEN c.NEIGHBORHOOD_INFO='1' THEN '和睦'
		WHEN c.NEIGHBORHOOD_INFO='2' THEN '一般'
		WHEN c.NEIGHBORHOOD_INFO='3' THEN '不和睦'
		ELSE '和睦' end) FMY_RELATION, -- 家庭关系
	(CASE WHEN c.NEIGHBORHOOD_INFO='1' THEN '和睦'
		WHEN c.NEIGHBORHOOD_INFO='2' THEN '一般'
		WHEN c.NEIGHBORHOOD_INFO='3' THEN '不和睦'
		WHEN c.NEIGHBORHOOD_INFO='4' THEN '不和睦'
		ELSE '和睦' end) NEIGHBOR_RELATION, -- 邻里关系
	(CASE WHEN e.CONCERN_LEVEL='1' THEN '积极'
		WHEN e.CONCERN_LEVEL='2' THEN '配合'
		WHEN e.CONCERN_LEVEL='3' THEN '一般'
		WHEN e.CONCERN_LEVEL='4' THEN '不配合'
		ELSE '一般' END) CONCERN_LEVEL, -- 村级公益
	(CASE WHEN c.IS_LAW_ABIDING='1' THEN '有'
		ELSE '无' END) IS_LAW_ABIDING -- 涉诉
FROM 
(
	SELECT 
		CINOCSNO, -- 客户内码
		CUIDCSID, -- 客户号
		CUNAFLNM  -- 客户名称
	FROM NDS_KER_BCFMCMBI -- 客户基本信息
	WHERE CUIDCSID IN %s
) a 
LEFT JOIN
(
	SELECT DISTINCT 
		YEAR_INCOME, -- 年收入
		FMY_PPL, -- 家庭人数
		MRG, -- 婚姻状况
		CUST_ISN -- 客户内码
	FROM NDS_XDZX_IND_CUST_EXPD_ECIF -- 对私客户拓展信息表
) b 
ON a.CINOCSNO=b.CUST_ISN
LEFT JOIN
(
	SELECT DISTINCT 
		FMY_LY_EXP, -- 家庭年开支总额
		YE_AV_DEP_BALA, -- 年日均存款余额
		IS_OTH_DEBT_DIS, -- 有无其他债务纠纷
		IS_BAST_HABIT, -- 有无涉黄、赌、毒等不良习惯 1:有 0:无
		NEIGHBORHOOD_INFO, -- 家庭及邻里关系
		IS_LAW_ABIDING, -- 有无重大涉诉、被法院执行等情况 1:有 0:无
		CUST_ISN, -- 客户内码
		REMARK -- 备注
	FROM NDS_XDZX_IN_FI_CUST_INFO
) c 
ON a.CINOCSNO=c.CUST_ISN
LEFT JOIN
(
	SELECT OVERDUE_COUNT,CARD_OVERDUE,BAST_CREDIT_RECORD,CUST_ISN FROM
	(
		SELECT DISTINCT 
			OVERDUE_COUNT, -- 贷款逾期笔数/已结清不良贸易融资笔
			CARD_OVERDUE, -- 贷记卡最长逾期
			BAST_CREDIT_RECORD, -- 不良信用记录次数
			CUST_ISN, -- 客户内码
			ROW_NUMBER() OVER(PARTITION by CUST_ISN ORDER BY REPORT_DATE DESC) ROWNUM 
		FROM NDS_XDZX_CUST_CREDIT_CHECKS -- 征信结果纳入信贷流程
	) t 
	WHERE t.ROWNUM=1
) d 
ON a.CINOCSNO=d.CUST_ISN
LEFT JOIN
(
	SELECT DISTINCT CONCERN_LEVEL, -- 对公益事业关心程度
		CUST_ISN -- 客户内码
	FROM NDS_XDZX_IND_FMY_EVAL_INFO -- 对私客户家庭评价信息
) e 
ON a.CINOCSNO=e.CUST_ISN
LEFT JOIN
(
	SELECT
		CUST_ISN,TTL_AST,TTL_LBTS
	FROM 
	(
		select  
			CUST_ISN, -- 客户内码
			TTL_AST, -- 资产合计
			TTL_LBTS, -- 负债合计
			ROW_NUMBER() OVER(PARTITION BY CUST_ISN ORDER BY LAST_TM DESC,INVT_DT desc) ROWNUM  
		FROM NDS_XDZX_IND_FMY_AL_INFO
	)
) f 
ON a.CINOCSNO=f.CUST_ISN
LEFT JOIN
(
	SELECT 
		a2, -- 客户内码
		count(1) CPGLD -- 产品关联度
	FROM
	(
		SELECT * FROM chanpin 
		WHERE a4 IN ('ETC','手机银行产品','网上银行产品','支付宝卡通','理财产品','贵金属业务','贷记卡产品','电费','烟草','社保卡')
	)
	chan 
	GROUP BY a2
) g 
ON a.CUIDCSID=g.a2
LEFT JOIN 
(
	SELECT 
		CUST_ISN,
		SUM(AMT) AMT,
		SUM(CNT) CNT
	FROM
	(
		select 
			hqa.aa03csno CUST_ISN,
			hqac.AMT,
			hqac.CNT
		FROM
		(
			SELECT aa01ac15,aa03csno from NDS_KER_BDFMHQAA hqaa where hqaa.aa10cstp='1'
		) hqa 
		JOIN 
		(
			select ac01ac15 CUST_ISN,
				sum(ac10amt) AMT,
				count(1) CNT
			from NDS_KER_BDFMHQAC
			where ac02date>='%s'  and  ac02date <'%s'    and rcstrs1b<>'9'--注意
			group by ac01ac15
		) hqac
		on hqa.aa01ac15=hqac.CUST_ISN
	)
	GROUP BY CUST_ISN
) h 
ON a.CINOCSNO=h.CUST_ISN
LEFT JOIN 
(
	select cs_no,sum(day_avg_bal) YEAR_DAILY_CK
	from dw_dep_acct_detail_history
	where cust_type='对私客户' 
	and data_dt='%s'
	and cyc='CNY' --注意
	and (ed_date='18991231' or ed_date>='20160101')
	group by cs_no
) i 
ON a.CINOCSNO=i.cs_no

""" % (s, start_dt, end_dt, date)
    # print("sql is\r\n" + sql)
    stmt = ibm_db.exec_immediate(conn, sql)
    r = ibm_db.fetch_both(stmt)
    # print("first r = ")
    # print(r)
    while (r):
        # print(r)
        KHXM = r["KHXM"] if r["KHXM"] != None else ""   # 1.2 客户姓名
        SFZHM = r["SFZHM"]                              # 1.3 身份证号码
        YEAR_INCOME = r["YEAR_INCOME"] if r["YEAR_INCOME"] != None else "0.00"  # 2.1 家庭年收入
        YEAR_OUTLAY = r["YEAR_OUTLAY"] if r["YEAR_OUTLAY"] != None else "0.00"  # 2.2 家庭年支出
        FMY_PRESON_NUM = r["FMY_PRESON_NUM"] if r["FMY_PRESON_NUM"] != None else "0" # 2.3 家庭人数
        FMY_TOT_ZC = r["FMY_TOT_ZC"] if r["FMY_TOT_ZC"] != None else "0.00"    # 3.1 家庭总资产
        FMY_TOT_FZ = r["FMY_TOT_FZ"] if r["FMY_TOT_FZ"] != None else "0.00"    # 3.2 家庭总负债
        YEAR_DAILY_CK = r["YEAR_DAILY_CK"] if r["YEAR_DAILY_CK"] != None else "0.00" # 3.3 年日均存款
        YEAR_AMT = r["YEAR_AMT"] if r["YEAR_AMT"] != None else "0.00"    # 4.1 年账户交易额度
        MONTH_FREQ = r["MONTH_FREQ"] if r["MONTH_FREQ"] != None else "0.00"    # 4.2 月账户交易频率
        CPGLD = r["CPGLD"] if r["CPGLD"] != None else 0  # 4.3 产品关联度
        OVERDUE_COUNT = r["OVERDUE_COUNT"] if r["OVERDUE_COUNT"] != None else 0  # 5.1 贷款逾期笔数
        CARD_OVERDUE = r["CARD_OVERDUE"] if r["CARD_OVERDUE"] != None else 0    # 5.2 信用卡逾期月数
        FXYQ_CNT = r["FXYQ_CNT"] if r["FXYQ_CNT"] != None else 0    # 5.3 付息逾期次数
        MARRY_STAT = r["MARRY_STAT"]    # 6.1 婚姻状况
        IS_OTH_DEBT_DIS = r["IS_OTH_DEBT_DIS"]  # 6.2 信誉不良 
        IS_BAST_HABIT = r["IS_BAST_HABIT"]  # 6.3 涉毒
        FMY_RELATION = r["FMY_RELATION"]    # 7.1 家庭关系
        NEIGHBOR_RELATION = r["NEIGHBOR_RELATION"]  # 7.2 邻里关系 
        CONCERN_LEVEL = r["CONCERN_LEVEL"]      # 7.3 村级公益
        IS_LAW_ABIDING = r["IS_LAW_ABIDING"]    # 8.1 涉诉
        tmpSql = ("INSERT INTO whitetea ("
                    "SSID,KHXM,SFZHM,"                              # 序列号,客户姓名,身份证号码
                    "YEAR_INCOME,YEAR_OUTLAY,"
                    "FMY_PRESON_NUM,FMY_TOT_ZC,FMY_TOT_FZ,"
                    "YEAR_DAILY_CK,YEAR_AMT,MONTH_FREQ,"
                    "CPGLD,OVERDUE_COUNT,CARD_OVERDUE,"
                    "FXYQ_CNT,MARRY_STAT,IS_OTH_DEBT_DIS,"
                    "IS_BAST_HABIT,FMY_RELATION,NEIGHBOR_RELATION,"
                    "CONCERN_LEVEL,IS_LAW_ABIDING) "
                    "VALUES ('%s','%s','%s',"   # 1
                    "%s,%s,%s,"                 # 2
                    "%s,%s,%s,"                 # 3
                    "%s,%s,%d,"                 # 4
                    "%d,%d,%d,"                 # 5
                    "'%s','%s','%s',"           # 6            
                    "'%s','%s','%s',"           # 7
                    "'%s')"                     # 8
        ) % (sid,KHXM,SFZHM,
            YEAR_INCOME,YEAR_OUTLAY,
            FMY_PRESON_NUM,FMY_TOT_ZC,FMY_TOT_FZ,
            YEAR_DAILY_CK,YEAR_AMT,MONTH_FREQ,
            CPGLD,OVERDUE_COUNT,CARD_OVERDUE,FXYQ_CNT,
            MARRY_STAT,IS_OTH_DEBT_DIS,IS_BAST_HABIT,
            FMY_RELATION,NEIGHBOR_RELATION,CONCERN_LEVEL,
            IS_LAW_ABIDING)
        # print("check: " + tmpSql)
        resList.append(tmpSql)
        r = ibm_db.fetch_both(stmt)
except Exception as e:
    traceback.print_exc()
    flag = False
finally:
    ibm_db.close(conn)

if (flag == False):
    print('两山白茶贷取数失败，强制退出!')
    exit()

print("两山白茶贷取数成功！将%d条数据存入MySQL.." % len(resList))

succ_cnt = 0
fail_cnt = 0

db = pymysql.connect(host="localhost", user="root", passwd="password", db="rainbowdb", charset="utf8")
cursor = db.cursor()

for i in range(0, len(resList)):
    try:
        tmpSql = resList[i]
        cursor.execute(tmpSql)
        db.commit()
        succ_cnt += 1
    except Exception as e:
        print(e)
        db.rollback()
        fail_cnt += 1
        
db.close()

print("MySQL插入结束!\r\n%d条数据插入成功，%d条数据插入失败" % (succ_cnt, fail_cnt))

# python whitetealoan.py 1000123456 20180221 20170201 20180201 101330327198602147245 101330523196506282515 101330523199803096827