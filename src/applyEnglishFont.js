/**
 * 英数字と一部の記号を指定されたフォントに変換する
 * フォント名、ウェイト、対象文字パターンは設定ファイル（fonts.english）から取得
 */
function applyEnglishFont(textRange) {
  var text = textRange.asString(); // テキスト全体を文字列として取得
  var fontFamily = getConfig("fonts.english.family") || "Montserrat"; // 設定ファイルからフォント名を取得
  var fontWeight = getConfig("fonts.english.weight") || 500.0; // 設定ファイルからフォントウェイトを取得
  var pattern = getConfig("fonts.english.targetChars.pattern") || "^([a-zA-Z0-9,%\\/#@&+\\-*])*$"; // 設定ファイルからパターンを取得

  // 文字列全体を走査し、文字が英数字であるか確認
  for (var k = 0; k < text.length; k++) {
    var char = text.charAt(k);

    // テキストが英数字か確認
    if (new RegExp(pattern).test(char)) {
      var textStyle = textRange.getRange(k, k + 1).getTextStyle(); // 該当文字のスタイルを取得
      var isBold = textStyle.isBold(); // 元の文字がBoldだったかどうか確認
      textStyle.setFontFamilyAndWeight(fontFamily, fontWeight); // 英数字のテキストのフォントを指定されたフォントに変更
      textStyle.setBold(isBold); // 元の文字がBoldだった場合、Boldに戻す
    }
  }
}
