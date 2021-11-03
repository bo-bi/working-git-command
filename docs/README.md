# git常用命令

## __获取git仓库__

- 在现有目录中初始化仓库 git init
- 克隆现有的仓库 git clone https://github.intra.douban.com/music/vfine.git

### __git init__
场景：希望将本地某个文件夹 push 到 github 上，做为一个project

```
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/bo-bi/test.git
git push origin master
```

### __clone项目__
场景：将 github 上现有项目 clone下来

    // Use HTTPS
    git clone https://github.intra.douban.com/music/vfine.git

### __配置本项目用户名和邮箱__
说明： 提交代码时所用的用户名和邮箱，便于小组协作。clone 下项目后首先要配置一下这个。

```
// 查看config（重点看[user]）
cat .git/config

[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[user]
	name = fastclick
	email = fastclick@intern.douban.com
[branch "pdf"]
[remote "gitlab"]
	url = https://gitlab.com/vfine/vfine.git
	fetch = +refs/heads/*:refs/remotes/gitlab/*
[branch "dev"]
[branch "en_temp"]
[remote "upstream"]
	url = https://gitlab.com/vfine/vfine.git
	fetch = +refs/heads/*:refs/remotes/upstream/*
[remote "origin"]
	url = git@gitlab.com:bo-bi/vfine.git
	fetch = +refs/heads/*:refs/remotes/origin/*

// 配置用户名和邮箱
// 本项目
git config --local user.name "fastclick"
git config --local user.email "fastclick@intern.douban.com"

// 配置全局 (所有项目不配置local，默认使用全局)
git config --global user.name "bo-bi"
git config --global user.email "18935445147@qq.com"
```

