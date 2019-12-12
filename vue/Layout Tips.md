# Layout Tips



## Frozee body scroll

1. install `body-scroll-lock`

```bash
npm install body-scroll-lock
```

2. Froze under App.vue

```javascript
import {disableBodyScroll,enableBodyScroll} from 'body-scroll-lock';
...


created() {	
    const targetElement = document.querySelector("body")
			disableBodyScroll(targetElement,{
				allowTouchMove: el => {
					while (el && el !== document.body) {
						if (el.getAttribute('body-scroll-lock-ignore') !== null) {
							return true
						}
						el = el.parentNode
					}
				},
			})
  },
```



## Forze scale

