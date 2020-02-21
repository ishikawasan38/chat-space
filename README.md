# chat_space

## usersテーブル
|Column|Type|Option|
|----|-----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false,index:true｜
### Association
- has_many :comments
- has_many :group,through::group_users
- has_many :groups_users

## commentsテーブル
|Column|Type|Option|
|----|-----|-------|
|text|text||
|user_id|references|null: false, foreign_key: true|
|image|text||
|group_id|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル
|Column|Type|Option|
|----|-----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Option|
|----|-----|-------|
|name|string|null: false|
### Association
- has_many :comments
- has_many :groups_users
- has_many :users,through::group_users
