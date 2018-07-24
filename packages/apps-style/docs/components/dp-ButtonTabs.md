---
title: Button Tabs
---

```html @preview
<button class="dp-ButtonTabs">
  <span class="dp-IconHamburger"></span>
</button>
```

```html @preview
<button class="dp-ButtonTabs is-selected">
  <span class="dp-IconHamburger"></span>
  <span class="dp-IconBadge">1</span>
</button>
```

```html @preview
<button class="dp-ButtonTabs">
  <span class="dp-IconHamburger"></span>
  <span class="dp-IconBadge is-inactive">1</span>
</button>
```

```html @preview
<button class="dp-ButtonTabs">
  <img class="dp-ButtonsImg" src="/apps-style/img/docs/jira-logo.svg" alt="">
  <span class="dp-IconBadge is-inactive">1</span>
</button>
```

# Horizontal panel

```html @preview
<div class="dp-AppTabs is-horizontal">
  <div class="dp-ButtonTabs--wrap">
    <button class="dp-ButtonTabs is-selected">
      <span class="dp-IconHamburger"></span>
      <span class="dp-IconBadge">1</span>
    </button>
    <button class="dp-ButtonTabs">
      <img class="dp-ButtonsImg" src="/apps-style/img/docs/jira-logo.svg" alt="">
      <span class="dp-IconBadge">3</span>
    </button>
    <button class="dp-ButtonTabs">
      <img class="dp-ButtonsImg" src="/apps-style/img/docs/salesforce-logo.svg" alt="">
      <span class="dp-IconBadge">3</span>
    </button>
    <button class="dp-ButtonTabs">
      <img class="dp-ButtonsImg" src="/apps-style/img/docs/shopify-logo.svg" alt="">
      <span class="dp-IconBadge">1</span>
    </button>
    <button class="dp-ButtonTabs">
      <img class="dp-ButtonsImg" src="/apps-style/img/docs/typeform-logo.svg" alt="">
      <span class="dp-IconBadge is-inactive">2</span>
    </button>
    <button class="dp-ButtonTabs">
      <img class="dp-ButtonsImg" src="/apps-style/img/docs/slack-logo.svg" alt="">
      <span class="dp-IconBadge">2</span>
    </button>
  </div>
  <button class="dp-ButtonTabs ButtonTabs-arrow">
    <i class="dp-IconArrow iconArrow--right"></i>
  </button>
</div>
```

# Vertical panel

```html @preview
<div class="dp-AppTabs is-vertical">
  <div class="dp-ButtonTabs--wrap">
    <button class="dp-ButtonTabs ButtonTabs-arrow">
      <i class="dp-IconArrow iconArrow--left"></i>
    </button>
    <button class="dp-ButtonTabs">
      <span class="dp-IconHamburger"></span>
      <span class="dp-IconBadge">1</span>
    </button>
    <button class="dp-ButtonTabs">
      <img class="dp-ButtonsImg" src="/apps-style/img/docs/jira-logo.svg" alt="">
      <span class="dp-IconBadge">3</span>
    </button>
    <button class="dp-ButtonTabs">
      <img class="dp-ButtonsImg" src="/apps-style/img/docs/salesforce-logo.svg" alt="">
      <span class="dp-IconBadge">3</span>
    </button>
    <button class="dp-ButtonTabs">
      <img class="dp-ButtonsImg" src="/apps-style/img/docs/shopify-logo.svg" alt="">
      <span class="dp-IconBadge">1</span>
    </button>
    <button class="dp-ButtonTabs">
      <img class="dp-ButtonsImg" src="/apps-style/img/docs/typeform-logo.svg" alt="">
      <span class="dp-IconBadge is-inactive">2</span>
    </button>
    <button class="dp-ButtonTabs">
      <img class="dp-ButtonsImg" src="/apps-style/img/docs/slack-logo.svg" alt="">
      <span class="dp-IconBadge">2</span>
    </button>
    <button class="dp-ButtonTabs dp-ButtonTabs-borderNone">
      <i class="dp-IconEllipsis"></i>
    </button>
  </div>
</div>
```