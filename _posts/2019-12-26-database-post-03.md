---
title: 데이터베이스 정리 -03
date: 2019-12-26 19:45:00
tags:
 - sql
 - database
 - TIL
 - oracle
---

## 시작하기에 앞서

Oracle Database를 활용하여 데이터베이스 기초를 배우고 있는 중이다. ddl과 dml에 대해서 학습하고 정리해본 내용이다.



## where & order by

* 기본적으로 SCOTT/TIGER에서 진행하였다.

```sql
--where 절에서는 as 사용 x
select ename,sal,comm,sal+nvl(comm,0) as "총급여"
from emp
where sal + nvl(comm, 0) >= 2000;

--정렬
select ename,sal,comm,sal+nvl(comm,0) as "총급여"
from emp
order by sal;
--셀값만 준다면 기본적으로는 오름차순 (asc인데 생략가능)

select ename,sal,comm,sal+nvl(comm,0) as "총급여"
from emp
order by sal desc;
--desc는 내림차순

select ename,sal,comm,sal+nvl(comm,0) as "총급여"
from emp
order by sal asc, comm desc;
--각각 조건도 가능.

select ename, sal, sal + nvl(comm, 0) as "총급여"
from emp
where comm is null
order by sal;
--is null is not null로도 사용가능.

select ename, sal, sal + nvl(comm, 0) as "총급여"
from emp
where comm is null
order by "총급여";
```



## 단일행 함수(dual)

```sql
-- 단일행 함수
select dname, lower(dname), loc, lower(loc)
from dept;

select round(44.55), round(44.55,1), trunc(44.55) 
from dual;
--round 반올림, 몇번째 짜리까지 반올림, 소수점 잘림.

select sal, sal*0.03 as "TAX"
from emp;
--기본적인 연산도 가능하다.

--어디서부터 시작해서 몇개 나오는지
select ename, hiredate, substr(hiredate,4,2)
from emp
where substr(hiredate,4,2) like 12;

--날짜에 관련된 함수와 형식변환
select sysdate ,substr(sysdate,4,2) from dual;

select sysdate , to_char(sysdate, 'YY') from dual;
select sysdate , to_char(sysdate, 'YYYY') from dual;
select sysdate , to_char(sysdate, 'MM') from dual;
select sysdate , to_char(sysdate, 'day') from dual;
select sysdate , to_char(sysdate, 'mm') from dual;
select sysdate , to_char(sysdate, 'dd') from dual;

--emp에서 사원들의 사원명, 입사월, 요일 정보를 출력하세요.
select ename, to_char(hiredate,'mm') as "입사월", to_char(hiredate,'day') as "입사 요일"
from emp
order by "입사월";

select sysdate, to_date('2019/12/24') from dual;
select sysdate, to_date('2019-12-24') from dual;
select sysdate, to_date('29 12 24', 'dd-mm-yy') from dual;

-- decode 함수
--decode(어디에서,몇번째,해줄것, 몇번재, 해줄것)
select ename, sal, deptno, decode(deptno, 10, sal*1.2, 20, sal* 0.7) as "보너스"
from emp
order by deptno;
```



---



## join

> join은 두 개의 상관있는 테이블을 연결하여 서로의 테이블에서 데이터를 가져올 때 사용된다.

