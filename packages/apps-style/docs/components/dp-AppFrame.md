---
title: App Frame
---

```html @preview
<div class="dp-AppFrame">
    <div class="dp-AppBar dp-Level">
      <div class="dp-LevelLeft">
        <div class="dp-AppBarIcon-wrap">
          <div class="dp-Icon">
            <img src="/apps-style/img/docs/trello-logo.svg" alt="">
          </div>
          <span class="dp-IconBadge is-inactive">3</span>
        </div>
        <span class="dp-AppBarTitle">Trello</span>
      </div>
      <div class="dp-LevelRight">
        <div class="dp-ActionList">
            <a href="" class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
              <i class="dp-RefreshIcon"></i>
            </a>
            <a href="" class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
              <i class="dp-IconArrow iconArrow--top"></i>
            </a>
        </div>
      </div>
    </div>
    <section class="dp-AppBody dp-Section">
      <div class="dp-Level">
        <div class="dp-LevelLeft">
          <span class="dp-AppBodyTitle">Linked cards</span>
        </div>
        <div class="dp-ActionList dp-LevelRight">
          <a href="" class="dp-ActionListItem">
            <i class="dp-IconSearch"></i>
            <span class="dp-ActionListLabel">Find</span>
          </a>
          <a href="" class="dp-ActionListItem">
            <i class="dp-IconPlus"></i>
            <span class="dp-ActionListLabel">Create</span>
          </a>
        </div>
      </div>
      
      <div class="dp-ListItem dp---is-hoverable">
            <div class="dp-ListItemRow">
                <div class="dp-ActionBar dp-Level">
                    <div class="dp-LevelLeft">
                        <i class="dp-Icon"><img src="/apps-style/img/docs/trello-logo.svg"></i>
                        <span class="dp-ActionBarTitle">Blog calender</span>
                    </div>
                
                    <div class="dp-ActionList dp-LevelRight">
                        <div class="dp-ActionListItem">
                            <div class="dp-Menu">
                                <i class="dp-IconSettings"></i>
                                <div class="dp-ActionList dp-ActionList--is-vertical dp---is-hidden">
                                    <a class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
                                        <i class="dp-IconOpen"></i>
                                        <span class="dp-ActionListLabel">Open</span>
                                    </a>
                                    <a class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
                                        <i class="dp-IconUnlink"></i>
                                        <span class="dp-ActionListLabel">Unlink</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dp-ListItemRow">
                <div class="dp-Level">
                    <div class="dp-LevelLeft">
                        <span>Ready</span><span> | </span><span>Linked 12/06/2018</span>
                    </div>
                    <div class="dp-LevelRight">
                        <i class="dp-Icon dp-Icon--Round">
                          <img src="/apps-style/img/docs/AppBodyIcon.jpg" alt="">
                        </i>
                    </div> 
                </div>
            </div>
        </div>
      <div class="dp-ListItem dp---is-hoverable">
            <div class="dp-ListItemRow">
                <div class="dp-ActionBar dp-Level">
                    <div class="dp-LevelLeft">
                        <i class="dp-Icon"><img src="/apps-style/img/docs/trello-logo.svg" alt=""></i>
                        <span class="dp-ActionBarTitle">Blog calender</span>
                    </div>
                
                    <div class="dp-ActionList dp-LevelRight">
                        <div class="dp-ActionListItem">
                            <div class="dp-Menu">
                                <i class="dp-IconSettings"></i>
                                <div class="dp-ActionList dp-ActionList--is-vertical dp---is-hidden">
                                    <a class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
                                        <i class="dp-IconOpen"></i>
                                        <span class="dp-ActionListLabel">Open</span>
                                    </a>
                                    <a class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
                                        <i class="dp-IconUnlink"></i>
                                        <span class="dp-ActionListLabel">Unlink</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dp-ListItemRow">
                <div class="dp-Level">
                    <div class="dp-LevelLeft">
                        <span>Ready</span><span> | </span><span>Linked 12/06/2018</span>
                    </div>
                    <div class="dp-LevelRight">
                        <i class="dp-Icon dp-Icon--Round">
                          <img src="/apps-style/img/docs/AppBodyIcon.jpg" alt="">
                        </i>
                    </div>
                </div>
            </div>
        </div>  
    </section>

</div>
```

