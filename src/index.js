import {onClickAddBookmark} from "./components/books";
import {onKeyPressSearchKeyword,
               searchBooks as onLoadBody} from "./components/search";
import {onClickRemoveBookmark} from "./components/bookmarks";

window.onLoadBody = onLoadBody;
window.onKeyPressSearchKeyword = onKeyPressSearchKeyword;
window.onClickAddBookmark = onClickAddBookmark;
window.onClickRemoveBookmark = onClickRemoveBookmark;