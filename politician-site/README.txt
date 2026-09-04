ホームページ（静的HTML版）

ファイル構成
- index.html: ページ本体
- styles.css: デザイン・レスポンシブ対応
- script.js: スマホ用ハンバーガーメニュー
- robots.txt: 検索エンジンの巡回設定
- SEO-GUIDE.txt: SEOの説明と独自ドメイン取得後の設定手順
- assets/hero-portrait.jpg: メインビジュアル用の候補者写真
- assets/candidate-portrait.jpg: Profile用の候補者写真
- assets/news-activity.jpg: News用の活動写真
- assets/usuki-ai-message.mp4: Movie用のメッセージ動画
- assets/og.png: SNS共有用画像

SNSアイコン
- Simple Icons v16（CC0 1.0）をjsDelivr経由で使用
- https://github.com/simple-icons/simple-icons

使い方
index.htmlをブラウザで開くだけで表示できます。
サーバーへ公開する場合は、このフォルダの中身をそのままアップロードしてください。

公開前に変更する箇所
1. 候補者名「うすき あい」の表記を確認
2. Instagram・X・後援会のURLを確認
3. 独自ドメイン取得後、「SEO-GUIDE.txt」の設定を行う
4. og:imageを公開先ドメインから始まる絶対URLへ変更
5. 写真を差し替える場合は、メインをhero-portrait.jpg、Profileをcandidate-portrait.jpgへ上書き

メインビジュアル写真の表示サイズ
- デスクトップ: 420 × 630px
- タブレット・横向きスマートフォン: 320 × 480px
- スマートフォン: 250 × 375px
- すべて縦横比2:3で固定

フォントについて
CSSは「平成明朝StdW7」「DPN秀英角ゴシック銀Std B」を優先します。
閲覧端末にフォントがない場合は、游明朝・游ゴシック等へ自動的に切り替わります。
Webフォントとして配信する場合は、別途フォントライセンスをご確認ください。
