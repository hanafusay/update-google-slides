#!/bin/bash

# clasp プロジェクト切り替えスクリプト
# 使用方法: ./switch-clasp.sh [prod|test]

PROJECT_TYPE=${1:-prod}

if [ "$PROJECT_TYPE" = "prod" ]; then
  echo "本番用プロジェクトに切り替えます..."
  cp .clasp.prod.json .clasp.json
  cp src/config.prod.js src/config.js
  echo "✓ 本番用プロジェクトに切り替えました"
  echo "現在の scriptId: $(grep -o '"scriptId": "[^"]*"' .clasp.json | cut -d'"' -f4)"
elif [ "$PROJECT_TYPE" = "test" ]; then
  if [ ! -f ".clasp.test.json" ]; then
    echo "エラー: .clasp.test.json が見つかりません"
    echo "新しいスライドから取得したスクリプトIDを .clasp.test.json に設定してください"
    echo ""
    echo "手順:"
    echo "1. .clasp.test.json.template を .clasp.test.json にコピー"
    echo "2. YOUR_TEST_SCRIPT_ID_HERE を実際のスクリプトIDに置き換え"
    exit 1
  fi
  echo "テスト用プロジェクトに切り替えます..."
  cp .clasp.test.json .clasp.json
  cp src/config.test.js src/config.js
  echo "✓ テスト用プロジェクトに切り替えました"
  echo "現在の scriptId: $(grep -o '"scriptId": "[^"]*"' .clasp.json | cut -d'"' -f4)"
else
  echo "使用方法: $0 [prod|test]"
  echo ""
  echo "  prod - 本番用プロジェクトに切り替え（デフォルト）"
  echo "  test - テスト用プロジェクトに切り替え"
  exit 1
fi
