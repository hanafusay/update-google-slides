/**
 * 指定されたページのすべてのテキストを指定されたフォントに変換する
 * フォント名は設定ファイル（fonts.all.family）から取得
 * @param {number} slideNumber - 処理するスライド番号（1から始まる）
 */
function updateAllTextByPage(slideNumber) {
  var presentation = SlidesApp.getActivePresentation(); // プレゼンテーションを取得
  var slide = presentation.getSlides()[slideNumber - 1];
  var pageElements = slide.getPageElements(); // スライド上のすべてのページ要素を取得
  processElementsForAllText(pageElements);
}
