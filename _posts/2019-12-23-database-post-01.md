---
title: 데이터베이스 정리 -01
date: 2019-12-23 11:20:00
tags:
 - sql
 - TIL
 - database
keywords:
 - database
 - sql
---



## Database

[Database 18c Express Edition](https://www.oracle.com/database/technologies/xe-downloads.html) 이전버전 다운로드.



## Developer tools

[SQL Developer](https://www.oracle.com/tools/downloads/sqldev-downloads.html) 써도 되지만 이클리스에서 제공함. 

Windows 64-bit with JDK 8 included 으로 돌리는게 편함 자바 환경이 구축된 공간에서는.

다 설치한후



## 실행해보기

* 관리자 계정으로 접속한다.

```bash
C:\Users\student>sqlplus system/비밀번호


SQL*Plus: Release 11.2.0.2.0 Production on 월 12월 23 10:10:49 2019

Copyright (c) 1982, 2010, Oracle.  All rights reserved.


Connected to:
Oracle Database 11g Express Edition Release 11.2.0.2.0 - Production

SQL>
```

>  잘된예시



그냥 접글하려 하지만 락이 걸려있음.

```
SQL> conn hr/hr
ERROR:
ORA-28000: the account is locked
```



```sql
select 
```



C:\oraclexe\app\oracle\oradata\XE :실질적인 데이터가 들어있는 파일들.



테이블 스페이스 : 어떠한 계정에 들어갈 데이터들의 공간. -> 테이블을 만들면 실질적인 데이터 들은 oradata로 들어간다. 잘 못 만들면 system 쪽으로 들어가 성능 저하가 일어남.



```sql
create TABLESPACE <NAME>
datafile 'C:\oraclexe\app\oracle\oradata\XE\<NAME>.dbf'
size 10M
autoextend on next 1M maxsize UNLIMITED;

```

오라클에서 계정을 만들고 아무것도 하지않으면 시스템영역을 사용해버림. 설정을 해줘야한ㄷ.

default 를 정하는 부분이 이부분.

오라클에서 계정은 스키마라고 부릅니다.



정규화과정 = 테이블을 쪼개는 것. 중복되는 데이터들을 뽑아내서 쭊쭊~

