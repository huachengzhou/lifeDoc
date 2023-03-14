---
title: "python math"
date: 2021-04-15
draft: false
weight: 19
---


## math

### math 模块常量

| 常量 | 描述 |
| --- | --- |
| math.e | 返回欧拉数 (2.7182...) |
| math.inf | 返回正无穷大浮点数 |
| math.nan | 返回一个浮点值 NaN (not a number) |
| math.pi | π 一般指圆周率。 圆周率 PI (3.1415...) |
| math.tau | 数学常数 τ = 6.283185...，精确到可用精度。Tau 是一个圆周常数，等于 2π，圆的周长与半径之比。 |



### math 模块方法

| 方法 | 描述 |
| --- | --- |
| math.acos(x) | 返回 x 的反余弦，结果范围在 0 到 pi 之间。 |
| math.acosh(x) | 返回 x 的反双曲余弦值。 |
| math.asin(x) | 返回 x 的反正弦值，结果范围在 -pi/2 到 pi/2 之间。 |
| math.asinh(x) | 返回 x 的反双曲正弦值。 |
| math.atan(x) | 返回 x 的反正切值，结果范围在 -pi/2 到 pi/2 之间。 |
| math.atan2(y, x) | 返回给定的 X 及 Y 坐标值的反正切值，结果是在 -pi 和 pi 之间。 |
| math.atanh(x) | 返回 x 的反双曲正切值。 |
| math.ceil(x) | 将 x 向上舍入到最接近的整数 |
| math.comb(n, k) | 返回不重复且无顺序地从 n 项中选择 k 项的方式总数。 |
| math.copysign(x, y) | 返回一个基于 x 的绝对值和 y 的符号的浮点数。 |
| math.cos() | 返回 x 弧度的余弦值。 |
| math.cosh(x) | 返回 x 的双曲余弦值。 |
| math.degrees(x) | 将角度 x 从弧度转换为度数。 |
| math.dist(p, q) | 返回 p 与 q 两点之间的欧几里得距离，以一个坐标序列（或可迭代对象）的形式给出。 两个点必须具有相同的维度。 |
| math.erf(x) | 返回一个数的误差函数 |
| math.erfc(x) | 返回 x 处的互补误差函数 |
| math.exp(x) | 返回 e 的 x 次幂，Ex， 其中 e = 2.718281... 是自然对数的基数。 |
| math.expm1() | 返回 Ex - 1， e 的 x 次幂，Ex，其中 e = 2.718281... 是自然对数的基数。这通常比 math.e ** x 或 pow(math.e, x) 更精确。 |
| math.fabs(x) | 返回 x 的绝对值。 |
| math.factorial(x) | 返回 x 的阶乘。 如果 x 不是整数或为负数时则将引发 ValueError。 |
| math.floor() | 将数字向下舍入到最接近的整数 |
| math.fmod(x, y) | 返回 x/y 的余数 |
| math.frexp(x) | 以 (m, e) 对的形式返回 x 的尾数和指数。 m 是一个浮点数， e 是一个整数，正好是 x == m * 2**e 。 如果 x 为零，则返回 (0.0, 0) ，否则返回 0.5 <= abs(m) < 1 。 |
| math.fsum(iterable) | 返回可迭代对象 (元组, 数组, 列表, 等)中的元素总和，是浮点值。 |
| math.gamma(x) | 返回 x 处的伽马函数值。 |
| math.gcd() | 返回给定的整数参数的最大公约数。 |
| math.hypot() | 返回欧几里得范数，sqrt(sum(x**2 for x in coordinates))。 这是从原点到坐标给定点的向量长度。 |
| math.isclose(a,b) | 检查两个值是否彼此接近，若 a 和 b 的值比较接近则返回 True，否则返回 False。。 |
| math.isfinite(x) | 判断 x 是否有限，如果 x 既不是无穷大也不是 NaN，则返回 True ，否则返回 False 。 |
| math.isinf(x) | 判断 x 是否是无穷大，如果 x 是正或负无穷大，则返回 True ，否则返回 False 。 |
| math.isnan() | 判断数字是否为 NaN，如果 x 是 NaN（不是数字），则返回 True ，否则返回 False 。 |
| math.isqrt() | 将平方根数向下舍入到最接近的整数 |
| math.ldexp(x, i) | 返回 x * (2**i) 。 这基本上是函数 math.frexp() 的反函数。 |
| math.lgamma() | 返回伽玛函数在 x 绝对值的自然对数。 |
| math.log(x[, base]) | 使用一个参数，返回 x 的自然对数（底为 e ）。 |
| math.log10(x) | 返回 x 底为 10 的对数。 |
| math.log1p(x) | 返回 1+x 的自然对数（以 e 为底）。 |
| math.log2(x) | 返回 x 以 2 为底的对数 |
| math.perm(n, k=None) | 返回不重复且有顺序地从 n 项中选择 k 项的方式总数。 |
| math.pow(x, y) | 将返回 x 的 y 次幂。 |
| math.prod(iterable) | 计算可迭代对象中所有元素的积。 |
| math.radians(x) | 将角度 x 从度数转换为弧度。 |
| math.remainder(x, y) | 返回 IEEE 754 风格的 x 除于 y 的余数。 |
| math.sin(x) | 返回 x 弧度的正弦值。 |
| math.sinh(x) | 返回 x 的双曲正弦值。 |
| math.sqrt(x) | 返回 x 的平方根。 |
| math.tan(x) | 返回 x 弧度的正切值。 |
| math.tanh(x) | 返回 x 的双曲正切值。 |
| math.trunc(x) | 返回 x 截断整数的部分，即返回整数部分，删除小数部分 |


+ 平方根例子

```python
print(math.pow(3,2)+math.pow(4,2))
print(math.pow(math.pow(3,2)+math.pow(4,2),0.5))
print(math.sqrt(math.pow(3,2)+math.pow(4,2)))
```


## statistics --- 数学统计函数

| 方法 | 描述 |
| --- | --- |
| statistics.harmonic_mean() | 计算给定数据的调和平均值（中心位置） |
| statistics.mean() | 计算给定数据的平均值（平均值） |
| statistics.median() | 计算给定数据的中位数（中间值） |
| statistics.median_grouped() | 计算分组连续数据的中位数 |
| statistics.median_high() | 计算给定数据的高中位数 |
| statistics.median_low() | 计算给定数据的低中位数 |
| statistics.mode() | 计算给定数值或名义数据的众数（集中趋势） |
| statistics.pstdev() | 计算整个总体的标准差 |
| statistics.stdev() | 计算数据样本的标准差 |
| statistics.pvariance() | 计算整个总体的方差 |
| statistics.variance() | 根据数据样本计算方差 |



