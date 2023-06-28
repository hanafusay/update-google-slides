function applyMontserrat(textRange) {
  var text = textRange.asString(); // テキスト全体を文字列として取得

  // 文字列全体を走査し、文字が英数字であるか確認
  for (var k = 0; k < text.length; k++) {
    var char = text.charAt(k);

    // テキストが英数字か確認
    if (/^([a-zA-Z0-9,%\/#@&])*$/.test(char)) {
      var textStyle = textRange.getRange(k, k + 1).getTextStyle(); // 該当文字のスタイルを取得
      var isBold = textStyle.isBold(); // 元の文字がBoldだったかどうか確認
      textStyle.setFontFamilyAndWeight("Montserrat", 500.0); // 英数字のテキストのフォントをMontserratに変更
      textStyle.setBold(isBold); // 元の文字がBoldだった場合、Boldに戻す
    }
  }
}
