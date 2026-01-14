function updateFontToMontserratByPage(slideNumber) {
  var presentation = SlidesApp.getActivePresentation(); // プレゼンテーションを取得
  var slide = presentation.getSlides()[slideNumber - 1];
  var pageElements = slide.getPageElements(); // スライド上のすべてのページ要素を取得
  processElements(pageElements);
}
