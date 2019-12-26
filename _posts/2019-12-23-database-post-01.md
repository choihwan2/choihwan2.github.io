---
title: 데이터베이스 정리 -01
date: 2019-12-23 17:36:00
tags:
 - sql
 - database
 - TIL
 - oracle
---


## 시작하기에 앞서

멀티캠퍼스에서 데이터베이스 관련 수업이 시작되었다. 
처음 배우는 데이터베이스지만 과거에 부스트코스 안드로이드 프로그래밍을 하면서 다뤄봤던 적이 있던 주제였다. 그 때 당시에는 따라 쓰기에 급급하고 매번 구글링으로만 해결하던 문제들을 이해하도록 노력해보자!



## 환경설정

* [Database 18c Express Edition](https://www.oracle.com/database/technologies/xe-downloads.html) 이전버전 다운로드.

* [SQL Developer](https://www.oracle.com/tools/downloads/sqldev-downloads.html) 써도 되지만 이클리스에서 제공함. 

  자바 환경이 구축된 공간에서는Windows 64-bit with JDK 8 included 으로 돌리는게 편함 .




## 생성과 실행

* 관리자 계정 접속.

```bash
C:\Users\student>sqlplus system/password


SQL*Plus: Release 11.2.0.2.0 Production on 월 12월 23 10:10:49 2019

Copyright (c) 1982, 2010, Oracle.  All rights reserved.


Connected to:
Oracle Database 11g Express Edition Release 11.2.0.2.0 - Production

SQL>
```

>  잘된예시



* hr/hr에 접근하려 하지만 락이 걸려있음. 접근하기 위해서는 관리자에서 락을 풀어줘야한다.

```sql
SQL> conn hr/hr
ERROR:
ORA-28000: the account is locked

alter user hr identified by hr account unlock;
--락을 풀어주는 부분
```



* TABLESPACE 생성

```sql
create TABLESPACE <NAME>
datafile 'C:\oraclexe\app\oracle\oradata\XE\<NAME>.dbf'
size 10M
autoextend on next 1M maxsize UNLIMITED;
--TABLESPACE를 만드는 부분이다.
```

> C:\oraclexe\app\oracle\oradata\XE :실질적인 데이터가 들어있는 디렉토리.
>
> 테이블 스페이스 : 어떠한 계정에 들어갈 데이터들의 공간. 
>
> 테이블을 만들면 실질적인 데이터 들은 oradata로 들어간다.



```sql
create user <NAME> identified by <PASSWORD> 
--계정이름고 비밀번호 정하기.
default TABLESPACE <FILENAME>; 
--기본값일 파일 이름 안해줄시 system에 연결이 되어버린다..
```

오라클에서 계정을 만들고 default 값을 설정하지않으면 시스템영역을 사용해버림.  주의하자.



> 오라클에서 계정은 스키마라고 부릅니다.  SQL에서는 데이터베이스를 말하는 부분.

> 정규화과정 = 테이블을 쪼개는 것. 중복되는 데이터들을 뽑아내서 테이블을 만드는것.



## 권한과 삭제

```sql
grant connect,resource,dba to test01; 
--권한부여 권한없이 접근할경우 접근되지않음.

revoke dba from test01; 
--dba 권한만 뺏음. 커넥트 권한은 있음.
revoke connect from test01;
--connect 권한마저 뺏어버림

drop user test01 cascade; 
--test01 삭제 뒤의 cascade 는 강제성을줌

```



## SELECT와 관련된 명령문

```sql
desc emp;
--emp의 구조를 보여주세요.

select distinct job
from emp; 
--distinct 중복제거.


select sal, sal*12
from emp;
--연산식도 사용가능.

select sal, sal*12 as "연봉"
from emp; 
--연산식의 이름을 설정도 가능. 유일하게 `"`을 사용. 나머지는 다`'`으로 사용한다.

select ename, job, sal, comm,  sal+comm as "실급여", **nvl(comm, -1)**
from emp; 
--nvl = null 이라면 -1 이라는 값으로 바꿔줘. oracle 함수임.

select empno, ename, nvl(to_char(mgr), `'<<CEO>>'`) as "매니저 코드"
from emp;
--nvl 을 사용할때는 컬럼의 타입을 잘 확인해야함.  desc로 잘 확인하여 맞춰주자.

select ename, job, ename||'  '||job
from emp;  
--|| 문자열 연결.

select 20\*20\*4
from dual; 
--`dual`가상의 테이블로 값을 확인.

select sysdate
from dual; 
--날짜정보.

select user
from dual; 
--로그인한 유저의 정보.

select empno, ename, nvl(to_char(mgr), '<<CEO>>') as "매니저 코드"
from emp;
--nvl 로 null 형식의 값을 초기화시켜준다.

select ename, job, ename||'  '||job
from emp;
--문자열 삽입

select 20*20*4
from dual;
--간단한 값 표시. 가상공간 dual을 사용

--row 제한을 걸때 where 절
select ename, job, deptno
from emp
where job = 'MANAGER';

--대문자로 통일
select ename, job, deptno
from emp
where upper(job) = upper('manager');

select ename, hiredate
from emp
where hiredate >= '82/01/01';


select ename, hiredate
from emp
where hiredate <> '82/01/23';
-- <>은 != 의 의미이다.

select ename, sal 
from emp
where sal >=2450 AND sal < 3000;
--between and = between 은 =이 포함된다. 작은값이 꼭 앞에 오기.

select ename, sal 
from emp
where sal BETWEEN 2450 AND 3000;


select ename, job, deptno
from emp
where deptno = 10 or deptno = 20;

--in 연산자
select ename, job, deptno
from emp
where deptno in (10,20);

select *
from dept
where (deptno,loc) in ((20, 'DALLAS'), (30, 'CHICAGO'));

-- like 연산자
--A로 시작
select *
from emp
where ename like 'A%';

--A로 끝나냐
select *
from emp
where ename like '%A';

--A가 포함
select *
from emp
where ename like '%A%';

--A가 포함되긴 하는데 뒤에서 세번째
select *
from emp
where ename like '%A__';

--81년도에 입사한 사원 목록.
select *
from emp
where hiredate like '%81%';

--쓰레기값을 날려보자
SQL> purge recyclebin;
```

### SQL 명령어 분류

- Query : SELECT
- DML : INSERT, UPDATE, DELETE (롤백이 여지가 있음.)
- Transaction Control : COMMIT, ROLLBACK
- DDL : CREATE, DROP, TRUNCATE, ALTER (**롤백의 여지가 없다.**)
- DCL : GRANT, REVOKE



## 제약조건

|    종류     | 예제                                                         |
| :---------: | ------------------------------------------------------------ |
| PRIMARY-KEY | 하나의 행에서 그행을 대표하는 컬럼이며 FOREIGN-KEY 칼럼이 참조하는 칼럼은 반드시 PRIMARY-KEY 칼럼이여야 한다. |
| FOREIGN-KEY | 입력되어야 할 값이 다른 테이블의 PRIMARY-KEY 칼엄의 값인 컬럼 |
|   UNIQUE    | 칼럼의 값이 테이블 전체에서 **유일**한 값.                   |
|  NOT NULL   | 칼럼에 NULL 값이 입력되어서는 안되는 경우                    |
|    CHECK    | 임의의 제약조건을 추가한다.                                  |




> 처음 시작시 데이터베이스의 생성(oracle에서는 스키마 생성)과  흐름을 이해하는게 부족한 것 같다. 
>
> 특히 select 문의 like 부분은 한번씩 와서 확인할 수 있도록 해보자. 나중에 도움이 될것같다.
>
> <<<<<<< HEAD
> =======



## 환경설정

* [Database 18c Express Edition](https://www.oracle.com/database/technologies/xe-downloads.html) 이전버전 다운로드.

* [SQL Developer](https://www.oracle.com/tools/downloads/sqldev-downloads.html) 써도 되지만 이클리스에서 제공함. 

  자바 환경이 구축된 공간에서는Windows 64-bit with JDK 8 included 으로 돌리는게 편함 .
>>>>>>> d4f525ef8f2adbde4816c829181cea3e98f9d3de
