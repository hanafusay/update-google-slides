/**
 * すべてのテキストを指定されたフォントに変換する
 * フォント名は設定ファイル（fonts.all.family）から取得
 */
function updateAllText() {
  var presentation = SlidesApp.getActivePresentation(); // アクティブなプレゼンテーションを取得
  var slides = presentation.getSlides(); // すべてのスライドを取得

  for (var i = 0; i < slides.length; i++) {
    var slide = slides[i];
    var pageElements = slide.getPageElements(); // スライド上のすべてのページ要素を取得
    processElementsForAllText(pageElements);
  }
}

function processElementsForAllText(pageElements) {
  pageElements.forEach(function (pageElement) {
    switch (pageElement.getPageElementType()) {
      case SlidesApp.PageElementType.SHAPE:
      case SlidesApp.PageElementType.TEXT_BOX:
        var shape = pageElement.asShape();
        if (shape.getText().asString().trim() !== "") {
          // テキストがあるか確認
          var textRange = shape.getText();
          applyAllTextFont(textRange);
        }
        break;

      case SlidesApp.PageElementType.TABLE:
        var table = pageElement.asTable();
        var numRows = table.getNumRows();
        var numCols = table.getNumColumns();
        for (var row = 0; row < numRows; row++) {
          for (var col = 0; col < numCols; col++) {
            try {
              var cell = table.getCell(row, col);
              var cellText = cell.getText();
              if (cellText.asString().trim() !== "") {
                // セルにテキストがあるか確認
                applyAllTextFont(cellText);
              }
            } catch (error) {
              // エラーが発生した（ヘッドセルでないセルに対してgetText()を呼び出した）場合は、
              // そのセルを無視して次のセルに進む
              continue;
            }
          }
        }
        break;

      case SlidesApp.PageElementType.GROUP:
        var groupElements = pageElement.asGroup().getChildren();
        processElementsForAllText(groupElements);
        break;
    }
  });
}

function applyAllTextFont(textRange) {
  var text = textRange.asString(); // テキスト全体を文字列として取得
  var fontFamily = getConfig("fonts.all.family") || "Noto Sans JP"; // 設定ファイルからフォント名を取得

  // 文字列全体を走査し、すべての文字を指定されたフォントに変更
  for (var k = 0; k < text.length; k++) {
    var textStyle = textRange.getRange(k, k + 1).getTextStyle(); // 該当文字のスタイルを取得
    var isBold = textStyle.isBold(); // 元の文字がBoldだったかどうか確認
    textStyle.setFontFamily(fontFamily);
    textStyle.setBold(isBold); // 元の文字がBoldだった場合、Boldに戻す
  }
}
