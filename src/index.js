import {onClickAddBookmark} from "./components/Books";
import {onKeyPressSearchKeyword,
               searchBooks as onLoadBody} from "./components/Search";
import {onClickRemoveBookmark} from "./components/Bookmarks";

window.onLoadBody = onLoadBody;
window.onKeyPressSearchKeyword = onKeyPressSearchKeyword;
window.onClickAddBookmark = onClickAddBookmark;
window.onClickRemoveBookmark = onClickRemoveBookmark;