---
title: "KaTeX 使用指南"
date: 2021-10-17
draft: false
bookToc: false
bookFlatSection: true
---

# 网络数学排版库

> KaTeX快捷代码可以让您在markdown文档中呈现数学排版。参见[KaTeX](https://katex.org/)
  

{{<katex display>}}


f(n)=\begin{cases} 1 & n = 1 \cr \sum_{i=1}^{n-1} f(i) & \text{Otherwise.}\end{cases}

f(n)=\begin{dcases} 1 & n = 1 \cr \sum_{i=1}^{n-1} f(i) & \text{Otherwise.}\end{dcases}

{{</katex>}}

## 简单的 API，没有依赖性——但在所有主流浏览器上都非常快。
* 快速： KaTeX 同步呈现它的数学并且不需要重排页面。
* 打印质量： KaTeX 的布局基于 Donald Knuth 的 TeX，这是数学排版的黄金标准。
* 自包含： KaTeX 没有依赖性，可以很容易地与您的网站资源捆绑在一起。
* 服务器端渲染：无论浏览器或环境如何，KaTeX 都会产生相同的输出，因此您可以使用 Node.js 预渲染表达式并将它们作为纯 HTML 发送。


## 例子

+ code 

```latex
{{</* katex display  */>}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{</* /katex */>}}
```

+ 展示

{{< katex display  >}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{< /katex >}}

+ 矩阵

{{< katex display >}}
 \left(
 \begin{matrix}
   1 & 2 & 3 \\
   4 & 5 & 6 \\
   7 & 8 & 9
  \end{matrix}
  \right)
  \tag{小括号}
{{< /katex >}}


## 括号/上下箭头

{{< katex display >}}
\lparen\rparen \lbrack\rbrack \lbrace\rbrace \langle\rangle \vert\vert \Vert\Vert \lVert\rVert

{{< /katex >}}


## 矩阵类

{{< katex display >}}
\begin{matrix}
   a & b \cr
   c & d
\end{matrix}
{{< /katex >}}


## 排板类


{{< katex display >}}
\begin{aligned}
   a&=b+c \cr
   d+e&=f
\end{aligned}

\begin{gathered}
   a=b \cr
   e=b+c
\end{gathered}

\begin{alignedat}{2}
   10&x+ &3&y = 2 \cr
   3&x+&13&y = 4
\end{alignedat}
{{< /katex >}}


## 情况分类

{{< katex display >}}
x = \begin{cases}
   a &\text{if } b \cr
   c &\text{if } d
\end{cases}
{{< /katex >}}



## 数组

{{< katex display >}}
\begin{array}{cc}
   a & b \cr
   c & d
\end{array}

\def\arraystretch{1.5}
   \begin{array}{c:c|c}
   a & b & c \cr \hline
   d & e & f \cr
   \hdashline
   g & h & i
\end{array}
{{< /katex >}}



## 希腊字母


{{< katex display >}}
\alpha                   \Alpha     A          
\beta                    \Beta      B          
\gamma                   \Gamma     \varGamma  
\delta                   \Delta     \varDelta  
\epsilon    \varepsilon  \Epsilon   E          
\zeta                    \Zeta      Z          
\eta                     \Eta       E          
\theta      \vartheta    \Theta     \varTheta  
\iota                    \Iota      I          
\kappa      \varkappa    \Kappa     K          
\lambda                  \Lambda    \varLambda 
\mu                      \Mu        M          
\nu                      \Nu        N          
\xi                      \Xi        \varXi     
\omicron                 \Omicron   O          
\pi         \varpi       \Pi        \varPi     
\rho        \varrho      \Rho       P          
\sigma      \varsigma    \Sigma     \varSigma  
\tau                     \Tau       T          
\upsilon                 \Upsilon   \varUpsilon
\phi        \varphi      \Phi       \varPhi    
\chi                     \Chi       X          
\psi                     \Psi       \varPsi    
\omega                   \Omega     \varOmega  
\thetasym   \digamma
{{< /katex >}}


## 其他字母

{{< katex display >}}

\imath \jmath \aleph \alef \alefsym \beth \gimel \daleth 

\eth \nabla \partial \Game \Finv \ell \hbar \hslash 


{{< /katex >}}


## 标准函数

### 指数

{{< katex display >}}

\exp_a b = a^b, \exp b = e^b, 10^m


{{< /katex >}}


### 对数

{{< katex display >}}

\ln c, \lg d = \log e, \log_{10} f


{{< /katex >}}


### 三角函数

{{< katex display >}}

\sin a, \cos b, \tan c, \cot d, \sec e, \csc f


{{< /katex >}}



### 微分及导数

{{< katex display >}}
dt, \mathrm{d}t, \partial t, \nabla\psi
{{< /katex >}}


{{< katex display >}}
dy/dx, \mathrm{d}y/\mathrm{d}x, \frac{dy}{dx}, \frac{\mathrm{d}y}{\mathrm{d}x}, \frac{\partial^2}{\partial x_1\partial x_2}y
{{< /katex >}}


{{< katex display >}}
\prime, \backprime, f^\prime, f', f'', f^{(3)}, \dot y, \ddot y
{{< /katex >}}