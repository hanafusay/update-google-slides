function runGetFontName() {
  getFontName(6); // ここで0は最初のスライドを指します。必要に応じて変更してください。
}

function getFontName(slideIndex) {
  var presentation = SlidesApp.getActivePresentation(); // プレゼンテーションを取得
  var slide = presentation.getSlides()[slideIndex]; // 指定されたインデックスのスライドを取得
  var pageElements = slide.getPageElements(); // スライドのすべてのページ要素を取得

  for (var j = 0; j < pageElements.length; j++) {
    var pageElement = pageElements[j];

    if (pageElement.getPageElementType() == SlidesApp.PageElementType.SHAPE 
      || pageElement.getPageElementType() == SlidesApp.PageElementType.TEXT_BOX) {
      var textRange = pageElement.asShape().getText(); // テキストを取得
      var textRuns = textRange.getRuns(); // テキスト範囲内のすべてのテキストラン（同一スタイルの連続したテキスト）を取得

      // 各テキストランのフォントを取得
      for (var k = 0; k < textRuns.length; k++) {
        var textStyle = textRuns[k].getTextStyle(); // テキストランのスタイルを取得
        Logger.log(textStyle.getFontFamily()); // フォント名をログに出力
        Logger.log(textStyle.getFontWeight()); // フォントウェイトをログに出力

      }
    } else {
      Logger.log("指定されたページ要素にテキストは存在しません。");
    }
  }
}



