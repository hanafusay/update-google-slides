.PHONY: help setup-test push-prod push-test status

# デフォルトターゲット
help:
	@echo "使用方法:"
	@echo "  make setup-test SCRIPT_ID=<スクリプトID>  - テスト用プロジェクトを設定"
	@echo "  make push-prod                             - 本番用プロジェクトにプッシュ"
	@echo "  make push-test                             - テスト用プロジェクトにプッシュ"
	@echo "  make status                                - 現在のプロジェクトを確認"

# テスト用プロジェクトの初期設定
setup-test:
	@if [ -z "$(SCRIPT_ID)" ]; then \
		echo "エラー: SCRIPT_ID を指定してください"; \
		echo "例: make setup-test SCRIPT_ID=1ABC..."; \
		exit 1; \
	fi
	@cp .clasp.test.json.template .clasp.test.json
	@sed -i '' "s/YOUR_TEST_SCRIPT_ID_HERE/$(SCRIPT_ID)/g" .clasp.test.json
	@if [ -f "src/config.test.js" ]; then \
		sed -i '' "s/\"scriptId\": \"[^\"]*\"/\"scriptId\": \"$(SCRIPT_ID)\"/g" src/config.test.js; \
	fi
	@echo "✓ テスト用プロジェクトを設定しました: $(SCRIPT_ID)"

# 本番用プロジェクトにプッシュ
push-prod:
	@./switch-clasp.sh prod
	@clasp push

# テスト用プロジェクトにプッシュ
push-test:
	@if [ ! -f ".clasp.test.json" ]; then \
		echo "エラー: テスト用プロジェクトが設定されていません"; \
		echo "まず 'make setup-test SCRIPT_ID=<スクリプトID>' を実行してください"; \
		exit 1; \
	fi
	@./switch-clasp.sh test
	@clasp push

# 現在のプロジェクトを確認
status:
	@./switch-clasp.sh prod > /dev/null 2>&1 || true
	@echo "現在のプロジェクト:"
	@grep -o '"scriptId": "[^"]*"' .clasp.json | cut -d'"' -f4
