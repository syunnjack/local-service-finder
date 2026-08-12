# 25ドメインの接続手順

25業種 + ポータルを5つの Sites プロジェクトで配信する。
どのドメインでどの業種を出すかは配信中のホストで決まるので、
コード側の変更は要らず、ドメインごとに Sites への接続とDNSの設定だけを行う。

## いまの状態を調べる

```
node scripts/check-domains.mjs
```

26ドメインぶんの A / www / 確認用TXT / HTTPS / Search Console のトークン記入を
公開DNSに問い合わせて一覧にする。「反映したはず」と実際の食い違いはこれで分かる。

## 1ドメインぶんの手順

1. Sites 側でそのドメインをカスタムドメインとして追加する。
   ここで `_openai-site-verification` と `_cf-custom-hostname` の値が発行される。
   値はドメインごとに違うので、他のドメインのものを流用できない。
2. お名前.com Navi の「DNSレコード設定」で次を登録する。

| 種別 | ホスト名 | 値 |
| --- | --- | --- |
| A | @ | 162.159.143.30 |
| A | @ | 172.66.3.26 |
| TXT | _openai-site-verification | openai-site-verification=（発行された値） |
| TXT | _cf-custom-hostname | （発行されたUUID） |
| CNAME | www | custom-domains.chatgpt.site. |
| TXT | _openai-site-verification.www | openai-site-verification=（www用の値） |
| TXT | _cf-custom-hostname.www | （www用のUUID） |

3. `node scripts/check-domains.mjs` で DNS が `Sites` になり HTTPS が 200 を返すまで待つ。
4. Search Console にプロパティを追加し、トークンを `data/search-console.json` に貼る
   （[search-console.md](./search-console.md)）。

machiselect.jp のぶんは [DNS-machiselect.md](./DNS-machiselect.md) に発行済みの値がある。

## つまずきやすいところ

- お名前.com は取得直後、A を `150.95.255.38`（取得済みのお知らせページ）へ向けている。
  これを消さずに追加すると、そちらが応答してしまう。
- 未設定のサブドメインを引くと `v=spf1 -all` が返る。ワイルドカードのTXTなので、
  これが返っても確認用TXTが入っていることにはならない。
- ネームサーバーは `dns1/dns2.onamae.com` のままでよい。変える必要はない。
- HTTPSは証明書の発行が終わるまで応答しない。A だけ変えても即座には繋がらない。

## コード側の対応が要るドメイン

`app/lib/verticals.ts` に載っているが、こちらで使えないもの。
放置すると、その業種のサイトは永久に見られない。

| ドメイン | 業種 | 状態 |
| --- | --- | --- |
| machicode.jp | プログラミング教室 | 名前解決しない（未登録） |
| machieikaiwa.jp | 英会話 | 名前解決しない（未登録） |
| machijuku.jp | 学習塾 | 別事業者の学習塾サイトが稼働中 |
| machinail.jp | ネイル | 別事業者のネイルサロンサイトが稼働中 |
| water-choice.jp | ウォーターサーバー | 別事業者の比較サイトが稼働中 |

取得できない場合は `verticals.ts` の `domain` を差し替える。
差し替えたら `data/search-console.json` にも同じドメインを足す
（足し忘れると `npm test` が落ちる）。
