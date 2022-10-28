const tabsEl = document.querySelector("#tabs");

class Tabs {
  static CLASS_TAB = "tab";
  static CLASS_BODY = "body";
  static CLASS_ACTIVE_TAB = "active-tab";
  static CLASS_OPENED = "opened";
  static activeIndex = 0;

  constructor(tabsEl) {
    this.tabsEl = tabsEl;
    this.tabs = Array.from(this.tabsEl.children[0].children);
    this.contents = Array.from(this.tabsEl.children[1].children);

    for (const tab of this.tabs) {
      tab.classList.add(Tabs.CLASS_TAB);
    }

    for (const content of this.contents) {
      content.classList.add(Tabs.CLASS_BODY);
    }

    this.showActiveContent();

    this.tabsEl.addEventListener("click", this.onTabsElClick.bind(this));
  }

  onTabsElClick(e) {
    if (this.isTab(e.target)) {
      const newIndex = this.tabs.indexOf(e.target);

      this.changeContent(newIndex);
    }
  }

  activateTab() {
    this.tabs[Tabs.activeIndex].classList.add(Tabs.CLASS_ACTIVE_TAB);
  }

  isTab(target) {
    return target.classList.contains(Tabs.CLASS_TAB);
  }

  changeContent(index) {
    if (index !== Tabs.activeIndex) {
      this.hideInactiveContent();
      Tabs.activeIndex = index;
      this.showActiveContent();
    }
  }

  hideInactiveContent() {
    this.contents[Tabs.activeIndex].classList.remove(Tabs.CLASS_OPENED);
    this.tabs[Tabs.activeIndex].classList.remove(Tabs.CLASS_ACTIVE_TAB);
  }

  showActiveContent() {
    this.contents[Tabs.activeIndex].classList.add(Tabs.CLASS_OPENED);
    this.tabs[Tabs.activeIndex].classList.add(Tabs.CLASS_ACTIVE_TAB);
  }
}

new Tabs(tabsEl);
