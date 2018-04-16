-- test data

-- t_entr
DELETE FROM t_entr WHERE entr_no='10000000000001';
INSERT INTO t_entr (city_id,ins_code,entr_no,qry_res,qry_oper,res_date,uid,file_name,uplode_date) 
VALUES ('883050','3213213123123212','10000000000001','我也不知道查询原因','安吉农村商业银行某一位哈哈哈哈哈桂圆','2018-02-04','8837123','upload_3213123123211312.html','2018-02-04');

-- t_rely
DELETE FROM t_rely WHERE entr_no='10000000000001';
INSERT INTO t_rely (entr_no,entr_name,upload_time,uid,city_id) 
VALUES ('10000000000001','莫名其妙的哈哈哈哈公司','2018-02-04','8837062','883050');

-- t_conn
DELETE FROM t_conn WHERE entr_no='10000000000001';
INSERT INTO t_conn (entr_no,subentr_name,subentr_no,relation) VALUES ('10000000000001','浙江睿嘉生物科技有限公司','3305230002749513','法人代表关联-兼法人代表');
INSERT INTO t_conn (entr_no,subentr_name,subentr_no,relation) VALUES ('10000000000001','安吉接力电机科技有限公司','3305230000617769','财务负责人关联-兼财务负责人');
INSERT INTO t_conn (entr_no,subentr_name,subentr_no,relation) VALUES ('10000000000001','哔哩哔哩巴拉巴拉琪琪哈哈公司1','3305230000617769','法人代表关联-兼法人代表');
INSERT INTO t_conn (entr_no,subentr_name,subentr_no,relation) VALUES ('10000000000001','哔哩哔哩巴拉巴拉琪琪哈哈公司2','3305230000617769','财务负责人关联-兼财务负责人');
INSERT INTO t_conn (entr_no,subentr_name,subentr_no,relation) VALUES ('10000000000001','哔哩哔哩巴拉巴拉琪琪哈哈公司3','3305230000617769','法人代表关联-兼法人代表');
INSERT INTO t_conn (entr_no,subentr_name,subentr_no,relation) VALUES ('10000000000001','哔哩哔哩巴拉巴拉琪琪哈哈公司4','3305230000617769','财务负责人关联-兼财务负责人');
INSERT INTO t_conn (entr_no,subentr_name,subentr_no,relation) VALUES ('10000000000001','哔哩哔哩巴拉巴拉琪琪哈哈公司5','3305230000617769','财务负责人关联-兼财务负责人');
INSERT INTO t_conn (entr_no,subentr_name,subentr_no,relation) VALUES ('10000000000001','哔哩哔哩巴拉巴拉琪琪哈哈公司6','3305230000617769','法人代表关联-兼法人代表');
INSERT INTO t_conn (entr_no,subentr_name,subentr_no,relation) VALUES ('10000000000001','哔哩哔哩巴拉巴拉琪琪哈哈公司7','3305230000617769','法人代表关联-兼法人代表');
INSERT INTO t_conn (entr_no,subentr_name,subentr_no,relation) VALUES ('10000000000001','哔哩哔哩巴拉巴拉琪琪哈哈公司8','3305230000617769','财务负责人关联-兼财务负责人');
INSERT INTO t_conn (entr_no,subentr_name,subentr_no,relation) VALUES ('10000000000001','哔哩哔哩巴拉巴拉琪琪哈哈公司9','3305230000617769','财务负责人关联-兼财务负责人');

