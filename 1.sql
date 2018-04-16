
-- 用户表
drop table if exists user;
create table user 
(
    id int unsigned not null primary key auto_increment,
    username varchar(100),
    passwd varchar(100)
);

insert into user (username,passwd) values ('admin','admin');
insert into user (username,passwd) values ('8834512','8834512');    -- 楼宇羽
insert into user (username,passwd) values ('8834566','8834566');    -- 刘伟


-- 丰收彩虹贷 sid 记录表
drop table if exists rainbow_record;
create table rainbow_record
(
    id int unsigned not null primary key auto_increment,
    username varchar(100),
    sid varchar(100),
    stat varchar(30)
);

-- 丰收彩虹贷 基础数据
drop table if exists rainbow_base;
create table rainbow_base
(
    id int unsigned not null primary key auto_increment,
    SSID varchar(100),
    xid int,
    name varchar(100),
    sfzhm varchar(100),
    zhihang varchar(100),
    xzc varchar(100)
);

-- 丰收彩虹贷 python处理数据
drop table if exists rainbow;
create table rainbow
(
    id int unsigned not null primary key  auto_increment,
    SSID varchar(100),
    KHXM varchar(255),
    SFZHM varchar(63),
    YEAR_INCOME decimal(20,2),
    YEAR_OUTLAY decimal(20,2),
    FMY_PRESON_NUM int,
    FMY_TOT_ZC decimal(20,2),
    FMY_TOT_FZ decimal(20,2),
    YEAR_DAILY_CK decimal(20,2),
    YEAR_AMT decimal(20,2),
    MONTH_FREQ decimal(20,2),
    CPGLD int,
    OVERDUE_COUNT int,
    CARD_OVERDUE int,
    FXYQ_CNT int,
    MARRY_STAT varchar(63),
    IS_OTH_DEBT_DIS varchar(63),
    IS_BAST_HABIT varchar(63),
    FMY_RELATION varchar(63),
    NEIGHBOR_RELATION varchar(63),
    CONCERN_LEVEL varchar(63),
    IS_LAW_ABIDING varchar(63)
);

-- 两山白茶贷 sid 记录表
drop table if exists whitetea_record;
create table whitetea_record
(
    id int unsigned not null primary key auto_increment,
    username varchar(100),
    sid varchar(100),
    stat varchar(30)
);

-- 两山白茶贷 基础数据
drop table if exists whitetea_base;
create table whitetea_base
(
    id int unsigned not null primary key auto_increment,
    SSID varchar(100),
    xid int,
    name varchar(100),
    sfzhm varchar(100),
    zhihang varchar(100),
    xzc varchar(100)
);

-- 两山白茶贷 python处理数据
drop table if exists whitetea;
create table whitetea
(
    id int unsigned not null primary key  auto_increment,
    SSID varchar(100),
    KHXM varchar(255),
    SFZHM varchar(63),
    YEAR_INCOME decimal(20,2),
    YEAR_OUTLAY decimal(20,2),
    FMY_PRESON_NUM int,
    FMY_TOT_ZC decimal(20,2),
    FMY_TOT_FZ decimal(20,2),
    YEAR_DAILY_CK decimal(20,2),
    YEAR_AMT decimal(20,2),
    MONTH_FREQ decimal(20,2),
    CPGLD int,
    OVERDUE_COUNT int,
    CARD_OVERDUE int,
    FXYQ_CNT int,
    MARRY_STAT varchar(63),
    IS_OTH_DEBT_DIS varchar(63),
    IS_BAST_HABIT varchar(63),
    FMY_RELATION varchar(63),
    NEIGHBOR_RELATION varchar(63),
    CONCERN_LEVEL varchar(63),
    IS_LAW_ABIDING varchar(63)
);

-- 两山乡居贷 sid 记录表
drop table if exists villeggiatura_record;
create table villeggiatura_record
(
    id int unsigned not null primary key auto_increment,
    username varchar(100),
    sid varchar(100),
    stat varchar(30)
);

-- 两山乡居贷 基础数据
drop table if exists villeggiatura_base;
create table villeggiatura_base
(
    id int unsigned not null primary key auto_increment,
    SSID varchar(100),
    xid int,
    name varchar(100),
    sfzhm varchar(100),
    STAR_LEVEL varchar(63),
    zhihang varchar(100),
    xzc varchar(100)
);

-- 两山乡居贷 python处理数据
drop table if exists villeggiatura;
create table villeggiatura
(
    id int unsigned not null primary key  auto_increment,
    SSID varchar(100),
    KHXM varchar(255),
    SFZHM varchar(63),
    YEAR_INCOME decimal(20,2),
    YEAR_OUTLAY decimal(20,2),
    FMY_PRESON_NUM int,
    FMY_TOT_ZC decimal(20,2),
    FMY_TOT_FZ decimal(20,2),
    YEAR_DAILY_CK decimal(20,2),
    YEAR_AMT decimal(20,2),
    MONTH_FREQ decimal(20,2),
    CPGLD int,
    OVERDUE_COUNT int,
    CARD_OVERDUE int,
    FXYQ_CNT int,
    MARRY_STAT varchar(63),
    IS_OTH_DEBT_DIS varchar(63),
    IS_BAST_HABIT varchar(63),
    FMY_RELATION varchar(63),
    NEIGHBOR_RELATION varchar(63),
    GREEN_STAT varchar(63),
    CONCERN_LEVEL varchar(63),
    IS_LAW_ABIDING varchar(63)
);