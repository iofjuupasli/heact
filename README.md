# heact

Wrapper for `React.createElement`.

```js
h('.my-class-name', {
    someProp: 100
}, 'content');
// is the same as
React.createElement('div', {
    className: 'my-class-name',
    someProp: 100
}, 'content');
```

Using namespaces:

```js
import H from 'heact';
const h = H('.namespace');
h('.my-class-name');
```

For further details look at tests.
