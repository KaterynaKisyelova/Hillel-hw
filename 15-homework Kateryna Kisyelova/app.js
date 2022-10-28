const tabsEl = document.querySelector("#tabs");

class Tabs {
  static CLASS_TAB = "tab";
  static CLASS_BODY = "body";
  static CLASS_ACTIVE_TAB = "active-tab";
  static CLASS_OPENED = "opened";

  constructor(tabsEl) {
    this.tabsEl = tabsEl;
    this.tabs = Array.from(this.tabsEl.children[0].children);
    this.contents = Array.from(this.tabsEl.children[1].children);
    this.activeIndex = 0;

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
    this.tabs[this.activeIndex].classList.add(Tabs.CLASS_ACTIVE_TAB);
  }

  isTab(target) {
    return target.classList.contains(Tabs.CLASS_TAB);
  }

  changeContent(index) {
    if (index !== Tabs.activeIndex) {
      this.hideInactiveContent();
      this.activeIndex = index;
      this.showActiveContent();
    }
  }

  hideInactiveContent() {
    this.contents[this.activeIndex].classList.remove(Tabs.CLASS_OPENED);
    this.tabs[this.activeIndex].classList.remove(Tabs.CLASS_ACTIVE_TAB);
  }

  showActiveContent() {
    this.contents[this.activeIndex].classList.add(Tabs.CLASS_OPENED);
    this.tabs[this.activeIndex].classList.add(Tabs.CLASS_ACTIVE_TAB);
  }
}

new Tabs(tabsEl);
