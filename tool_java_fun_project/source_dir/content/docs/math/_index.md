---
title: "数学"
date: 2021-01-17T15:26:15Z
draft: false
weight: 3
bookCollapseSection: true
---

# MarkDown数学公式

> 数学是所有自然科学的灵魂



## 一、常用符号

+ **内联公式**

在MarkDown语法中可以书写数学公式，书写数学公式必须要有一个入口——内联公式。



```latex
{{</* katex display  */>}}
数学公式
{{</* /katex */>}}
```


### 常用符号

| 名称 | 实例 | 预览 | 注释 |
| --- | --- | --- | --- |
| 上下标 | a^n_m |  | 上标^用于指数，下标用于角标 |
| 正负号（±） | a \\pm b | a±b |  |
| 乘 | \\times | × |  |
| 除 | \\dlv | ÷ |  |
| 根号 | \\sqrt |  | 根号下(a-b) |
| 大于 | \\gt | ＞ |  |
| 小于 | \\lt | ＜ |  |
| 大于等于 | \\ge | ≥ |  |
| 小于等于 | \\le | ≤ |  |
| 正无穷 | \\infty | ∞ |  |
| 负无穷 | -\\infty | -∞ |  |
| 分数 | \\dfrac{a} |  | a分之b |
| 省略号 | \\cdots | ... |  |


### 三角函数

| 数学表达式 | 代码 |
| --- | --- |
| sinθ | \\sin |
| cosθ | \\cos |
| tanθ | \\tan |
| cotθ | \\cot |


### 矢量、累加累乘、极限

| 数学表达式 | 代码 |
| --- | --- |
| 矢量 | \\vec{} |
| 累加（求和∑） | \\sum_{}^{} |
| 累乘（求积∏） | \\prod_{}^{} |
| 极限 | \\lim_{} |


### 希腊字母表

| 代码 | 预览 | 代码 | 预览 |
| --- | --- | --- | --- |
| \\alpha | α | \\pi | π |
| \\beta | β | \\rho | ρ |
| \\gamma | γ | \\xi | ξ |
| \\delta | δ | \\nu | ν |
| \\epsilon |  | \\upsilon | υ |
| \\varepsilon | ε | \\varphi | φ |
| \\eta | η | \\chi | χ |
| \\theta | θ | \\psi | ψ |
| \\kappa | κ | \\omega | ω |
| \\iota | ι | \\Omega | Ω |
| \\zeta |  | \\Gamma | Γ |
| \\lambda | λ | \\Delta | Δ |
| \\mu | μ |  |  |
| \\phi | φ | \\Phi | Φ |



## 方程组、表达条件式

### 方程组

{{< katex display  >}}

\begin{cases}
3x + 5y +  z \\
7x - 2y + 4z \\
-6x + 3y + 2z
\end{cases}

{{< /katex >}}

### 表达条件式

{{< katex display  >}}

f(n) =
\begin{cases} 
n/2,  & \text{if }n\text{ is even} \\
3n+1, & \text{if }n\text{ is odd}
\end{cases}

{{< /katex >}}


| <div style="width:290px">property</div> | description                           |
|                      ---                 |              ---                     | 
| `border-bottom-right-radius`            | Defines the shape of the bottom-right |


## 格式

### 代码块内多行代码对齐

{{< katex display  >}}

\begin{aligned}
a &= b + c \\
  &= d + e + f
\end{aligned}

{{< /katex >}}


### 间隔（空格、跟随）

跟随 `\!`

无空格 小空格`\,` 中空格`\;` 大空格`\`

真空格`\quad` 双真空格 `\qquad`

{{< katex display  >}}

a\!b + ab + a\,b + a\;b + a\ b + a\quad b + a\qquad b

{{< /katex >}}



## 矩阵


### 简单矩阵

+ 简单矩阵事例1

使用 `\begin{matrix} ... \end{matrix}` 生成，每一行以 `\\` 结尾表示换行，各元素间以 `&` 隔开，右边的数学公式代码块序号用 `\tag{n}` 表示。


{{< katex display  >}}

\begin{matrix}
1 & 2 & 3\\
4 & 5 & 6\\
7 & 8 & 9\\
\end{matrix}
\tag{简单矩阵 - 事例1}

{{< /katex >}}


+ 简单矩阵事例二（带括号）


{{< katex display  >}}

\left\{
\begin{matrix}
1 & 2 & 3\\
4 & 5 & 6\\
7 & 8 & 9\\
\end{matrix}
\right\}
\tag{带有大括号的矩阵}

{{< /katex >}}


or 


{{< katex display  >}}

\begin{Bmatrix}
   1 & 2 & 3 \\
   4 & 5 & 6 \\
   7 & 8 & 9
  \end{Bmatrix} \tag{6}

{{< /katex >}}


中括号

{{< katex display  >}}

 \left[
 \begin{matrix}
   1 & 2 & 3 \\
   4 & 5 & 6 \\
   7 & 8 & 9
  \end{matrix}
  \right]
  \tag{中括号}

{{< /katex >}}


或

{{< katex display  >}}

 \begin{bmatrix}
   1 & 2 & 3 \\
   4 & 5 & 6 \\
   7 & 8 & 9
  \end{bmatrix} \tag{6}

{{< /katex >}}


小括号


{{< katex display  >}}

\left(
 \begin{matrix}
   1 & 2 & 3 \\
   4 & 5 & 6 \\
   7 & 8 & 9
  \end{matrix}
  \right)
  \tag{小括号}

{{< /katex >}}


包含省略号和希腊字母


行省略号 `\cdots`，列省略号`\vdots`，斜向省略号（左上至右下）`\ddots`


{{< katex   >}}

 \left\{
 \begin{matrix}
 1      & 2        & \cdots & 5        \\
 6      & 7        & \cdots & 10       \\
 \vdots & \vdots   & \ddots & \vdots   \\
 \alpha & \alpha+1 & \cdots & \alpha+4 
 \end{matrix}
 \right\}

{{< /katex >}}


## 表格


{{< katex   >}}

\begin{array}{|c|c|c|}
	\hline 2&9&4\\
	\hline 7&5&3\\
	\hline 6&1&8\\
	\hline
\end{array}

{{< /katex >}}



{{< katex   >}}

\begin{array}{cc|c}
	       A&B&F\\
	\hline 0&0&0\\
	       0&1&1\\
	       1&0&1\\
	       1&1&1\\
\end{array}

{{< /katex >}}

[参考](https://www.cnblogs.com/Lo3prs/p/14021997.html#)