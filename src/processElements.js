function processElements(pageElements) {
  for (var j = 0; j < pageElements.length; j++) {
    var pageElement = pageElements[j];
    switch (pageElement.getPageElementType()) {
      case SlidesApp.PageElementType.SHAPE:
      case SlidesApp.PageElementType.TEXT_BOX:
        var textRange = pageElement.asShape().getText();
        if (textRange) {
          applyMontserrat(textRange);
        }
        break;

      case SlidesApp.PageElementType.TABLE:
        var numRows = pageElement.asTable().getNumRows();
        var numCols = pageElement.asTable().getNumColumns();
        for (var row = 0; row < numRows; row++) {
          for (var col = 0; col < numCols; col++) {
            try {
              var cellText = pageElement.asTable().getCell(row, col).getText();
              if (cellText) {
                applyMontserrat(cellText);
              }
            } catch (error) {
              // エラーを無視し、次のセルに移動
              continue;
            }
          }
        }
        break;

      // PageElementTypeがGROUPである場合に対応するため、GROUP内の要素に対して同様の操作を再帰的に行う
      case SlidesApp.PageElementType.GROUP:
        var groupElements = pageElement.asGroup().getChildren();
        processElements(groupElements);
        break;
    }
  }
}