## __关联remote__
**1.remote介绍**
> remote: 远端(源)，即clone地址 (https://github.intra.douban.com/music/vfine.git)<br />
作用：可以从关联的remote处拉下代码到本地，也可以将本地代码提交到对应的remote处。
>> upstream: 项目远端(https://github.intra.douban.com/music/vfine.git)<br />origin: 自己远端 (https://github.intra.douban.com/fastclick/vfine.git)
<br />gitlab: gitlab远端 (https://gitlab.com/vfine/vfine.git) (*其它远端参照此处*)

**2.查询本地已关联的remote**
      
    git remote -v
    // 打印如下(单个remote下，展示fetch 和 push 的源头)
    gitlab	https://gitlab.com/vfine/vfine.git (fetch)
    gitlab	https://gitlab.com/vfine/vfine.git (push)
    origin	https://github.intra.douban.com/fastclick/vfine.git (fetch)
    origin	https://github.intra.douban.com/fastclick/vfine.git (push)
    upstream	https://github.intra.douban.com/music/vfine.git (fetch)
    upstream	https://github.intra.douban.com/music/vfine.git (push)

**3.添加remote**

    // git add remote name address
    git add remote gitlab https://gitlab.com/vfine/vfine.git

**4.删除remote**

    // git remote remove name
    git remote remove gitlab

**5.重命名remote**

    // git remote rename <oldName> <newName>
    git remote rename origin originn


---
**实际遇到的场景**

**场景一**：更改已有的remote，例如更换已有的命名为origin的remote（github地址 ---> gitlab地址）

```
// 原来用的github
gitlab	https://gitlab.com/vfine/vfine.git (fetch)
gitlab	https://gitlab.com/vfine/vfine.git (push)
origin	https://github.intra.douban.com/fastclick/vfine.git (fetch)
origin	https://github.intra.douban.com/fastclick/vfine.git (push)
upstream	https://github.intra.douban.com/music/vfine.git (fetch)
upstream	https://github.intra.douban.com/music/vfine.git (push)
```



现在迁移到了gitlab<br />
TODO: <br />
  将 origin https://github.intra.douban.com/fastclick/vfine.git<br />
  换 origin https://gitlab.com/bo-bi/vfine.git

步骤：<br />

1. 删除remote origin
2. 重新添加remote origin

或

1. rename要更改的remote
2. 重新添加remote
3. 移除rename的remote

```
// 此处我将 HTTPS 更换为了 SSH (之前更改了公钥，误操作，fetch时 导致每次都要输入用户名、密码)
1. git remote remove origin
2. git remote add origin git@gitlab.com:bo-bi/vfine.git
或
1. git remote rename origin originn
2. git remote add origin git@gitlab.com:bo-bi/vfine.git
3. git remote remove originn

// git remote -v
// 更改后的remote
gitlab	https://gitlab.com/vfine/vfine.git (fetch)
gitlab	https://gitlab.com/vfine/vfine.git (push)
origin	git@gitlab.com:bo-bi/vfine.git (fetch)
origin	git@gitlab.com:bo-bi/vfine.git (push)
upstream	https://github.intra.douban.com/music/vfine.git (fetch)
upstream	https://github.intra.douban.com/music/vfine.git (push)
```

---

## __分支__
**1.查看本地分支**
```
// 查看本地分支
git branch

// 打印如下信息 * 为当前所在分支
  add_income_type
* dev
  fix_bug
  improve_UI
  redeem_code
  replace_chinese_hardcoded
  test
  ...
```
**2.查看所有分支**
```
// 查看所有分支
git branch --all

// 打印如下信息

// 会看到不同remote下存在的分支
// 本地分支
// remote  为github   下的分支
// remote  为origin   下的分支
// remote  为upstream 下的分支

  add_income_type
* dev
  fix_bug
  replace_chinese_hardcoded
  search_prop_method
  test
  remotes/github/batch_authorize
  remotes/github/dev
  remotes/github/fix_bug
  remotes/github/improve_UI
  remotes/github/lixiaoxue/new_year_theme
  remotes/github/master
  remotes/origin/master
  remotes/origin/vfine/new_ui
  remotes/upstream/dev
  remotes/upstream/master
  remotes/upstream/tlongzou/add_news
  remotes/upstream/vfine/new_ui
```

**3.删除本地分支**

```
// git branch -D name
git branch -D test

```

**4.删除远程分支**

```
// 删除remote名为 upstream 下的 en_temp 分支
// git push <remote> :<branch> 
git push upstream :en_temp
```

**5.切换分支**

```
// git checkout name
git checkout dev
```

**5.以dev分支为基准，创建分支并切换**

```
// 以dev分支，创建test分支，并切换到test分支
git checkout -b test
```
**6.以远端上的分支为基准，创建并切换**

场景：若想在本地，想看别人remote下的分支代码。比如想看他开发的功能怎么样，可以将它的分支映射到你的本地，前提是需要添加他的reomote。（所以有时候不向自己的remote push代码，而是直接向项目remote push代码，这样别人不用关联你的remote。这里还有 是向开源项目贡献代码还是以小组成员身份提交代码之分。）

```
// git checkout -b [分支名] [远端名]/[分支名]
git checkout dev upstream/dev

// 意思为：将remote名为upstream下的dev分支，映射到本地dev分支(或者是其它的名字)。

```

**7.重命名本地分支**

```
// git branch -M <oldName> <newName>
git branch -M fix fixx

// git branch
* dev
  fix_vip
  fixx
```

**8.重命名远程分支**

1. 将要修改的分支映射到本地
2. 在本地项目中重命名被映射后的分支
3. 删除远程待修改的分支
4. 将本地的新分支名 push到远程

或<br />
有直接的命令，待补充

## __记录每次更新到仓库__

**1.检查当前文件状态**

场景：下方已经展示出不同的文件状态。不同情况下执行 git status 会看不到不同的文件状态。

```
git status
```

1. 当前工作目录干净


```
// 当没有 发生修改的文件 时
On branch test
nothing to commit, working tree clean
```

2. 有未跟踪的文件 (Untracked files)

```
// 当 新增文件 test.md 后

On branch test
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	test.md

nothing added to commit but untracked files present (use "git add" to track)

// 未跟踪的文件意味着Git在之前的快照（提交）中没有这些文件；Git 不会自动将之纳入跟踪范围，因而不用担心把临时文件什么的也归入版本管理。
```

3. 已暂存状态 (Changes to be committed)

```
// 跟踪文件
git add test.md

// git status 出现以下信息
On branch test
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   test.md

// 只要在 “Changes to be committed” 这行下面的，就说明是已暂存状态。如果此时提交，那么该文件此时此刻的版本将被留存在历史记录中。(只有已暂存起来的文件才可以进行提交!)
```

4. 没有放到暂存区 (Changes not staged for commit)

```
// 现在我们修改下之前已跟踪过的文件 HelpCenter.vue，然后再次运行 status 命令，会看到这样的状态报告：

On branch test
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   test.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   src/views/HelpCenter.vue

// 文件 HelpCenter.vue 出现在 “Changes not staged for commit” 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。要暂存这次更新，需要运行 git add 命令.
```

---

```
// git add src/views/HelpCenter.vue
// git status 打印如下信息

On branch test
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   src/views/HelpCenter.vue
	new file:   test.md

// 现在两个文件都已暂存，下次提交时就会一并记录到仓库。
```

---

```
// 假设此时，你想要在 HelpCenter.vue 里再加条注释，再运行 git status 看看：

On branch test
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   src/views/HelpCenter.vue
	new file:   test.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   src/views/HelpCenter.vue

// HelpCenter.vue 文件竟然出现了两次，一次算未暂存，一次算已暂存
// 实际上 Git 只不过暂存了你运行 git add 命令时的版本，如果现在提交，那么提交的是添加注释前的版本，而非当前工作目录中的版本。
```
---

```
// 运行了 git add 之后又作了修订的文件，需要重新运行 git add 把最新版本重新暂存起来。

// git add src/views/HelpCenter.vue

On branch test
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   src/views/HelpCenter.vue
	new file:   test.md
```

**2.查看未暂存的文件修改内容**
<br />
说明：此命令比较的是工作目录中当前文件和暂存区域快照之间的差异，也就是`修改之后还没有暂存起来的变化内容`。

  ```
  // git status 查看文件状态 得知 HelpCenter.vue 文件未暂存
  // git diff src/views/HelpCenter.vue

  diff --git a/src/views/HelpCenter.vue b/src/views/HelpCenter.vue
index 845995c..533ad5e 100644
--- a/src/views/HelpCenter.vue
+++ b/src/views/HelpCenter.vue
@@ -1,6 +1,6 @@
 <template lang="pug">
   .help-center
-  //- h2
+
     h2 {{ $t('helpCenter') }}
     .user-type
       router-link.type(
(END)

// 可以看到修改的地方
  ```

**3.查看已暂存的文件修改内容**
<br />
说明：此命令比较的是已经暂存起来的文件和上次提交时的快照之间的差异

```
// 两种方式
// git diff --cached
// git diff --staged

git diff --cached src/views/HelpCenter.vue
// 同上，会将修改的地方标注出来

// 若此时用 git diff src/views/HelpCenter.vue 来查看已暂存的文件，会发现什么内容都没有，因为 git diff 不过是显示还没有暂存起来的改动，而不是这次工作和上次提交之间的差异。
```

**4.将有修改的文件放入暂存区，等待提交**
<br />
<br />
git add 作用如下：
1. 跟踪新文件
2. 把已跟踪的文件放入暂存区域 (add file into staged area)
3. 合并时把有冲突的文件标记为已解决状态(如 rebase时)

```
// git add 文件/目录路径

// 1.单个跟踪文件
git add test.md

// 2.批量跟踪文件 (带git diff 功能)
场景：当有多个文件发生改变时，又需要审查每一个文件的改变，此时批量跟踪文件会变得十分有用，不再需要一个一个文件 git diff 再 git add。只需要执行git add -p，会将你的修改结果一个一个呈现，针对每一个修改结果，输入y/n，来决定是否将此改变进行缓存。

git add -p
```


**5.提交更新**

```
1. git status 无误后

2. git commit -m "message..."

3. git push origin test (或其他remote branch)
```

**6.让git忽略某些文件**
<br />
说明：一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。这时可以创建一个名为 .gitignore 的文件，列出要忽略的文件格式。

```
// 忽略规则
# 此为注释 – 将被 Git 忽略
# 忽略所有 .a 结尾的文件
*.a
# 但 lib.a 除外
!lib.a
# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO
# 忽略 build/ 目录下的所有文件
build/
# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt
# 忽略 doc/ 目录下所有扩展名为 txt 的文件
doc/**/*.txt



// 以下为 vfine 项目中 .gitignore 的文件内容
.DS_Store
node_modules/
dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
.history
*.suo
*.ntvs*
*.njsproj
*.sln

```

## __更新所有__

```
// 一般我会这么做
git fetch --all
git rebase upstream/dev

// 首先更新所有remote下的分支及代码
// 再将upstream下的dev分支拉到本地当前分支 (或者是其他remote下的其他分支)

// 还有另外一种方式
git pull origin dev
```

## __解决冲突 git rebase__

```
git fetch --all
git rebase upstream/dev

// 打印如下
First, rewinding head to replay your work on top of it...
Applying: Add judgment on limitless package in DownloadVipMusicDialog.vue.
Using index info to reconstruct a base tree...
M	src/components/DownloadVipMusicDialog.vue
M	src/store/getters.coffee
Falling back to patching base and 3-way merge...
Auto-merging src/components/DownloadVipMusicDialog.vue
CONFLICT (content): Merge conflict in src/components/DownloadVipMusicDialog.vue
error: Failed to merge in the changes.
Patch failed at 0001 Add judgment on limitless package in DownloadVipMusicDialog.vue.
The copy of the patch that failed is found in: .git/rebase-apply/patch

When you have resolved this problem, run "git rebase --continue".
If you prefer to skip this patch, run "git rebase --skip" instead.
To check out the original branch and stop rebasing, run "git rebase --abort".

// 当前左侧箭头显示如下，说明当前进入解决冲突过程中
/myDocument/vfine/vfine-fork/vfine  ➦ 34ce9e8 ●✚ >R>

// 相关命令
// git rebase --abort 中止解决冲突过程，回到rebase之前的状态
// git rebase --skip 跳过此条commit对比
// git rebase --continue 继续对比下一个commit (解决冲突的过程为一个commit一个commit进行对比，直到没有冲突为止)
```

**解决冲突的步骤：**
<br />
**1. 去项目中找到这两个文件，并解决冲突**

```
M	src/components/DownloadVipMusicDialog.vue
M	src/store/getters.coffee

从以上可以看出这两个文件有冲突

   getters.coffee 没有冲突内容

   DownloadVipMusicDialog.vue 有冲突内容，如下显示

<<<<<<< HEAD
    p {{ $t('thisAudioAlreadyAddAuthCode') }}
=======
    p(v-if="!music.vip_used") {{ $t('thisAudioAlreadyAddAuthCode') }}
>>>>>>> Add judgment on limitless package in DownloadVipMusicDialog.vue.
      span.link(@click="showVipAuthDialog") {{ $t('unlockNow') }}


// <<<<<<< HEAD    自己commit的内容    =======
// =======         是拉下的内容        >>>>>>>

// 选择要留下的内容，删除掉 <<<<<<<、=======、>>>>>>>这类特殊符号

// 解决冲突后，如下
p {{ $t('thisAudioAlreadyAddAuthCode') }}
  span.link(@click="showVipAuthDialog") {{ $t('unlockNow') }}
```

**2. 将冲突的文件标记为已解决状态，完成此次commit对比**

```
git status
git diff src/components/DownloadVipMusicDialog.vue
git add src/components/DownloadVipMusicDialog.vue
git status 再次查看文件状态
```

**3. 继续对比下一个commit**

```
git rebase --continue

重复以上步骤：
1. 解决冲突
2. 将冲突的文件标记为已解决状态，完成此次commit对比
3. git rebase --continue
4. 直到对比完会退出来这个过程，左侧箭头恢复  /myDocument/vfine/vfine-fork/vfine   test
```

**4. 提交解决完冲突后的commit**

```
git push origin test 
// 你会发现这样做，会报错，推不上去，是因为：解决完冲突后的commit，已经不是原来的commit, 比如 commit 1 -> commit 1',
所以无法正常push， 应该加 -f 强行push

git push origin test -f
```

## __合并commit git rebase__
说明：针对于一次功能，commit不宜过多，这是因为commit过多不宜回滚版本，一般 10个以内，之上已经算作一个很大的功能，所以有时候需要将多个commit合并为1个。

```
// 查看提交历史
git log

// 打印如下
commit b6478a536251d3e265731faf150c56ffffed0ba3 (HEAD -> test)
Author: fastclick <fastclick@intern.douban.com>
Date:   Fri Mar 15 11:52:50 2019 +0800

    Second commit for rebase.

commit 1c669b5fdfdca2b4be2df6d80e989ff5de26469a
Author: fastclick <fastclick@intern.douban.com>
Date:   Fri Mar 15 11:52:03 2019 +0800

    First commit for rebase.

commit 814350626c743f209c7f289df0e6d5669759e269
Author: fastclick <fastclick@intern.douban.com>
Date:   Fri Mar 15 11:14:44 2019 +0800

    hahaha2

// 合并方式

// 1.选择合并前两个
git rebase -i HEAD^^ (git rebase -i HEAD~2)

// 2.选取一个坐标，不包括本身，合并之前的
git rebase -i 8143506
```
```
// 合并步骤：

1.git rebase -i HEAD^^

2.出现vim，内容如下
pick 1c669b5 First commit for rebase.
pick b6478a5 Second commit for rebase.

# Rebase 8143506..b6478a5 onto 8143506 (2 commands)

// ① 合并commit，是从下往上合并commit
// ② pick 改为 squash / s
// ③ esc + :wq 保存并退出

// 改为如下
pick 1c669b5 First commit for rebase.
s    b6478a5 Second commit for rebase.

3.若没有冲突，继续出现vim
# This is a combination of 2 commits.
# This is the 1st commit message:

First commit for rebase.

# This is the commit message #2:

Second commit for rebase.

// 从以上可以看出这两条commit的信息，更改信息，或者是留下其中一条，然后保存退出。

// 相关操作
// 输入 i 进入编辑状态
// 点击 esc 退出编辑状态
// 在不是编辑状态下，连按两次dd，删除行
// esc + :wq 保存并退出

// 改为如下
# This is a combination of 2 commits.
# This is the 1st commit message:

Rebase the first and second commit.

# This is the commit message #2:

4. git log

commit 9f27f93f9dd73e5ee9cccc88b7e5839ed1dc0695 (HEAD -> test)
Author: fastclick <fastclick@intern.douban.com>
Date:   Fri Mar 15 11:52:03 2019 +0800

    Rebase the first and second commit.
```

## __查看commit历史__
场景：可以对比历史，来确定有没有预期之外的commit

```
// 查看当前分支
git log

// 查看 upstream 远端下的 dev 分支
git log upstream/dev
```

## __撤回commit__

## __回滚代码到某个commit__

- git reset --hard hash
- github / gitlab PR页面，点击 revert 按钮，创建revert PR，再merge revert PR

```
// git log

commit 9f27f93f9dd73e5ee9cccc88b7e5839ed1dc0695 (HEAD -> test)
Author: fastclick <fastclick@intern.douban.com>
Date:   Fri Mar 15 11:52:03 2019 +0800

    Rebase the first and second commit.

commit 814350626c743f209c7f289df0e6d5669759e269
Author: fastclick <fastclick@intern.douban.com>
Date:   Fri Mar 15 11:14:44 2019 +0800

    hahaha2

commit f9ae709e225ee988a62163eb281013a7cb554149
Author: fastclick <fastclick@intern.douban.com>
Date:   Fri Mar 15 11:06:38 2019 +0800

    hahaha

commit 0dc9dcfdb99e6c70c32764703245b881580c39d7
Author: fastclick <fastclick@intern.douban.com>
Date:   Thu Mar 14 15:39:00 2019 +0800

    test

commit 6e9603e36424f919162feaaa8581a9f160ed54a1
Author: fastclick <fastclick@intern.douban.com>
Date:   Wed Mar 13 17:38:16 2019 +0800

    Hidden sub account surDplus.
```
```
// 我想将代码回滚到 Hidden sub account surDplus.

// git reset --hard hash
git reset --hard 6e9603e36

//出现如下信息
HEAD is now at 6e9603e Hidden sub account surDplus.

// git log
commit 6e9603e36424f919162feaaa8581a9f160ed54a1 (HEAD -> test)
Author: fastclick <fastclick@intern.douban.com>
Date:   Wed Mar 13 17:38:16 2019 +0800

    Hidden sub account surDplus.

commit b5815e0791c398f91f56fe75cc66f1545164901a
Author: fastclick <fastclick@intern.douban.com>
Date:   Wed Mar 13 15:47:55 2019 +0800

    Fix bug about count display error in package detail dialog.

// 回滚成功
```

## __取下某个commit到本地__

```
// 1.获取想取的commit的哈希值
git cherry-pick hash
```

## 储藏
场景：当你在当前分支下正在开发某一功能，可能有些代码还未来得及提交，这时突然来了一个需求，需要切换到另外一个分支，进行改动，而当前分支的代码可以不用提交，储存起来，切换分支，当再回来时，再取出来。

```
// 储存
git stash

// 取出
git stash pop

// 储存列表
git stash list

// 可以根据ID取对应的储存部分
```
## 追责
场景: 可查询某个文件,哪一行代码是谁写的,什么时候写的.

```
// git blame 文件
git blame  src/views/Home.vue
```

## 重写历史
场景: 修改已提交的 commit 信息

```
// 修改最近一条 commit 信息
git commit --amend
```
更多参考: [7.6 Git 工具 - 重写历史](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2)

## 将文件还原
场景: 某个文件可能进行了代码更改, 查看变化, 用完后要进行代码还原

```
git checkout -- package-lock.json
```

# 其它操作

## __vim基础操作__
注意：这些命令必须是英文输入法键入，不可以是中文输入法。

**1.创建文件**

```
vim test.js
```

**2.基础操作**

```
1.键入 i 进入插入模式 (即编辑模式)
  -- INSERT -- 

2.按 esc 退出编辑 ---> 在 不是插入模式 下，才可进行以下操作

  退出:
      :wq 保存并退出
      :q  退出不保存
      (若不能正常退出，后面加! 如 !wq q!)


  删除
      dd 删除一整行
      x  删除 (delete mac /Backspace win 只能向左推动光标)

  撤销
      u 相当于 ctrl + z

  移动光标
      fn + <- (方向键) 移动到行头
      fn + -> (方向键) 移动到行尾

  选中可视块
      fn + v + <- / ->

  复制
      y 复制选中内容

  粘贴 
      p 粘贴    
```

```
// 查看当前文件夹下有什么文件
ls -a

.                   .DS_Store           .gitignore          deploy.sh           node_modules        working-git-command
..                  .git                .history            docs                package.json        yarn.lock

// 进入某一位置 (tab可自动联想和查询)
cd /personal/travel

// 用vscode打开项目 (code 路径)
code /blog/working-git-command

// 重新开一个命令行，不需要将之前已经输入的删去
// 退出服务
control(^) + c 

// 新建文件夹
mkdir speak
```

```
history
场景：可以在终端上，无论是本地还是在服务器上，输入history，可以看到之前输入的命令历史，这有助于你不知道有些命令输什么，可以看之前别人输入的命令进行输入。
```












