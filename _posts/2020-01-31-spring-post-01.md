---
title: Spring 정리 -01
date: 2020-01-31 17:24:00
tags:
 - Spring
 - java
---

## 시작하기에 앞서

수업이 좀 진행되었지만 Spring 을 다시 정리하고자 글을 남긴다. 혼자 보기 용으로 쓴 글이라 매우 난잡..

# spring_test

스프링 파일 정리

- Maven: 프로젝트 관리 도구(?) (하는일: 구조를 만들어준다.)
- class -> library(jquery) -> frame work(spring)



Spring Bean

- Java 에서는 new 라는걸로 객체 생성
- Spring 에서는 bean으로 생성,



## 스프링의 특징

1. 여러가지 모듈 단위별
2. 스프링 이전 개발 자바 객체 그대로 재사용 가능.
3. POJO 클래스들도 사용 가능.
4. 다양한 데이터베이스 연결이 가능 Spring ORM or Spring Dao jdbc 등 가능하지만 우리는 mabatis 를 활용한다.



## DI

- IOC (Inversion of Control) 

  ```java
  class A{
  	//B b1 = new B(); //일반적인 객체 생성
      B b1;
      A(B b1){
          this.b1 = b1; //외부에서 전달한 객체로 b1을 생성하는 법.
      }
  }
  ```

  평소에 객체를 만드는 방식으로 만드는 것이 아니라. 만들고자 하는 객체를 스프링에 전달해주면 그걸 스프링이 만들어줌. = `new`가 사라지고 스프링 대신 생성 객체 전달받는다. 

- Dependency Injection (의존성 주입)

  1. 생성자 DI
  2. setter DI

## 설정

pom.xml 안의 

java 버전 1.8 하고 스프링 버전을 4.3.18 로 바꾸고 Properties에서 java build path 에서 자바 버전을 바꾸고 project facets 에서도 java 버전 변경 그리고 runtimes 에서 tomcat 설정



> pojo : 스프링/web/일반 main 재사용이 가능한 자바 객체
>
> 스프링 자바객체 = spring bean



<bean id = "bean이름" class="패키지명.클래스명"//>



- DO : Data object = value object = data transfer object 값 저장 객체

- DAO :  Data access object / jdbc/ io / 네트워크 값이 저장되어있는 곳에 접근해서 값을 가져오는 객체

`ApplicationContext` 는 spring 에서 factory 역활을 해준다.



## 스프링 내부 규칙

1.  스프링 xml 안에서 같은 이름 같은 타입 객체 1개 생성 - 공유 싱글턴 방식으로 생성됨
2.  스프링 공장 생성 객체만 전달.
3.  스프링 규칙대로 강제적

## Repository

```java
@Repository("dao")
public class EmpDAO{
    EmpVO vo;
    setVO(EmpVo vo){
        this.vo = vo;
    }
}

@Repository	//"empDAO" 라는 ㅣㅇ름으로 객체가 생성됨.
public class EmpDAO{
    @Autowired 	//setVO라는 함수를 대체함
    EmpVO vo;
}

@Repository("vo")
public class EmpVO{
    String name;
    double salary;
}
```

위 코드를 사용하기위해서는

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd">

	<!--@Repository, @Component, @Autowired 설정 인식 표현을 해줘야 인식함.  -->
	<context:component-scan base-package="annotaion.empspring" />
	
	<bean id="vo" class="annotaion.empspring.EmpVO">
		<property name="name" value="김사원"></property>
		<property name="salary" value="10000"></property>
		<property name="deptname" value="영업부"></property>
	</bean>

</beans>

```

### 참고

- ejb vs spring [링크](https://m.blog.naver.com/sillllver/220593543939)
- Framework 책 27pg
- DI(Dependency Injection) - IoC (https://itgosu.tistory.com/10) + 책 143pg
- AOP(Aspect Oriented Programming) - 관점지향프로그래밍 143pg
- POJO: plain old java object (과거부터 계속해서 쓰여왔던 java 클래스 어디에서나 쓰일수 있음. ex: class B)
     bean 27~후에 나옴.

- MVC - 책313pg

> 스프링은 양방향 응용, 웹 ,모바일 등 다 사용가능,  타 프레임워크랑 호환이 좋음.

- [참고사이트](https://wizcenter.tistory.com/)

> 책은 토비의 스프링 추천해주셨음.