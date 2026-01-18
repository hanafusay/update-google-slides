/**
 * テスト環境用設定
 * フォント設定とscriptIdを管理します
 */
var CONFIG = {
  scriptId: "***REMOVED***",
  fonts: {
    // すべてのテキストに適用するフォント
    all: {
      family: "Noto Sans JP",
      description: "スライド内すべてのテキストをNoto Sansにする"
    },
    // 日本語フォント（全てのテキストをこのフォントに変更した後、英数字を変更する機能を使うことで、
    // 結果的に日本語だけフォント変更することを想定している）
    japanese: {
      family: "Kosugi",
      description: "スライド内すべてのテキストをKosugiにする（その後英数字を変更することで日本語だけを変更）"
    },
    // 英数字と一部の記号に適用するフォント
    english: {
      family: "Montserrat",
      weight: 500.0,
      description: "英数字と一部の記号をMontserratにする",
      targetChars: {
        pattern: "^([a-zA-Z0-9,%\\/#@&+\\-*])*$",
        description: "英数字と一部の記号（%, /, #, @, &, +, -, *）"
      }
    }
  },
  menu: {
    title: "フォントを編集",
    items: {
      all: "すべてのテキストをNoto Sansにする（全スライド）",
      allByPage: "すべてのテキストをNoto Sansにする（ページを指定）",
      englishAll: "英数字と一部の記号をMontserratにする（全スライド）",
      englishByPage: "英数字と一部の記号をMontserratにする（ページを指定）",
      japanese: "すべてのテキストをKosugiにする（全スライド）",
      japaneseByPage: "すべてのテキストをKosugiにする（ページを指定）"
    }
  }
};

/**
 * 設定を取得する関数
 * @param {string} path - 設定のパス（例: "fonts.all.family"）
 * @returns {*} 設定値
 */
function getConfig(path) {
  var keys = path.split(".");
  var value = CONFIG;
  for (var i = 0; i < keys.length; i++) {
    if (value && typeof value === "object" && keys[i] in value) {
      value = value[keys[i]];
    } else {
      return null;
    }
  }
  return value;
}
