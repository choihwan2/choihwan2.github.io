---
title: 알고리즘 스터디 5월 3주차 문제1 (로마 숫자 만들기)
date: 2020-05-19 13:51:34
tags:
 - algorithm
 - bfs
keywords:
  - study
  - codingtest
---

## 문제[#](https://www.acmicpc.net/problem/16922)

![problem](problem.png)

## 풀이 및 주저리..

백준 오프라인 강의에서 BFS 문제를 풀다가 다시 브루트 포스쪽으로 넘어와 푼 문제이다. 문제자체는 간단해보이지만 함정이 있다. 단순하게 DFS 로 접근하는 경우에는 시간 초과가 나기때문! 자리수에 동전이 들어갈 수 있는 경우로 구하면 4의 20승이 나오면서 시간초과가 나버린다. 강의때도 들었지만 이런 경우에는 문제를 잘 읽고 내가 구현하려는 코드의 시간복잡도를 구해보고 접근을 해야한다고 한다. 대충 계산했을때 10억이라는 계산수가 넘어가게 되면 시간초과를 생각해봐야하기 때문이다. 하여튼 시간초과를 피하기위해서 어떤 동전을 몇개 선택 할지로 생각을 전환시켜서 풀게되면 쉽게 풀리는 문제였다.

동전이 어떤 자리에 있더라도 그 합계는 동일할테니 시간복잡도가 N의 4승으로 엄청나게 줄게 된다. 게다가 마지막 동전의 개수는 N에서 나머지 3개의 동전의 수를 빼면 구할 수 있으니 N의 3승까지 줄일 수 있는 문제였다. 개인적으로 3중 `for`문을 사용할 때 너무나도 어색하고 머리가 좀 복잡해지는 느낌이 있는데 사용하다보니 직관적이고 문제를 쉽게 풀 수 있는 지름길 같기도 하였다. 이걸 재귀로도 풀어보고 싶은데 어떻게 하면 좋을지 고민해보아야겠다.

## 코드

```java
package baekjoon.algorithm.day03;

import java.util.Scanner;

public class MakeRomaNumber {
	static int N;
	static boolean[] numBool = new boolean[1001];
	static int answer = 0;

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		N = scanner.nextInt();

		for (int i = 0; i <= N; i++) {
			for (int j = 0; j <= N - i; j++) {
				for (int z = 0; z <= N - i - j; z++) {
					if (numBool[i * 1 + j * 5 + z * 10 + (N - i - j - z) * 50] == false) {
						numBool[i * 1 + j * 5 + z * 10 + (N - i - j - z) * 50] = true;
						answer++;
					}
				}
			}
		}

		System.out.println(answer);
		scanner.close();
	}
}

```

## 기억에 남길 것!

- DFS 는 순서냐 선택이냐 를 잘 선택하고 접근하는게 중요하다.
  - 순서 - N개를 다하는데 순서가 상관있다.
  - 선택 - N개 중에서 무엇을 할지 선택하여 진행한다.
- 문제를 풀기전에 시간복잡도를 계산하고 시작하자.

