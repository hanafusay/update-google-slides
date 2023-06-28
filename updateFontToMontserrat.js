function updateFontToMontserrat() {
  var presentation = SlidesApp.getActivePresentation(); // アクティブなプレゼンテーションを取得
  var slides = presentation.getSlides(); // すべてのスライドを取得

  for (var i = 0; i < slides.length; i++) {
    var slide = slides[i];
    var pageElements = slide.getPageElements(); // スライド上のすべてのページ要素を取得

    for (var j = 0; j < pageElements.length; j++) {
      var pageElement = pageElements[j];

      // ページ要素がテキストボックスまたは図形か確認
      if (pageElement.getPageElementType() == SlidesApp.PageElementType.SHAPE 
        || pageElement.getPageElementType() == SlidesApp.PageElementType.TEXT_BOX 
        || pageElement.getPageElementType() == SlidesApp.PageElementType.TABLE) 
      {
        var textRange;
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
                continue;
              }
            }
          }
        } else {
          textRange = pageElement.asShape().getText(); // テキストを取得
          applyMontserrat(textRange);
        }
      }
    }
  }
}