// Inital method to call to apply PanZoom to elements given a selector
function PanZoom (selector, opts) {
    const panZoomEles = [];
    opts = opts || {};
    const minScale = (opts.minScale ? opts.minScale : 0.1);
    const maxScale = (opts.maxScale ? opts.maxScale : 5);
    const increment = (opts.increment ? opts.increment : 0.05);
    const liner = (opts.liner ? opts.liner : false);
    document.querySelectorAll(selector).forEach(function (ele) {
        panZoomEles.push(new AttachPanZoom(ele, minScale, maxScale, increment, liner));
    });
    if (panZoomEles.length === 1) { return panZoomEles[0]; }
    return panZoomEles;
}

// Appy PanZoom functionality to a given element, allow user defined zoom min and inc per scroll
function AttachPanZoom (ele, minScale, maxScale, increment, liner) {
    this.increment = increment;
    this.minScale = minScale;
    this.maxScale = maxScale;
    this.liner = liner;
    this.panning = false;
    this.oldX = this.oldY = 0;
    const self = this;
    ele.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';

    // Gets the current Scale, along with transX and transY
    this.getTransformMatrix = function () {
        const trans = ele.style.transform;
        const start = trans.indexOf('(') + 1;
        const end = trans.indexOf(')');
        const matrix = trans.slice(start, end).split(',');
        return {
            scale: +matrix[0],
            transX: +matrix[4],
            transY: +matrix[5]
        };
    };

    // Given the scale, translateX and translateY apply to CSSS transform
    this.setTransformMatrix = function (o) {
        ele.style.transform = 'matrix(' + o.scale + ', 0, 0, ' + o.scale + ', ' + o.transX + ', ' + o.transY + ')';
    };

    this.applyTranslate = function (dx, dy) {
        const newTrans = this.getTransformMatrix();
        newTrans.transX += dx;
        newTrans.transY += dy;
        this.setTransformMatrix(newTrans);
    };

    // Applying Deltas to Scale and Translate transformations
    this.applyScale = function (dscale, x, y) {
        const newTrans = this.getTransformMatrix();
        const tranX = x - (ele.width / 2);
        const tranY = y - (ele.height / 2);
        dscale = (this.liner ? dscale : dscale * (newTrans.scale)); // scale either liner or non-liner
        newTrans.scale += dscale;
        const maxOrMinScale = (newTrans.scale <= this.minScale || newTrans.scale >= this.maxScale);
        if (newTrans.scale < this.minScale) newTrans.scale = this.minScale;
        if (newTrans.scale > this.maxScale) newTrans.scale = this.maxScale;
        if (!maxOrMinScale) {
            this.applyTranslate(tranX, tranY);
            this.setTransformMatrix(newTrans);
            this.applyTranslate(-(tranX * dscale), -(tranY * dscale));
        }
    };

    // Capture when the mouse is down on the element or not
    ele.addEventListener('mousedown', function (e) {
        e.preventDefault();
        this.panning = true;
        this.oldX = e.clientX;
        this.oldY = e.clientY;
    });

    ele.addEventListener('mouseup', function (e) { this.panning = false; });
    ele.addEventListener('mouseleave', function (e) { this.panning = false; });

    ele.addEventListener('mousemove', function (e) {
        if (this.panning) {
            const deltaX = e.clientX - this.oldX;
            const deltaY = e.clientY - this.oldY;
            self.applyTranslate(deltaX, deltaY);
            this.oldX = e.clientX;
            this.oldY = e.clientY;
        }
    });

    this.getScrollDirection = function (e) {
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (delta < 0) { self.applyScale(-self.increment, e.offsetX, e.offsetY); } else { self.applyScale(self.increment, e.offsetX, e.offsetY); }
    };

    ele.addEventListener('DOMMouseScroll', this.getScrollDirection, false);
    ele.addEventListener('mousewheel', this.getScrollDirection, false);
}

export default PanZoom;
