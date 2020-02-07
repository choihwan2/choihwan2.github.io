# Mybatis



## jdbc 에서 Mybatis로

- 기존의 jdbc 구조

  try{ 

1. Class.forName("...")

2. Connection c = DriverManaget.getConnection(jdbc,url,id,pw);

3. sql - 결과

4. c.close }

5. catch (Exception e) {

6. e.print

   }



단점 : 코드 반복 많다. sql + 자바 언어가 섞인다. db 연결 복잡한 정보가 매번 작성되어야한다.

해결법 : 1~2 는 한번만 가져다 쓰기 4 는 Mybatis 에게 맡기기 // sql만 빼도록해보자

=> db-config.xml 파일에 연결에 관한 작성.

=>sql-mapping.xml 파일에 sql 언어를 작성,



위에 과정을 거치면

1. xml 설정 읽어라
2. db 연결 객체 가져옴
3. sql 정보도 가져와서 실행 요청 - 결과
4. 출력







## rownum

- rownum 함수 : 조회 레코드 번호
- \> \>= (단, 1 제외) 이유는 데이터를 본다음 rownum 이 매겨지기 때문.
- employees 테이블에서 11~20번째 데이터 조회

```sql
select r, first_name, hire_date
from (select rownum r, first_name, hire_date from employees) where r >= 11 and r <=20;
-- 안된다 생각해봐

3. select r, first_name, hire_date
from (2. select rownum r, first_name, hire_date from (1. select * from employees order by hire_date desc)) where r >= 11 and r <=20
-- 1. 먼저 정렬을 하고 2. 그다음 생성 3. 그다음 조건을 거쳐서 보기
```

