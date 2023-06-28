function updateFontToMontserratByPage(slideNumber) {
  //console.log(slideNumber);
  var presentation = SlidesApp.getActivePresentation(); // プレゼンテーションを取得
  var slide = presentation.getSlides()[slideNumber - 1];
  var pageElements = slide.getPageElements(); // スライド上のすべてのページ要素を取得

  for (var j = 0; j < pageElements.length; j++) {
    var pageElement = pageElements[j];

    // ページ要素がテキストボックスまたは図形か確認
    if (
      pageElement.getPageElementType() == SlidesApp.PageElementType.SHAPE ||
      pageElement.getPageElementType() == SlidesApp.PageElementType.TEXT_BOX ||
      pageElement.getPageElementType() == SlidesApp.PageElementType.TABLE
    ) {
      var textRange;
      //console.log("オブジェクトのタイプ: " + pageElement.getPageElementType());

      if (pageElement.getPageElementType() == SlidesApp.PageElementType.TABLE) {
        var numRows = pageElement.asTable().getNumRows();
        var numCols = pageElement.asTable().getNumColumns();
        for (var row = 0; row < numRows; row++) {
          for (var col = 0; col < numCols; col++) {
            try {
              textRange = pageElement.asTable().getCell(row, col).getText();
              applyMontserrat(textRange);
            } catch (error) {
              // エラーを無視し、次のセルに移動
              //console.log("表オブジェクトでエラーが発生しました: ", error);
              //console.log("エラーが発生した表の行: " + row + ", 列: " + col);
              continue;
            }
          }
        }
      } else {
        try {
          textRange = pageElement.asShape().getText(); // テキストを取得
          applyMontserrat(textRange);
        } catch (error) {
          // エラーを無視し、次の要素に移動
          //console.log("表以外のオブジェクトでエラーが発生しました: ", error);
          //console.log("エラーが発生したオブジェクトのタイプ: " + pageElement.getPageElementType());
          continue;
        }
      }
    }
  }
}
