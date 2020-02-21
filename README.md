# chat_space

## usersテーブル
|column|type|option|
|----|-----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false,index:true|
### Association
- has_many :comments
- has_many :group,through::group_users
- has_many :groups_users

## commentsテーブル
|column|type|option|
|----|-----|-------|
|text|text||
|user_id|references|null: false, foreign_key: true|
|image|text||
|group_id|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル
|column|type|option|
|----|-----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|column|type|option|
|----|-----|-------|
|name|string|null: false|
### Association
- has_many :comments
- has_many :groups_users
- has_many :users,through::group_users
