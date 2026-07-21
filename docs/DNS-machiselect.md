# machiselect.jp DNS 設定

## ルートドメイン

- A / @ / 162.159.143.30
- A / @ / 172.66.3.26
- TXT / _openai-site-verification / openai-site-verification=P4hc6uI9qEBSSGhAQAl1bTe2QscoDFWOkl6ri9t06cA
- TXT / _cf-custom-hostname / 07415692-6077-4767-9d40-382183604c12

## www

- CNAME / www / custom-domains.chatgpt.site.
- TXT / _openai-site-verification.www / openai-site-verification=Z_SQXNJQh_OOjOLno2oQfvgEp0idJOR_xUUtCC1uLZo
- TXT / _cf-custom-hostname.www / fd19c340-9fb4-4c98-ad50-892e34d7599d

DNS反映後、Sites側で証明書とドメイン状態を再確認する。
