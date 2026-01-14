var currentSlide = null; // グローバル変数として currentSlide を定義

// スライドが開かれた時に実行される関数
function onOpen() {
  var ui = SlidesApp.getUi(); // ユーザインターフェースを取得
  ui.createMenu("フォントを編集") // カスタムメニューを作成
    // メニューアイテムを追加
    .addItem("スライド内すべてのテキストをKosguiにする", "updateFontToKosugi")
    .addItem("英数字と一部の記号をMontserratにする(ページを指定)", "showPromptForPage")
    .addItem("英数字と一部の記号をMontserratにする(スライド内すべて)", "updateFontToMontserrat")
    .addToUi(); // メニューをユーザインターフェースに追加
}

// アドオンのインストール時に実行される関数
function onInstall(e) {
  onOpen(e);
}

// プロンプトを表示してスライド番号を入力させる関数
function showPromptForPage() {
  var ui = SlidesApp.getUi(); // ユーザインターフェースを取得
  var response = ui.prompt("スライド番号", "処理を適用するスライドの番号を入力してください:", ui.ButtonSet.OK_CANCEL); // プロンプトを表示

  if (response.getSelectedButton() == ui.Button.OK) {
    // OK ボタンが選択された場合
    var slideNumber = parseInt(response.getResponseText()); // 入力されたテキストを整数に変換
    if (slideNumber && slideNumber >= 1) {
      // 入力が有効な場合
      currentSlide = slideNumber; // currentSlide を設定
      updateFontToMontserratByPage(currentSlide); // updateFontToMontserratByPage 関数を実行
    } else {
      ui.alert("無効なスライド番号です。"); // 無効なスライド番号の場合、アラートを表示
    }
  }
}
