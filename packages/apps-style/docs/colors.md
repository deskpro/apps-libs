---
id: colors
title: Color Palette
sidebar_label: Color Palette
---

# Class Colors

```html @preview
<div class="dp-ColorSwatchGrid">
    <div class="dp-ColorSwatchItem ColorSwatchItem--neutral">
        <span class="ColorSwatchItemTitle">neutral</span>
        <span class="ColorSwatchItemValue"></span>
    </div>

    <div class="dp-ColorSwatchItem ColorSwatchItem--primary">
        <span class="ColorSwatchItemTitle">primary</span>
        <span class="ColorSwatchItemValue"></span>
    </div>

    <div class="dp-ColorSwatchItem ColorSwatchItem--success">
        <span class="ColorSwatchItemTitle">success</span>
        <span class="ColorSwatchItemValue"></span>
    </div>

    <div class="dp-ColorSwatchItem ColorSwatchItem--info">
        <span class="ColorSwatchItemTitle">info</span>
        <span class="ColorSwatchItemValue"></span>
    </div>

    <div class="dp-ColorSwatchItem ColorSwatchItem--warning">
        <span class="ColorSwatchItemTitle">warning</span>
        <span class="ColorSwatchItemValue"></span>
    </div>

    <div class="dp-ColorSwatchItem ColorSwatchItem--danger">
        <span class="ColorSwatchItemTitle">danger</span>
        <span class="ColorSwatchItemValue"></span>
    </div>
</div>
```

# Gray Scale

```html @preview
<div class="dp-ColorSwatchGrid">
    <div class="dp-ColorSwatchItem ColorSwatchItem--gray-100">
        <span class="ColorSwatchItemTitle">gray-100</span>
        <span class="ColorSwatchItemValue"></span>
    </div>

    <div class="dp-ColorSwatchItem ColorSwatchItem--gray-200">
        <span class="ColorSwatchItemTitle">gray-200</span>
        <span class="ColorSwatchItemValue"></span>
    </div>

    <div class="dp-ColorSwatchItem ColorSwatchItem--gray-300">
        <span class="ColorSwatchItemTitle">gray-300</span>
        <span class="ColorSwatchItemValue"></span>
    </div>

    <div class="dp-ColorSwatchItem ColorSwatchItem--gray-400">
        <span class="ColorSwatchItemTitle">gray-400</span>
        <span class="ColorSwatchItemValue"></span>
    </div>

    <div class="dp-ColorSwatchItem ColorSwatchItem--gray-500">
        <span class="ColorSwatchItemTitle">gray-500</span>
        <span class="ColorSwatchItemValue"></span>
    </div>
</div>
```

```html @render
<script>
(function() {
    var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }

    function rgb2hex(rgb) {
        var m = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!m) {
            return m;
        }
        return "#" + hex(m[1]) + hex(m[2]) + hex(m[3]);
    }

    var els = document.getElementsByClassName('dp-ColorSwatchItem');
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var cv = document.defaultView.getComputedStyle(el, null);
        el.getElementsByClassName('ColorSwatchItemValue')[0].innerText = rgb2hex(cv.getPropertyValue('background-color'));
    }
})();
</script>
```
