/**
 * すべてのスライドの英数字と一部の記号を指定されたフォントに変換する
 * フォント設定は設定ファイル（fonts.english）から取得
 */
function updateEnglishText() {
  var presentation = SlidesApp.getActivePresentation(); // アクティブなプレゼンテーションを取得
  var slides = presentation.getSlides(); // すべてのスライドを取得

  for (var i = 0; i < slides.length; i++) {
    var slide = slides[i];
    var pageElements = slide.getPageElements(); // スライド上のすべてのページ要素を取得
    processElements(pageElements);
  }
}
