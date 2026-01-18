/**
 * 指定されたページの英数字と一部の記号を指定されたフォントに変換する
 * フォント設定は設定ファイル（fonts.english）から取得
 * @param {number} slideNumber - 処理するスライド番号（1から始まる）
 */
function updateEnglishTextByPage(slideNumber) {
  var presentation = SlidesApp.getActivePresentation(); // プレゼンテーションを取得
  var slide = presentation.getSlides()[slideNumber - 1];
  var pageElements = slide.getPageElements(); // スライド上のすべてのページ要素を取得
  processElements(pageElements);
}
