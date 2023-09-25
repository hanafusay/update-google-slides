# Google スライドのフォントから、特定の文字を Montserrat に置換するスクリプト

## Ver3 @2023/07/12
次に一致する場合Montserrat変換対象とする。
>大文字と小文字のアルファベット、数字、および%,/,#,@,&,+, -, * の特殊文字

## Ver2 @2023/07/06
- Kosugi置換スクリプトを追加
- グループ化されたオブジェクトにも対応

## Ver1.@2023/06/28 

- フォント置換対象
  英数字、「,」「%」「/」「#」「@」「&」

- その他
  - 元の文字列が Bold であれば Bold を維持します。
  - 結合された表オブジェクトでは左上セルのやつだけ置換されます。

## 使い方

アドオンを入れる。
https://workspace.google.com/u/0/marketplace/app/gas%E3%81%A7googleslide%E3%81%AE%E6%93%8D%E4%BD%9C/92969051818

1. アドオンを取得する。
   1. ![Alt text](image-1.png)
   2. 内部アプリから、アドオンを選択
      1. ![Alt text](image-2.png)
   3. インストール
      1. ![Alt text](image-3.png)
2. 一旦ブラウザ更新
3. 拡張機能から起動
   ![image](https://github.com/hanafusay/gas-clasp-project/assets/65750817/e2f11b66-64e9-446b-8aba-e855130c1af5)

## 【参考】毎回GASがついたテンプレスライドをコピーしなくてもアドオンとして利用可能にする方法

- GCP プロジェクト
  https://console.cloud.google.com/welcome?authuser=0&project=wired-framework-391207

- 参考にしたサイト
  https://officeforest.org/wp/2022/12/24/google-spreadsheet%E7%94%A8%E3%81%AE%E7%B5%84%E7%B9%94%E5%86%85%E3%82%A2%E3%83%89%E3%82%AA%E3%83%B3%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B%E3%80%90gas%E3%80%91/