# Inactive
Need add class "is-inactive" for dp-AppFrame
```html @preview
<div class="dp-AppFrame is-inactive">
  <div class="dp-AppBar dp-Level">
    <div class="dp-LevelLeft">
      <div class="dp-AppBarIcon-wrap">
        <div class="dp-Icon">
          <img src="/apps-style/img/docs/trello-logo.svg" alt="">
        </div>
        <span class="dp-IconBadge is-inactive">3</span>
      </div>
      <span class="dp-AppBarTitle">Trello</span>
    </div>
    <div class="dp-LevelRight">
      <div class="dp-ActionList">
          <a href="" class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
            <i class="dp-RefreshIcon"></i>
          </a>
          <a href="" class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
            <i class="dp-IconArrow iconArrow--top"></i>
          </a>
      </div>
    </div>
  </div>
  <section class="dp-AppBody dp-Section">
    <div class="dp-Level">
      <div class="dp-LevelLeft">
        <span class="dp-AppBodyTitle">Linked cards</span>
      </div>
      <div class="dp-ActionList dp-LevelRight">
        <a href="" class="dp-ActionListItem">
          <i class="dp-IconSearch"></i>
          <span class="dp-ActionListLabel">Find</span>
        </a>
        <a href="" class="dp-ActionListItem">
          <i class="dp-IconPlus"></i>
          <span class="dp-ActionListLabel">Create</span>
        </a>
      </div>
    </div>
  </section>
</div>
```
# Collapsed
Need add class "is-colapsed" for dp-AppFrame
```html @preview
<div class="dp-AppFrame is-colapsed">
  <div class="dp-AppBar dp-Level">
    <div class="dp-LevelLeft">
      <div class="dp-AppBarIcon-wrap">
        <div class="dp-Icon">
          <img src="/apps-style/img/docs/trello-logo.svg" alt="">
        </div>
        <span class="dp-IconBadge is-inactive">3</span>
      </div>
      <span class="dp-AppBarTitle">Trello</span>
    </div>
    <div class="dp-LevelRight">
      <div class="dp-ActionList">
          <a href="" class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
            <i class="dp-RefreshIcon"></i>
          </a>
          <a href="" class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
            <i class="dp-IconArrow iconArrow--top"></i>
          </a>
      </div>
    </div>
  </div>
  <section class="dp-AppBody dp-Section">
        <div class="dp-Level">
          <div class="dp-LevelLeft">
            <span class="dp-AppBodyTitle">Linked cards</span>
          </div>
          <div class="dp-ActionList dp-LevelRight">
            <a href="" class="dp-ActionListItem">
              <i class="dp-IconSearch"></i>
              <span class="dp-ActionListLabel">Find</span>
            </a>
            <a href="" class="dp-ActionListItem">
              <i class="dp-IconPlus"></i>
              <span class="dp-ActionListLabel">Create</span>
            </a>
          </div>
        </div>
        
        <div class="dp-ListItem dp---is-hoverable">
              <div class="dp-ListItemRow">
                  <div class="dp-ActionBar dp-Level">
                      <div class="dp-LevelLeft">
                          <i class="dp-Icon"><img src="/apps-style/img/docs/trello-logo.svg"></i>
                          <span class="dp-ActionBarTitle">Blog calender</span>
                      </div>
                  
                      <div class="dp-ActionList dp-LevelRight">
                          <div class="dp-ActionListItem">
                              <div class="dp-Menu">
                                  <i class="dp-IconSettings"></i>
                                  <div class="dp-ActionList dp-ActionList--is-vertical dp---is-hidden">
                                      <a class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
                                          <i class="dp-IconOpen"></i>
                                          <span class="dp-ActionListLabel">Open</span>
                                      </a>
                                      <a class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
                                          <i class="dp-IconUnlink"></i>
                                          <span class="dp-ActionListLabel">Unlink</span>
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="dp-ListItemRow">
                  <div class="dp-Level">
                      <div class="dp-LevelLeft">
                          <span>Ready</span><span> | </span><span>Linked 12/06/2018</span>
                      </div>
                      <div class="dp-LevelRight">
                          <i class="dp-Icon dp-Icon--Round">
                            <img src="/apps-style/img/docs/AppBodyIcon.jpg" alt="">
                          </i>
                      </div> 
                  </div>
              </div>
          </div>
          
        <div class="dp-ListItem dp---is-hoverable">
              <div class="dp-ListItemRow">
                  <div class="dp-ActionBar dp-Level">
                      <div class="dp-LevelLeft">
                          <i class="dp-Icon"><img src="/apps-style/img/docs/trello-logo.svg" alt=""></i>
                          <span class="dp-ActionBarTitle">Blog calender</span>
                      </div>
                  
                      <div class="dp-ActionList dp-LevelRight">
                          <div class="dp-ActionListItem">
                              <div class="dp-Menu">
                                  <i class="dp-IconSettings"></i>
                                  <div class="dp-ActionList dp-ActionList--is-vertical dp---is-hidden">
                                      <a class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
                                          <i class="dp-IconOpen"></i>
                                          <span class="dp-ActionListLabel">Open</span>
                                      </a>
                                      <a class="dp-ActionListItem dp-ActionListIcon dp---is-hoverable">
                                          <i class="dp-IconUnlink"></i>
                                          <span class="dp-ActionListLabel">Unlink</span>
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="dp-ListItemRow">
                  <div class="dp-Level">
                      <div class="dp-LevelLeft">
                          <span>Ready</span><span> | </span><span>Linked 12/06/2018</span>
                      </div>
                      <div class="dp-LevelRight">
                          <i class="dp-Icon dp-Icon--Round">
                            <img src="/apps-style/img/docs/AppBodyIcon.jpg" alt="">
                          </i>
                      </div>
                  </div>
              </div>
          </div>  
      </section>
</div>
```


# Add App
```html @preview
<div class="dp-AddApp">
  <div class="dp-Level">
    <a href="" class="dp-LevelLeft">
      <i class="dp-IconPlus"></i>
      <span class="dp-AddApp-text">Add an app</span>
    </a>
    <a href="" class="dp-LevelRight">
      <i class="dp-IconClose"></i>
    </a>
  </div>
</div>
```
