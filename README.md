# 授信测算系统
用于我行农户信用贷款相关业务的授信测算，是一个基于node.js + express的小系统。  

使用这个系统可以了解如何在node.js调用python子进程。  
因为之前使用node.js的ibm_db的时候出现了一点问题（但是后来发现node的ibm_db用起来也不错），所以采用了这个即有python又有node.js的版本。  
使用时需要安装相应环境和修改数据库中的配置（我这里DB2的配置都修改掉了）。  

笔者很懒，先写到这里了……

## 需要先安装node.js和python3。
python3依赖的一些包：  
- ibm_db
- pymysql