```sql
select ename,dname,loc
from emp,dept
where EMP.DEPTNO = dept.deptno;
--두 개의 테이블이 어떤 관계인지 정의내려줘야한다.

select ENAME, EMP.DEPTNO, DNAME, LOC
from EMP,DEPT
where EMP.DEPTNO = DEPT.DEPTNO;

select ename, e.deptno,dname,loc
from emp e, dept d
where e.deptno = d.deptno;

--sal > 2000 크면서 deptno가 20인 사원의 이름, sal loc 출력
select ename, sal, loc
from emp e, dept d
where e.DEPTNO = d.DEPTNO and e.SAL > 2000 and e.DEPTNO = 20;

*********************
-- Ansi join 표준(맘대로 하면 복잡하니 표준을 만들자) : , => (inner) join where => on
*********************

--inner join 둘의 공통
select ename, sal, loc
from emp e join dept d
on e.deptno = d.deptno
where sal > 2000 and e.deptno = 20;

--outer join
--Oracle
--null 쪽에 + 마킹 : +가 있는 쪽에 있는 모든걸 보여준다 null 이여도.
select ename, d.deptno, dname, loc
from emp e, dept d
where e.deptno(+) = d.deptno;

--Ansi join
-- right 쪽이 테이블이 마스터가 된다. 
-- 기준이 교집합에서 오른쪽이 다 차있는 교집합이라고 생각하면 될듯 .
select ename, d.deptno, dname, loc
from emp e right outer join dept d
on e.deptno = d.deptno;

***********************
-- non equi join
***********************

select * from salgrade;

-- oracle join
select ename,sal,grade
from emp, salgrade
where sal between losal and hisal;


--ansi join
select ename, sal, grade
from emp join salgrade
on sal between losal and hisal;


*****************
-- n개의 테이블 join
*****************
-- 사원명, sal, 부서이름, salgrade

--oracle
select ename, sal, dname, grade
from emp, dept, salgrade
where emp.deptno = dept.deptno and sal between losal and hisal;


-- ansi join
select ename, sal, dname, grade
from emp 
	join dept
	on emp.deptno = dept.deptno
	join salgrade
	on sal between losal and hisal 
where sal > 1500;

******************
-- oracle self join
******************
-- 사원의 이름과 그 사원의 상사 이름 출력
select e.ename, m.ename
from emp e, emp m
where e.mgr = m.empno;

select e.ename, m.ename
from emp e, emp m
where e.mgr = m.empno(+);

-- 상사보다 월급을 더 많이 받는 직원
select e.ename, m.ename, e.sal, m.sal
from emp e, emp m
where e.mgr = m.empno(+) and e.sal > m.sal;

--ansi left와 right 는 outer 생략가능. 
select e.ename, m.ename
from emp e join emp m
on e.mgr = m.empno;


select e.ename "사원명", e.sal, m.ename "상사이름", m.sal
from emp e 
join emp m
on e.mgr = m.empno
where e.sal >= m.sal;
```



## 집계함수

```sql
--집계함수
select ename, round(sal) from emp;

select ename, avg(sal) from emp; --안됨.

select avg(sal) from emp;

select round(avg(sal)) "전체 평균급여" from emp;

select round(avg(sal))|| '원' from emp;

select deptno, round(avg(sal)) from emp group by deptno;
--집계함수에서는 group by로 들어간 아이만 select 절에 들어갈 수 있다.

select dname, avg(sal), count(*), min(sal), max(sal), count(mgr)
from emp
right join dept
on emp.deptno = dept.deptno
group by dname
order by dname;

--부서번호, 부서이름, 부서평균급여, 부서에 있는 사람수, 부서별 최소,최대 월급
select e.deptno, dname, avg(sal), count(*), min(sal), max(sal)
from emp e, dept d
where e.deptno = d.deptno
group by e.deptno, dname;


--group by 이후 조건을 주는것이 having 절
***************
select
from
where
group by
having
order by
***************

--평균 급여가 2000이상인 사람.
select e.deptno, dname, round(avg(sal)) "평균급여"
from emp e, dept d
where e.deptno = d.deptno
group by e.deptno, dname
having avg(sal) > 2000;
```



## subQuery

```sql
--subQuery
--Ford 보다 급여가 많은 사원 목록

select sal from emp where ename = 'FORD';

select * from emp where sal > 3000;

select * 
from emp
where sal > (select sal from emp where ename = 'FORD');


-- 전체 평균 급여보다 적게 받는 사원 목록
select ename, sal
from emp
where sal < (select avg(sal) from emp);

select ename, sal
from emp
where sal = (select min(sal) from emp);

-- 부서별 최고 급여를 받는 사원 목록

select ename, sal, max(sal)
from emp e
join dept
on e.deptno = dept.deptno
group by e.deptno;


--부서별 최고 급여 받는 사원
select *
from emp
where sal in (select max(sal) from emp group by deptno);

select *
from emp
where (deptno, sal) in (select deptno, max(sal) from emp group by deptno)
order by deptno;


*************
-- rownum: 자동적으로 1~n 개의 수가 column에 주어짐.
*************

select ename, job, sal
from emp;

select rownum, ename, job, sal
from emp;

select rownum, ename, job, sal
from emp
order by sal;

select rownum, ename, job, sal
from (select * from emp order by sal);

--급여 top 3
select rownum, ename, job, sal
from (select * from emp order by sal desc)
where rownum < 4;

select rownum, ename, job, sal
from (select * from emp order by sal desc)
where rownum between 6 and 10; --rownum 은 1부터 시작하는 경우가 아니니 작동하지 않음.

--oracle page 처리

select *
from (
	select rownum row#, ename, job, sal
	from (select * from emp order by sal desc)
)
where row# between 6 and 10;
--rownum을 먼저 생성한후 그것을 row#으로 받고 그다음 그 목록에서 6~10의 수를 보여줌.
```

