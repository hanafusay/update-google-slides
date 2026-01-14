# Google スライド フォント編集アドオン

Google スライドのフォントを一括で編集するためのアドオンです。

## 機能

- **Kosugi 変換**: スライド内のすべてのテキストを Kosugi フォントに変換
- **Montserrat 変換**: 英数字と一部の記号（%, /, #, @, &, +, -, \*）を Montserrat フォントに変換
  - 全スライド対象
  - 指定ページのみ
- **Noto Sans 変換**: スライド内のすべてのテキストを Noto Sans JP フォントに変換
  - 全スライド対象
  - 指定ページのみ

### 特徴

- 元の Bold スタイルを維持
- テーブル内のテキストにも対応
- グループ化されたオブジェクト内のテキストにも対応

## インストール方法

1. [Google Workspace Marketplace](https://workspace.google.com/u/0/marketplace/app/gas%E3%81%A7googleslide%E3%81%AE%E6%93%8D%E4%BD%9C/92969051818) からアドオンをインストール
2. ブラウザを更新
3. Google スライドで「拡張機能」→「フォントを編集」から機能を利用

## 使い方

Google スライドを開き、「拡張機能」→「フォントを編集」メニューから以下の機能を選択できます：

- スライド内すべてのテキストを Kosgui にする
- 英数字と一部の記号を Montserrat にする（ページを指定）
- 英数字と一部の記号を Montserrat にする（スライド内すべて）
- すべてのテキストを Noto Sans にする（ページを指定）
- すべてのテキストを Noto Sans にする（スライド内すべて）

---

## 開発者向け情報

### プロジェクト構造

```
update-google-slides-1/
├── src/                    # GASソースコード
├── docs/                   # ドキュメント・画像
├── Makefile                # ビルドツール
├── switch-clasp.sh         # プロジェクト切り替えスクリプト
├── .clasp.prod.json        # 本番環境のclasp設定
├── .clasp.test.json        # テスト環境のclasp設定
└── .clasp.json             # 現在の環境設定（自動生成）
```

**注意**: `.clasp.json` は `switch-clasp.sh` によって `.clasp.prod.json` または `.clasp.test.json` から自動生成されます。直接編集する必要はありません。

### 開発環境のセットアップ

#### セットアップ（初回のみ）

1. 新しい Google スライドを作成
2. 「拡張機能」→「Apps Script」をクリック
3. GAS エディタで「プロジェクトの設定」（歯車アイコン）→「スクリプト ID」をコピー
4. 以下のコマンドで設定：

```bash
make setup-test SCRIPT_ID=<取得したスクリプトID>
```

#### 動作確認

```bash
# テスト用プロジェクトにコードをプッシュ
# （内部で switch-clasp.sh が .clasp.test.json を .clasp.json にコピーします）
make push-test

# スライドをリロードして、メニューから各機能をテスト
```

#### 本番用にプッシュ

```bash
# 本番用プロジェクトにコードをプッシュ
# （内部で switch-clasp.sh が .clasp.prod.json を .clasp.json にコピーします）
make push-prod
```

**補足**: `make push-test` や `make push-prod` は、内部で `switch-clasp.sh` を呼び出して `.clasp.json` を切り替えてから `clasp push` を実行します。

### デプロイと公開

アドオンを公開するには、以下の手順が必要です：

1. **デプロイ**: GAS エディタから「デプロイ」→「新しいデプロイ」で拡張機能としてデプロイ
2. **GCP での公開設定**: Google Workspace Marketplace SDK で内部アプリとして公開設定

詳細な手順は[参考サイト](https://officeforest.org/wp/google-spreadsheet%E7%94%A8%E3%81%AE%E7%B5%84%E7%B9%94%E5%86%85%E3%82%A2%E3%83%89%E3%82%AA%E3%83%B3%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B%E3%80%90gas%E3%80%91/)を参照してください。

### 参考リンク

- **内部アプリ**: [Google Workspace Marketplace - 内部アプリ](https://workspace.google.com/u/0/marketplace/app/gas%E3%81%A7googleslide%E3%81%AE%E6%93%8D%E4%BD%9C/92969051818)
- **本番用スクリプト**: https://script.google.com/home/projects/***REMOVED***/edit
- **テスト用スライド**: https://docs.google.com/presentation/d/1q_mUFmEMin6Nw1LuGW7DfS5dZCuAZIcyW6VcjIR_KlI/edit
- **GCP プロジェクト**: https://console.cloud.google.com/welcome?authuser=0&project=wired-framework-391207
- **参考サイト**: https://officeforest.org/wp/google-spreadsheet%E7%94%A8%E3%81%AE%E7%B5%84%E7%B9%94%E5%86%85%E3%82%A2%E3%83%89%E3%82%AA%E3%83%B3%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B%E3%80%90gas%E3%80%91/

## バージョン履歴

### Ver5 (2026/01/14)

**Noto Sans 変換機能の拡張**

- **ページ指定機能を追加**
  - Noto Sans 変換に「ページを指定」オプションを追加
  - 重たいスライドでもページ単位で処理できるため、エラーを回避可能
  - Montserrat 変換と同様に、全スライド対象と指定ページのみの2つのオプションを提供

### Ver4 (2024/08/28)

**Noto Sans 変換機能を追加**

- **Noto Sans 変換機能を追加**
  - スライド内のすべてのテキストを Noto Sans JP フォントに変換する機能を追加
  - Kosugi 変換と同様に、すべてのテキスト要素に対応

### Ver3 (2023/07/12)

**Montserrat 変換対象の拡張**

- 変換対象に以下の記号を追加: `%`, `/`, `#`, `@`, `&`, `+`, `-`, `*`
- 変換対象の完全なリスト:
  - 大文字と小文字のアルファベット
  - 数字
  - 特殊文字: `%`, `/`, `#`, `@`, `&`, `+`, `-`, `*`

### Ver2 (2023/07/06)

**新機能追加と機能改善**

- **Kosugi 変換機能を追加**
  - スライド内のすべてのテキストを Kosugi フォントに変換する機能を追加
- **グループ化オブジェクトへの対応**
  - グループ化されたオブジェクト内のテキストにも変換処理を適用

### Ver1 (2023/06/28)

**初回リリース**

- **Montserrat 変換機能**
  - フォント置換対象: 英数字、`%`, `/`, `#`, `@`, `&`
  - 元の文字列が Bold であれば Bold を維持
  - 結合された表オブジェクトでは左上セルのみ置換
