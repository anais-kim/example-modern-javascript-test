import {onClickAddBookmark} from "./components/books";
import {onKeyPressSearchKeyword, searchBooksWithDefaultKeyword} from "./components/search";
import {onClickRemoveBookmark} from "./components/bookmarks";

window.searchBooksWithDefaultKeyword = searchBooksWithDefaultKeyword;
window.onKeyPressSearchKeyword = onKeyPressSearchKeyword;
window.onClickAddBookmark = onClickAddBookmark;
window.onClickRemoveBookmark = onClickRemoveBookmark;