-- t_unclear
DELETE FROM t_unclear WHERE entr_no='10000000000001';
INSERT INTO t_unclear (entr_no,pro_name,normal_count,normal_amount,ins_count,ins_amount,fail_count,fail_amount,tol_count,tol_amount) 
VALUES ('10000000000001','贷款',1,100.00,2,123.00,3,234.12,0,0.00);
INSERT INTO t_unclear (entr_no,pro_name,normal_count,normal_amount,ins_count,ins_amount,fail_count,fail_amount,tol_count,tol_amount) 
VALUES ('10000000000001','类贷款',1,100.00,2,123.00,3,234.00,0,0.00);
INSERT INTO t_unclear (entr_no,pro_name,normal_count,normal_amount,ins_count,ins_amount,fail_count,fail_amount,tol_count,tol_amount) 
VALUES ('10000000000001','贸易融资',1,100.00,2,123.00,3,234.00,0,0.00);
INSERT INTO t_unclear (entr_no,pro_name,normal_count,normal_amount,ins_count,ins_amount,fail_count,fail_amount,tol_count,tol_amount) 
VALUES ('10000000000001','保理',1,100.00,2,123.00,3,234.00,0,0.00);
INSERT INTO t_unclear (entr_no,pro_name,normal_count,normal_amount,ins_count,ins_amount,fail_count,fail_amount,tol_count,tol_amount) 
VALUES ('10000000000001','票据贴现',1,100.00,2,123.00,3,234.56,0,0.00);
INSERT INTO t_unclear (entr_no,pro_name,normal_count,normal_amount,ins_count,ins_amount,fail_count,fail_amount,tol_count,tol_amount) 
VALUES ('10000000000001','银行承兑汇票',1,100.00,2,123.00,3,234.00,0,0.00);
INSERT INTO t_unclear (entr_no,pro_name,normal_count,normal_amount,ins_count,ins_amount,fail_count,fail_amount,tol_count,tol_amount) 
VALUES ('10000000000001','信用证',1,100.00,2,123.00,3,234.00,0,0.00);
INSERT INTO t_unclear (entr_no,pro_name,normal_count,normal_amount,ins_count,ins_amount,fail_count,fail_amount,tol_count,tol_amount) 
VALUES ('10000000000001','保函',1,100.00,2,123.00,3,234.00,0,0.00);
INSERT INTO t_unclear (entr_no,pro_name,normal_count,normal_amount,ins_count,ins_amount,fail_count,fail_amount,tol_count,tol_amount) 
VALUES ('10000000000001','合计',1,100.00,2,123.00,3,234.00,0,988.10);

-- t_detail
DELETE FROM t_detail WHERE entr_no='10000000000001';
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','正常类','本机构','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','关注类','本机构','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','不良类','B1001','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','正常类','B1024','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','不良类','本机构','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','正常类','本机构','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','关注类','本机构','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','正常类','本机构','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','不良类','本机构','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','正常类','B1001','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','不良类','本机构','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','不良类','B1024','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','正常类','本机构','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');
INSERT INTO t_detail (pro_name,entr_no,class,crd_ins,type,currency,count,amount,balance30,balance60,balance90,balance90p,balance,start_date,due_date,loan_form,support,extend,advance,detail,five_level) 
VALUES ('贷款','10000000000001','正常类','B1022','流动资金贷款','人民币',1,100.00,100.00,200.00,300.00,400.00,1000.00,'2018-02-01','2018-02-04','新增贷款','无','无','无','无','无');

-- t_support
DELETE FROM t_support WHERE entr_no='10000000000001';
INSERT INTO t_support (entr_no,type,be_support,cert_type,sid,currency,amount,support_type) 
VALUES ('10000000000001','保证','湖州阿祥进出口贸易有限公司','贷款卡','3305000000828125','人民币',6000.00,'单人担保');
INSERT INTO t_support (entr_no,type,be_support,cert_type,sid,currency,amount,support_type) 
VALUES ('10000000000001','保证','浙江振兴阿祥集团有限公司','贷款卡','3305010000037694','人民币',4000.00,'单人担保');
INSERT INTO t_support (entr_no,type,be_support,cert_type,sid,currency,amount,support_type) 
VALUES ('10000000000001','保证','湖州阿祥进出口贸易有限公司','贷款卡','3305000000828125','人民币',6000.00,'单人担保');
INSERT INTO t_support (entr_no,type,be_support,cert_type,sid,currency,amount,support_type) 
VALUES ('10000000000001','保证','浙江振兴阿祥集团有限公司','贷款卡','3305010000037694','人民币',4000.00,'单人担保');
INSERT INTO t_support (entr_no,type,be_support,cert_type,sid,currency,amount,support_type) 
VALUES ('10000000000001','保证','湖州阿祥进出口贸易有限公司','贷款卡','3305000000828125','人民币',6000.00,'单人担保');
INSERT INTO t_support (entr_no,type,be_support,cert_type,sid,currency,amount,support_type) 
VALUES ('10000000000001','保证','浙江振兴阿祥集团有限公司','贷款卡','3305010000037694','人民币',4000.00,'单人担保');

-- t_history
INSERT INTO t_history (entr_no,file_name,uid,upload_date,city_id) 
VALUES ('10000000000001','1.html','8837123','2018-02-04','883050');
INSERT INTO t_history (entr_no,file_name,uid,upload_date,city_id) 
VALUES ('10000000000001','16.html','8837123','2018-02-05','883050');
