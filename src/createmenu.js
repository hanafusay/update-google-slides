var currentSlide = null; // グローバル変数として currentSlide を定義

// スライドが開かれた時に実行される関数
function onOpen() {
  var ui = SlidesApp.getUi(); // ユーザインターフェースを取得
  var menuTitle = getConfig("menu.title") || "フォントを編集"; // 設定ファイルからメニュータイトルを取得
  var menu = ui.createMenu(menuTitle); // カスタムメニューを作成
  
  // 設定ファイルからフォント名を取得
  var allFontFamily = getConfig("fonts.all.family") || "Noto Sans JP";
  var englishFontFamily = getConfig("fonts.english.family") || "Montserrat";
  // 日本語フォント（全てのテキストをこのフォントに変更した後、英数字を変更する機能を使うことで、
  // 結果的に日本語だけフォント変更することを想定している）
  var japaneseFontFamily = getConfig("fonts.japanese.family") || "Kosugi";
  
  // 設定ファイルからメニューアイテムを取得、フォント名が含まれていない場合は動的に生成
  // すべてのテキスト変換
  var allText = getConfig("menu.items.all") || "すべてのテキストを" + allFontFamily + "にする（全スライド）";
  var allByPageText = getConfig("menu.items.allByPage") || "すべてのテキストを" + allFontFamily + "にする（ページを指定）";
  // 英数字変換
  var englishAllText = getConfig("menu.items.englishAll") || "英数字と一部の記号を" + englishFontFamily + "にする（全スライド）";
  var englishByPageText = getConfig("menu.items.englishByPage") || "英数字と一部の記号を" + englishFontFamily + "にする（ページを指定）";
  // 日本語フォント変換（全てのテキストを指定フォントに変更）
  // 注: まず全てのテキストをこのフォントに変更した後、英数字を変更する機能を使うことで、
  //     結果的に日本語だけフォント変更することを想定している
  var japaneseText = getConfig("menu.items.japanese") || "すべてのテキストを" + japaneseFontFamily + "にする（全スライド）";
  var japaneseByPageText = getConfig("menu.items.japaneseByPage") || "すべてのテキストを" + japaneseFontFamily + "にする（ページを指定）";
  
  menu
    // すべてのテキスト変換
    .addItem(allText, "updateAllText")
    .addItem(allByPageText, "showPromptForAllText")
    .addSeparator()
    // 英数字変換
    .addItem(englishAllText, "updateEnglishText")
    .addItem(englishByPageText, "showPromptForEnglish")
    .addSeparator()
    // 日本語フォント変換（全てのテキストを指定フォントに変更）
    // 注: まず全てのテキストをこのフォントに変更した後、英数字を変更する機能を使うことで、
    //     結果的に日本語だけフォント変更することを想定している
    .addItem(japaneseText, "updateJapaneseText")
    .addItem(japaneseByPageText, "showPromptForJapanese")
    .addToUi(); // メニューをユーザインターフェースに追加
}

// アドオンのインストール時に実行される関数
function onInstall(e) {
  onOpen(e);
}

// プロンプトを表示してスライド番号を入力させる関数（全てのテキスト用）
function showPromptForAllText() {
  var ui = SlidesApp.getUi(); // ユーザインターフェースを取得
  var response = ui.prompt(
    "スライド番号",
    "処理を適用するスライドの番号を入力してください:",
    ui.ButtonSet.OK_CANCEL
  ); // プロンプトを表示

  if (response.getSelectedButton() == ui.Button.OK) {
    // OK ボタンが選択された場合
    var slideNumber = parseInt(response.getResponseText()); // 入力されたテキストを整数に変換
    if (slideNumber && slideNumber >= 1) {
      // 入力が有効な場合
      currentSlide = slideNumber; // currentSlide を設定
      updateAllTextByPage(currentSlide); // updateAllTextByPage 関数を実行
    } else {
      ui.alert("無効なスライド番号です。"); // 無効なスライド番号の場合、アラートを表示
    }
  }
}

// プロンプトを表示してスライド番号を入力させる関数（英数字用）
function showPromptForEnglish() {
  var ui = SlidesApp.getUi(); // ユーザインターフェースを取得
  var response = ui.prompt(
    "スライド番号",
    "処理を適用するスライドの番号を入力してください:",
    ui.ButtonSet.OK_CANCEL
  ); // プロンプトを表示

  if (response.getSelectedButton() == ui.Button.OK) {
    // OK ボタンが選択された場合
    var slideNumber = parseInt(response.getResponseText()); // 入力されたテキストを整数に変換
    if (slideNumber && slideNumber >= 1) {
      // 入力が有効な場合
      currentSlide = slideNumber; // currentSlide を設定
      updateEnglishTextByPage(currentSlide); // updateEnglishTextByPage 関数を実行
    } else {
      ui.alert("無効なスライド番号です。"); // 無効なスライド番号の場合、アラートを表示
    }
  }
}

// プロンプトを表示してスライド番号を入力させる関数（日本語用）
function showPromptForJapanese() {
  var ui = SlidesApp.getUi(); // ユーザインターフェースを取得
  var response = ui.prompt(
    "スライド番号",
    "処理を適用するスライドの番号を入力してください:",
    ui.ButtonSet.OK_CANCEL
  ); // プロンプトを表示

  if (response.getSelectedButton() == ui.Button.OK) {
    // OK ボタンが選択された場合
    var slideNumber = parseInt(response.getResponseText()); // 入力されたテキストを整数に変換
    if (slideNumber && slideNumber >= 1) {
      // 入力が有効な場合
      currentSlide = slideNumber; // currentSlide を設定
      updateJapaneseTextByPage(currentSlide); // updateJapaneseTextByPage 関数を実行
    } else {
      ui.alert("無効なスライド番号です。"); // 無効なスライド番号の場合、アラートを表示
    }
  }
}
