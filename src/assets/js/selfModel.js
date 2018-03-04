export default {
    data() {
        return {
            x: null,
            y: null
        }
    },
    methods: {
        setPosition(e, dom, type) {
            let left = e.clientX;
            let top = e.clientY;
            // console.log(e);

            dom.style.position = 'absolute';
            dom.style.left = left + 'px';
            dom.style.top = top + 'px';
            dom.style.right = 'inherit';
            dom.style.bottom = 'inherit';

            let height = 0;
            const width = 262;
            // console.log(111, type)
            if (type == 1) {
                height = 287
            }
            if (type == 2) {
                height = 247
            }
            if (type == 3 || type == 4) {
                height = 128
            }
            if (type == 'new') {
                height = 247
            }

            if (document.documentElement.clientHeight - top < height + 50) {
                this.y = true;
            } else {
                this.y = false;
            }
            if (document.documentElement.clientWidth - left < width) {
                this.x = true;
            } else {
                this.x = false;
            }

            if (this.y == true && this.x == false) {
                let result = height - (document.documentElement.clientHeight - top);
                // this.y = -result - 100;
                this.$Baidu.panBy(0, -result - 100);

                let x = setTimeout(function() {
                    dom.style.top = top - (result + 100) + 'px';
                    clearTimeout(x);
                }, 200)
            }
            if (this.x == true && this.y == false) {
                let result = width - (document.documentElement.clientWidth - left);
                this.$Baidu.panBy(-result - 100, 0);

                let y = setTimeout(function() {
                    dom.style.left = left - (result + 100) + 'px';
                    // dom.style.top = top - (result + 100) + 'px';
                    clearTimeout(y);
                }, 200)
            }
            if (this.x == true && this.y == true) {
                let x1 = width - (document.documentElement.clientWidth - left);
                let x2 = height - (document.documentElement.clientHeight - top);
                this.$Baidu.panBy(-x1 - 100, -x2 - 100);

                let z = setTimeout(function() {
                    dom.style.left = left - (x1 + 100) + 'px';
                    dom.style.top = top - (x2 + 100) + 'px';
                    clearTimeout(z);
                }, 200)
            }
        },
    }
}
