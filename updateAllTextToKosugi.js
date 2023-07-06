function updateFontToKosugi() {
  var presentation = SlidesApp.getActivePresentation(); // アクティブなプレゼンテーションを取得
  var slides = presentation.getSlides(); // すべてのスライドを取得

  slides.forEach(function (slide) {
    var pageElements = slide.getPageElements();
    processElementsKosugi(pageElements);
  });
}

function processElementsKosugi(pageElements) {
  pageElements.forEach(function (pageElement) {
    switch (pageElement.getPageElementType()) {
      case SlidesApp.PageElementType.SHAPE:
      case SlidesApp.PageElementType.TEXT_BOX:
        var shape = pageElement.asShape();
        if (shape.getText().asString().trim() !== "") {
          // テキストがあるか確認
          var textRange = shape.getText();
          applyKosugi(textRange);
        }
        break;

      case SlidesApp.PageElementType.TABLE:
        var table = pageElement.asTable();
        var numRows = table.getNumRows();
        var numCols = table.getNumColumns();
        for (var row = 0; row < numRows; row++) {
          for (var col = 0; col < numCols; col++) {
            var cell = table.getCell(row, col);
            if (cell.getText().asString().trim() !== "") {
              // セルにテキストがあるか確認
              var cellText = cell.getText();
              applyKosugi(cellText);
            }
          }
        }
        break;

      case SlidesApp.PageElementType.GROUP:
        var groupElements = pageElement.asGroup().getChildren();
        processElementsKosugi(groupElements);
        break;
    }
  });
}

function applyKosugi(textRange) {
  var runs = textRange.getRuns(); // テキストの各セクションを取得
  for (var i = 0; i < runs.length; i++) {
    var run = runs[i];
    var textStyle = run.getTextStyle();
    var isBold = textStyle.isBold(); // 元のテキストが太字かどうかを取得
    textStyle.setFontFamily("Kosugi");
    textStyle.setBold(isBold); // 元の文字がBoldだった場合、Boldに戻す
  }
}
