---
title: Level - alignment
---

The structure of a level is the following:

<ul>
  <li>dp-Level: main container</li>
  <li style="list-style: none">
    <ul>
      <li>dp-LevelLeft for the left side</li>
      <li>dp-LevelRight for the right side</li>
      <li style="list-style: none">
        <ul>
          <li>dp-LevelItem for each individual element - centered vertically and horizontally </li>
        </ul>
      </li>
      <li>dp-LevelTop for the top side</li>
      <li>dp-LevelBottom for the bottom side</li>
    </ul>
  </li>
</ul>

In a dp-LevelItem, you can then insert almost anything you want: a title, a button, a text input, or just simple text. No matter what elements you put inside a Bulma level, they will always be vertically centered.

# Horizontal
```html @preview
<div class="dp-Level">

  <div class="dp-LevelLeft">
    <button class="dp-Button">dp-LevelLeft</button>
  </div>
  <div class="dp-LevelItem">
    <button class="dp-Button Button--small">dp-LevelItem</button>
  </div>
  <div class="dp-LevelRight">
    <button class="dp-Button">dp-LevelRight</button>
  </div>
</div>
```

# Vertical
```html @preview

<div class="dp-Level">

  <div class="dp-LevelTop">
    <button class="dp-Button Button--small">dp-LevelTop</button>
  </div>
  <div class="dp-LevelItem">
    <button class="dp-Button Button--large">dp-LevelItem</button>
  </div>
  <div class="dp-LevelBottom">
    <button class="dp-Button Button--small">dp-LevelBottom</button>
  </div>
</div>
```