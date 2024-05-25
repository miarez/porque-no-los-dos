class MapBuilder {

    static extractMapFromCanvas(canvas, context) {
        let map = [];
        let res = 10;

        for (let y = 0; y < canvas.height; y += res) {
            for (let x = 0; x < canvas.width; x += res) {
                const pixel = context.getImageData(x, y, 1, 1).data;
                const [r, g, b, a] = pixel;

                let cell = {
                    x: x,
                    y: y,
                    color: `rgba(${r},${g},${b},${a / 255})`
                };
                map.push(cell);
            }
        }

        return map;
    }

    static from_html(element) {
        return new Promise((resolve, reject) => {
            html2canvas(element, {
                onrendered: function(canvas) {
                    const context = canvas.getContext('2d');
                    const map = MapBuilder.extractMapFromCanvas(canvas, context);
                    resolve(map);
                },
                onerror: function(error) {
                    reject(error);
                }
            });
        });
    }

    static from_svg(element) {
        return new Promise((resolve, reject) => {
            const svgString = new XMLSerializer().serializeToString(element);
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svg);

            const image = new Image();
            image.onload = function () {
                // Use the original SVG dimensions
                const width = element.width.baseVal.value || image.width;
                const height = element.height.baseVal.value || image.height;
                
                canvas.width = width;
                canvas.height = height;
                context.drawImage(image, 0, 0, width, height);

                const map = MapBuilder.extractMapFromCanvas(canvas, context);
                URL.revokeObjectURL(url);
                resolve(map);
            };

            image.onerror = function (error) {
                URL.revokeObjectURL(url);
                reject(error);
            };

            image.src = url;
        });
    }

    static build(element) {
        const tagName = element.tagName.toLowerCase();
        if (tagName === 'svg') {
            cs('from svg....')
            return MapBuilder.from_svg(element);
        } else {
            return MapBuilder.from_html(element);
        }
    }
}
