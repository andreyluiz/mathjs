# Function re

Get the real part of a complex number.
For a complex number `a + bi`, the function returns `a`.

For matrices, the function is evaluated element wise.


## Syntax

```js
math.re(x)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`x` | Number &#124; BigNumber &#124; Complex &#124; Array &#124; Matrix &#124; Boolean |  A complex number or array with complex numbers

### Returns

Type | Description
---- | -----------
Number &#124; BigNumber &#124; Array &#124; Matrix | The real part of x


## Examples

```js
var math = mathjs();

var a = math.complex(2, 3);
math.re(a);                     // returns Number 2
math.im(a);                     // returns Number 3

math.re(math.complex('-5.2i')); // returns Number 0
math.re(math.complex(2.4));     // returns Number 2.4
```


## See also

[im](im.md),
[conj](conj.md),
[abs](abs.md),
[arg](arg.md)


<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->