# 「超详细React项目搭建教程一」企业级前端开发规范如何搭建🛠

前端代码规范对于团队而言至关重要，既可以提高代码的可维护性，也可以降低代码多人维护的成本

那如何搭建一个规范的前端项目基础呢？ 接下来让我告诉你

## 创建一个基础项目

使用 `npm init -y` 初始化一个前端项目,这会自动生成`package.json` 文件。当我们安装项目依赖的时候,这个文件会自动更新

接下来我们创建以下文件目录

```js
└── src/
    ├── index.ts    // 项目入口文件
├── package.json
```

## 添加 TypeScript

我们为什么需要 [TypeScript](https://link.juejin.cn/?target=https%3A%2F%2Fwww.tslang.cn%2Findex.html) 呢?

- TypeScript 会在编译代码时，进行严格的静态**类型检查**。意味着可以在编码阶段发现存在的隐患，而不用把隐患带到线上去
- TypeScript 会**包括来自 ES6 和未来提案中的特性**，比如异步操作和装饰器，也会从其他语言借鉴特性，比如接口和抽象类
- TypeScript 编译成 JavaScript 后，可以在任何浏览器/操作系统上运行。无需任何运行时的额外开销
- TypeScript 接口定义后,可以充分利用 VSCode 的**自动补全/自动提示**功能.因此可以直接代替文档，同时可以提高开发效率，降低维护成本

接下来我们在 CLI 中安装 TypeScript

```shell
yarn add typescript   --dev
```

然后进行 TypeScript 配置！ 在项目根目录通过`tsc --init`命令来创建 `tsconfig.json` 文件并替换为以下内容

有关 TypeScript 的详细配置可以查看[这篇文章](https://link.juejin.cn/?target=https%3A%2F%2Fwww.yuque.com%2Fu221766%2Fxgl0mb%2Fzz9g9q)

```json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "esnext",
    "lib": ["esnext", "dom"],
    "baseUrl": ".",
    "jsx": "react-jsx",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "noEmit": true
  },
  "include": [
    "src/**/*",
    "typings/**/*",
    "config/**/*",
    ".eslintrc.js",
    ".stylelintrc.js",
    ".prettierrc.js"
  ],
  "exclude": ["node_modules", "build", "dist"]
}
```

在我们的`React Build项目`中, 使用 Webpack 的 Babel 对项目代码进行编译,因此使用 TypeScript 的唯一目的仅仅是对项目代码进行类型检查。

因为 `tsconfig.json` 中的编译选项仅仅针对代码类型检查，而不是代码编译,因此不需要让 TypeScript 生成编译文件

以下是`tsconfig.json`中一些设置的解释

- `lib`: TS 需要引用的库，即声明文件，ES5 默认 dom,es5,scripthost
- `allowJs`: 允许编译 JS 文件(js,jsx)
- `allowSyntheticDefaultImports`: 允许从没有设置默认导出的模块中默认导入. [参考文档](https://link.juejin.cn/?target=https%3A%2F%2Fblog.leodots.me%2Fpost%2F40-think-about-allowSyntheticDefaultImports.html)
- `esModuleInterop`: [参考文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fzh%2Ftsconfig%23esModuleInterop)
- `skipLibCheck`:忽略所有的声明文件（ *.d.ts）的类型检查
- `strict`:开启所有严格的类型检查.如果 `strict=true`,则 所有 strict 相关的配置都应该为 true
- `forceConsistentCasingInFileNames`:禁止对同一个文件的不一致的引用.例如:引用文件时大小写必须一致
- `moduleResolution`:使用哪种模块解析策略.[参考文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.tslang.cn%2Fdocs%2Fhandbook%2Fmodule-resolution.html)
- `resolveJsonModule`:是否可以导入 JSON 模块.[参考文档](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fqq_38942978%2Farticle%2Fdetails%2F111319763)
- `isolatedModules`:每个文件必须是模块.[参考文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fzh%2Ftsconfig%23isolatedModules)
- `noEmit`:不生成输出文件
- `jsx`: 是否支持 JSX.[参考文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.tslang.cn%2Fdocs%2Fhandbook%2Fjsx.html)
- `include`:编译器需要编译的文件或者目录

## 添加 ESLint 代码规范校验

[ESLint](https://link.juejin.cn/?target=http%3A%2F%2Feslint.cn%2Fdocs%2Fuser-guide%2Fconfiguring) 可以帮助我们找出有问题的编码模式或不符合规则的代码

有关 ESLint 的详细讨论可以查看[这篇文章](https://link.juejin.cn/?target=https%3A%2F%2Fwww.yuque.com%2Fu221766%2Faxqfd2%2Fcwrrmz)

OK!让我们开始安装 ESLint 的相关依赖

```shell
yarn add eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

以下是一些 ESLint 依赖的解释

- `eslint`: ESLint 核心库

- ```
  eslint-plugin-react
  ```

  : React 代码规范的校验规则

  - `react/jsx-key`:用来检查是否声明了 key 属性
  - `no-array-index-key`:用来检查是否使用了数组索引声明 key 属性
  - [....其他 React 相关规范](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feslint-plugin-react)

- `eslint-plugin-react-hooks`

  :React hooks 代码规范的校验规则

  - rules-of-hooks: 用来检查 Hook 的规则(不能 if/循环中使用 Hooks)
  - [exhaustive-deps](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact%2Fissues%2F14920) 规则，此规则会在`useEffct`添加错误依赖时发出警告并给出修复建议

- `@typescript-eslint/parser`:将 TypeScript 代码纳入 ESLint 校验范围

- `@typescript-eslint/eslint-plugin`:TypeScript 代码规范的校验规则

在根目录创建`.eslintrc.json`文件并加入以下内容

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "react-hooks"],
  "extends": ["plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off"
  }
}

```

我们在 ESLint 配置文件中做了下面的事情

- 将`@typescript-eslint/parser` 作为[ESLint 解析器](https://link.juejin.cn/?target=http%3A%2F%2Feslint.cn%2Fdocs%2Fuser-guide%2Fconfiguring%23specifying-parser)
- 使用`plugin:react/recommended`/`plugin:@typescript-eslint/recommended`作为基本规则集
- 添加了两个 React Hooks 规则，并取消了 react/prop-types 规则,因为 prop 类型与 React 和 TypeScript 项目无关。
- 关闭了`explicit-module-boundary-types`,Typescript 中,必须明确指定函数的返回值类型。并且函数中的`return`后的类型必须与指定的类型一致 [参考文档](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypescript-eslint%2Ftypescript-eslint%2Fblob%2Fv4.4.0%2Fpackages%2Feslint-plugin%2Fdocs%2Frules%2Fexplicit-module-boundary-types.md%23configuring-in-a-mixed-jsts-codebase)

下面是一个 `explicit-module-boundary-types` 规则的例子

```ts
// 会出现 explicit-module-boundary-types警告,因为在TS中我们没有声明函数返回值类型
export default function () {
  return 1;
}

// 下面的函数不会出现警告
export var fn = function (): number {
  return 1;
};
```

TS 中可以通过**类型推断**判断出函数的返回值类型，因此可以关闭此 Lint

添加 NPM 脚本

```json
{
  "scripts": {
    "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx ",
    "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx ./src",
    "lint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx"
  }
}
```

- `lint-staged:js`: 只校验后缀名为`.js,.jsx,.ts,.tsx`的文件
- `lint:js`: 只校验`src`目录下,后缀名为`.js,.jsx,.ts,.tsx`的文件中,被修改过的文件。这会生成一个`.eslintcache`文件用来缓存已校验过的文件
- `lint:fix`: 根据 `.eslintcache`文件，校验被修改过的文件。并且自动修复

如果需要屏蔽不需要检测的文件或目录，可以在项目根目录添加 `.eslintignore` 文件。并加入类似的如下内容

```js
.DS_Store
node_modules
dist
build
public
```

## 添加 Prettier 代码自动格式化工具

[Prettier](https://link.juejin.cn/?target=https%3A%2F%2Fprettier.bootcss.com%2Fdocs%2Findex.html) 是一个代码格式化的工具.某些与代码校验有关的规则（例如，语句末尾是否加分号）就可以由 Prettier 自动处理。

有关 Prettier 的详细讨论可以查看[这篇文章](https://link.juejin.cn/?target=https%3A%2F%2Fwww.yuque.com%2Fu221766%2Faxqfd2%2Fcd17ov)

接下来我们在 CLI 中安装 Prettier

```shell
yarn add prettier  --dev
```

在项目根目录新建`.prettierrc` 并加入以下内容

`.prettierrc`是类似于`json`的文件，不能出现注释

```ts
{
    "printWidth": 100, 
    "semi": true, 
    "singleQuote": true, 
    "tabWidth": 2,
    "trailingComma": "all", 
    "bracketSpacing": true, 
    "jsxBracketSameLine": false, 
    "arrowParens": "always", 
    "requirePragma": false, 
    "proseWrap": "preserve" 
}
```

或者

在项目根目录新建`.prettierrc.js`(可以出现注释) , 并加入以下内容

```ts
module.exports={
    "printWidth": 100, // 换行字符串阈值
    "semi": true, // 句末加分号
    "singleQuote": true, // 用单引号
    "tabWidth": 2,
    "trailingComma": "all", // 最后一个对象元素加逗号
    "bracketSpacing": true, // 对象，数组加空格
    "jsxBracketSameLine": false, // jsx > 是否另起一行
    "arrowParens": "always", // (x) => {} 是否要有小括号
    "requirePragma": false, // 是否要注释来决定是否格式化代码
    "proseWrap": "preserve" // 是否要换行
}
```

为`VSCode` 安装 Prettier 插件

![img](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/33478ecafaa04f2e823c4404ffdc0925~tplv-k3u1fbpfcp-watermark.awebp)

通过在“设置”中勾选“保存时进行格式化”选项， 就可以在文件保存时使用 Prettier 进行自动格式化

![img](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/d7a31c11682e4b07bf680521c6e12a2c~tplv-k3u1fbpfcp-watermark.awebp)

如果需要屏蔽不必要的文件，可以在项目根目录添加 `.prettierignore`文件, 并加入以下内容

```js
*.svg
package.json
.DS_Store
.eslintignore
*.png
*.toml
.editorconfig
.gitignore
.prettierignore
LICENSE
.eslintcache
*.lock
yarn-error.log
/build
/public
```

添加 npm 脚本

```json
"scripts":{
  "lint:prettier": "prettier --check \"src/**/*\" --end-of-line auto",
  "prettier": "prettier -c --write \"src/**/*\""
}
```

解释一下脚本的含义

- `lint:prettier`:当想要检查文件是否已被格式化时，则可以使用`--check`标志（或`-c`）运行 Prettier。 这将输出一条语义化的消息和未格式化文件的列表。 上面脚本的意思是格式化`src`目录下的所有文件
- `prettier`:重新格式化所有已被处理过的文件。 类似于`eslint --fix`的工作。上面脚本的意思是重新格式化`src`目录下的所有文件

## 添加 EditorConfig 代码风格统一工具

[EditorConfig](https://link.juejin.cn/?target=https%3A%2F%2Feditorconfig.org%2F) 有助于维护跨多个编辑器和 IDE 从事同一项目的多个开发人员的一致编码风格，团队必备神器。

有关 EditorConfig 的详细讨论可以查看[这篇文章](https://link.juejin.cn/?target=https%3A%2F%2Fwww.yuque.com%2Fu221766%2Faxqfd2%2Faczzcm)

为`VSCode` 安装 EditorConfig 插件

![img](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/b4ac31b1edad4e6d974af841072938b7~tplv-k3u1fbpfcp-watermark.awebp)

在项目根目录创建`.editorconfig`并加入以下内容

```shell
# http://editorconfig.org
root = true

[*]
#缩进风格：空格
indent_style = space
#缩进大小2
indent_size = 2
#换行符lf
end_of_line = lf
#字符集utf-8
charset = utf-8
#是否删除行尾的空格
trim_trailing_whitespace = true
#是否在文件的最后插入一个空行
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

## 添加 stylelint

[stylelint](https://link.juejin.cn/?target=https%3A%2F%2Fstylelint.io%2Fuser-guide%2Fget-started) 是一个 CSS 规范校验工具，也支持 LESS 等 CSS 预处理器

有关 stylelint 的详细讨论可以查看[这篇文章](https://link.juejin.cn/?target=https%3A%2F%2Fwww.yuque.com%2Fu221766%2Faxqfd2%2Flvao3m)

为`VSCode` 安装 stylelint 插件

![stylelint](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/b36e73f0506741e58ccdac31d330aff5~tplv-k3u1fbpfcp-watermark.awebp)

安装依赖

```shell
yarn add stylelint stylelint-config-standard --dev
```

在根目录新建 `.stylelintrc.js`文件, 并加入以下内容

```js
module.exports = {
  extends: "stylelint-config-standard",
  rules: {
    // your rules
  },
  // 忽略其他文件，只校验样式相关的文件
  ignoreFiles: [
    "node_modules/**/*",
    "public/**/*",
    "dist/**/*",
    "**/*.js",
    "**/*.jsx",
    "**/*.tsx",
    "**/*.ts",
  ],
};
```

在`package.json`中配置 NPM 脚本

```json
"scripts":{
 "lint:style": "stylelint --fix \"src/**/*.less\" --syntax less",
}
```

解释一下脚本的含义: 自动修复`src` 目录下的所有 Less 文件不规范的内容

## ESLint/Prettier/stylelint 工具库推荐

推荐一个集成了 ESLint/Prettier/stylelint 的开源库 [umijs/fabric](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fumijs%2Ffabric). 它把所有的常见规范都集成在了一起，而不需要开发者再去单独维护。引用该库的方式也很简单

让我们安装该依赖

```shell
yarn add @umijs/fabric --dev
```

修改 ESLint/Prettier/stylelint 几个文件的配置

```js
// .prettierrc.js
const fabric = require("@umijs/fabric");

module.exports = {
  ...fabric.prettier,
};

// .stylelintrc.js
const fabric = require("@umijs/fabric");

module.exports = {
  ...fabric.stylelint,
};

// .eslintrc.js
module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  globals: {
    // 全局变量:在全局中使用 REACT_APP_ENV时  eslint就不会出现警告
    REACT_APP_ENV: true,
  },
};

```

注: 安装了`@umijs/fabric`就不能再安装其他 ESLint 解析器如`@typescript-eslint/parser`,否则会产生冲突

------

## 添加 Git Hook

只是单纯引入代码规范校验如果不强制执行就等于没做，总会有人偷懒，所以还可以加一道门槛进行约束。

我们可以通过 `lint-staged` 实现这道门槛:在 git commit 命令运行时先校验 lint（eslint, stylelint 等）是否通过，未通过则不予提交

- [husky](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhusky) 是一个 gitHook 工具，可以配置 git 的一些钩子，本文主要用来配置 commit 钩子
- [lint-staged](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Flint-staged) 是一个在 git 暂存文件上运行 lint 校验的工具，配合 husky 配置 commit 钩子，用于 git commit 前的强制校验

有关 Git Hook 的讨论可以参考[这篇文章](https://juejin.cn/post/6904150964266074119)

安装依赖

```shell
yarn add husky lint-staged --dev

{
  "scripts": {
    "precommit": "lint-staged",
    "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "**/*.less": "stylelint --syntax less",
    "**/*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
    "**/*.{js,jsx,tsx,ts,less,md,json}": ["prettier --write"]
  }
}

```

在每次` git commit` 之前会进入工作区文件扫描，自动修复 `eslint/stylelint` 问题再使用 `prettier` 自动格式化，最后再提交到工作区。

注:

必选先使用`git init` 初始化 git 仓库，之后使用 `husky` 才能生效

> 如果预提交钩子不生效可以参考 stackoverflow 上的这个问题: [lint-staged not running on precommit](https://link.juejin.cn/?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F50048717%2Flint-staged-not-running-on-precommit)

## Commit Message 规范

大量的代码提交，必然会产生大量的 Commit log. 每一条都 Commit log 记录着某一阶段所完成的事以及关注点，应该尽可能详细具体；在工作中一份清晰规范的 Commit Message 能让后续代码审查、信息查找、版本回退都更加高效可靠。

### Commit message 格式

`<type>: <subject>` 注意冒号后面有空格。

#### type

用于说明 commit 的类别，只允许使用下面 7 个标识。

- `feat`：新功能（feature）
- `fix`：修补 bug
- `docs`：文档（documentation）
- `style`： 格式（不影响代码运行的变动）
- `refactor`：重构（即不是新增功能，也不是修改 bug 的代码变动）
- `test`：增加测试
- `chore`：构建过程或辅助工具的变动

如果 type 为 `feat` 和 `fix`，则该 commit 将肯定出现在 Change log 之中。

#### subject

subject 是 commit 目的的简短描述，不超过 50 个字符，且结尾不加句号（.）。

### 栗子

```shell
git commit -m 'feat:添加了一个用户列表页面'

git commit -m 'fix:修复用户列表页面无法显示的bug'

git commit -m 'refactor:用户列表页面代码重构'
```

这里多一嘴: 网上有许多教程通过[commitizen](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcommitizen) 实现强制的 Commit Message 格式规范，我是不赞同的。规范应该是每个开发者自发遵循的,如果规范过多记不住，可以通过 ESLint 等强制执行养成习惯。但对于这种简单的规范我们应该自发遵守，更何况还有规范校验的最后一道门槛-团队代码审查(轻则被团队大佬喷的体无完肤，重则卷铺盖走人 🙄)

## 参考文档

1. [一套标准的前端代码工作流-掘金](https://juejin.cn/post/6921223155621036039)
2. [Ant-Design-Pro](https://link.juejin.cn/?target=https%3A%2F%2Fgitee.com%2Fmirrors%2FAnt-Design-Pro%2Fblob%2Fmaster%2Fpackage.json)

------

## 最后

本篇文章详细地为大家介绍了如何搭建一个企业级的规范前端项目,主要包含

- `TypeScript`
- `ESLint`
- `Prettier`
- `EditorConfig`
- `stylelint`
- `Git Hook`
- `Git 提交规范`

# 「超详细React项目搭建教程二」集成 Webpack5/React17

在[「超详细React项目搭建教程一」企业级前端开发规范如何搭建🛠](https://juejin.cn/post/6947872709208457253)中我们已经使用 TypeScript/ESlint/Prettier/EditorConfig/stylelint,搭建好了前端规范的基础设施。

这篇文章将会在前文的基础上配置 Webpack5 和 React17。

在我们的 Webpack 构建的过程中将会包含

- 使用 Typescript 进行类型检查
- 使用 Eslint 进行代码规范检查

因为这些能帮助我们提高代码质量。我们还会

- 配置 Webpack 热更新
- 配置 Webpack 以区分开发/生产环境

以便提高我们的开发体验。接下来让我们开始吧！！！

## 创建一个基础项目

接下来我们创建以下文件目录

```js
└── config/                                            // webpack配置文件
    ├── webpack.dev.js
    ├── webpack.pro.js
    ├── webpack.common.js
└── public/
    ├── index.html/                                   // html模板文件
└── src/
    ├── index.tsx                                    // 项目入口文件
├── package.json

```

在 `index.html` 中添加如下代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react-app</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

这个 HTML 文件是 Webpack 构建过程中的模板文件。目的是告诉 Webpack 将 React 代码注入到 `id="root"`的 div 元素中，并在 HTML 中自动引入打包好的 JavaScript 和 CSS。

## 添加 React

安装 React 及其对应的类型库

```shell
yarn add react react-dom

yarn add   @types/react @types/react-dom --dev
```

## 添加 React 根组件

创建一个 `src/index.tsx` 来编写 React 组件，此代码将会被展示到`index.html` 文件`id="root"`的 div 元素下

```jsx
import React from "react";
import ReactDOM from "react-dom";

const App = () => <h1>My React and TypeScript App!</h1>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

```

在上面的代码中,我们使用[React.StrictMode](https://link.juejin.cn/?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fstrict-mode.html%23gatsby-focus-wrapper) 创建组件并插入到`id="root"`的 div 元素下

## 添加 Babel

在项目中,我们需要使用 Babel 将 React 和 TypeScript 代码转换为 JavaScript。接下来我们安装一些 Babel 工具

```shell
 yarn add @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime @babel/runtime   --dev

```

以下是一些 Babel 依赖的解释

- `@babel/core`:Babel 核心库
- `@babel/preset-env`:让我们可以在不支持 JavaScript 最新特性的浏览器中使用 ES6+语法
- `@babel/preset-react`:将 React 代码转换为 JavaScript
- `@babel/preset-typescript`:将 TypeScript 代码转换为 JavaScript
- `@babel/plugin-transform-runtime` 和`@babel/runtime`:支持在低版本浏览器使用 ES6+语法,如 `async/await`

## Babel 配置

我们通过`.babelrc`文件来进行 Babel 配置，在根目录创建此文件并加入以下内容

```js
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}

```

上面的配置是告诉 Babel 使用哪些插件

## 添加 Webpack

Webpack 是目前最流行的前端模块打包工具。接下来我们开始安装 Webpack 依赖

```shell
yarn add webpack webpack-cli @types/webpack --dev

```

在开发环境中，我们还要使用 Webpack 为我们提供的 [web server](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fdev-server%2F)功能

```shell
yarn add webpack-dev-server @types/webpack-dev-server  --dev

```

安装`babel-loader`-通知 Babel 将 React 和 TypeScript 代码转换为 JavaScript

```
yarn add babel-loader  --dev

```

安装 `html-webpack-plugin`-用来生成 HTML 模板

```
yarn add html-webpack-plugin  --dev

```

## 开发环境配置

我们需要为 Webpack 添加几个配置文件

- 公共配置文件
- 开发环境配置文件
- 生产环境配置文件

> 注: Webpack 配置文件的代码需要符合 `CommonJs`规范。

让我们首先配置开发环境文件，在根目录创建 `config/webpack.dev.js`并加入以下内容

```ts
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    // webpack v4+ 版本不支持contentBase，改成static
    // contentBase: path.join(__dirname, '../build'),
    static: {
      directory: path.join(__dirname, '../build'),
    },
    historyApiFallback: true,
    port: 4000,
    hot: true, // hot:true
  },
};

module.exports = config;

```

下面是一些相关配置的解释

- `mode` : 构建开发环境代码还是生产环境代码。在上面的配置中我们使用`development`. Webpack 会自动将 `process.env.NODE_ENV`设置为`development`
- `output.public`:构建的根路径是什么。
- `entry` :模块构建的入口文件.在我们的项目中,入口是 `src/index.tsx`
- `module`: 用于处理不同的资源模块.在我们的项目中，用`babel-loader`来处理`.js`,`.jsx`,`.js`,`.tsx` 后缀的文件
- `resolve.alias`: 可以让我们在引入模块路径时使用别名
- `resolve.extensions`告诉 Webpack 在模块解析期间要按顺序查找哪些文件的后缀,以方便我们在在引入模块文件时不带后缀名。
- `HtmlWebpackPlugin`:用来创建 HTML 文件.在上面的配置中，我们告诉此插件使用`public/index.html` 作为文件模板
- `HotModuleReplacementPlugin`/`devServer.hot`:修改业务代码后界面可以自动局部刷新，而不是整体刷新
- `devtool`: 使用`inline-source-map`，可以在让我们在谷歌开发工具中调试源代码
- `devServer`: 启动 Webpack 开发服务器，我们告诉 Webpack web 服务的根路径是 `build`目录,并且在`4000`端口上启动服务. `historyApiFallback` 对于多页面应用是比较有用的。最后，使用`open`在服务启动后自动打开浏览器

## 为开发环境添加 NPM 脚本

为了方便以开发模式启动应用,可以利用 npm 脚本-将以下内容添加到`package.json`中

```json
  ...
  "scripts": {
    "start": "webpack serve --config config/webpack.dev.js",
  }
  ...

```

以上脚本会启动一个 Webpack 下的开发环境服务器.并且使用 `config` 选项来引用开发环境配置文件

启动应用

```shell
yarn start

```

N 秒后，Webpack development server 将会启动，然后我们在浏览器中访问`http://localhost:4000`

![image-20211202124138400](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/image-20211202124138400.png)

> 注意:Webpack 并没有在 build 目录生成任何文件，这是因为 Webpack 服务启动后文件都在内存中

现在，我们修改 React 代码内容并观察变化.当我们保存代码后，浏览器会自动刷新

![image-20211202124203016](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/image-20211202124203016.png)

## 在 Webpack 中手动配置热更新插件

可能因为各种各样的原因导致 webpack 的 HMR 不生效。我们还可以手动配置热更新插件！

安装 React 热更新插件[react-refresh-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpmmmwh%2Freact-refresh-webpack-plugin)

```shell
yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh

```

修改`config/webpack.dev.js`并加入以下内容

```ts
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const config = {
  // 指定target为 web
  target: "web",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/i,
        include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true,
                },
              ],
              // 热更新加载器
              "react-refresh/babel",
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 热更新插件
    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/],
    }),
  ],
};

```

如果热更新配置遇到问题，可以参考以下 issue

- [Webpack 5 does not re render](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpmmmwh%2Freact-refresh-webpack-plugin%2Fissues%2F252%23issuecomment-726396080)
- [HMR/Live Reloading broken after Webpack 5](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack-dev-server%2Fissues%2F2758%23issuecomment-706840237)

## 在 webpack 构建过程中添加类型检查

目前, Webpack 构建过程没有做任何类型检查，我们可以使用`fork-ts-checker-webpack-plugin` 让 Webpack 构建过程支持类型检查。这意味着 Webpack 会通知我们任何类型相关的错误。 接下来我们安装相关依赖

```shell
yarn add fork-ts-checker-webpack-plugin @types/fork-ts-checker-webpack-plugin --dev

```

在`webpack.dev.js`添加如下配置

```ts
...
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const config = {
  ...,
  plugins: [
    ...,
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
  ],
};

```

我们使用 `async` 标志来告诉 Webpack 等待代码的类型检查结束，然后才提交代码进行编译

修改后，我们需要重新启动应用

让我们在 `src/index.tsx` 中做如下修改

```ts
...
const App = () => <h1>My React and TypeScript App!! {today}</h1>;
...

```

当然，控制台报错了，因为使用了一个未定义的变量`today`。Webpack 将在终端中显示此类型错误

![Webpack进行类型检查](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/a97d6a3a217c47bca339fae5d20f0bc0~tplv-k3u1fbpfcp-watermark.awebp)

现在，可以修改为类似的如下代码来解决此问题

```ts
const App = () => (
  <h1>My React and TypeScript App!! {new Date().toLocaleDateString()}</h1>
);

```

控制台的类型错误消失了，刷新浏览器界面后显示为正确的内容

![ today’s date](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/13480bdc143041c99132d39350e498b4~tplv-k3u1fbpfcp-watermark.awebp)

## 在 webpack 构建过程中添加代码规范校验

目前，Webpack 构建流程不会执行代码规范校验。 我们可以使用`ESLintPlugin`来使 Webpack 构建过程能够使用 ESLint 进行代码规范校验。 这意味着 Webpack 会通知我们任何代码规范校验的错误。 让我们安装这个依赖

```shell
yarn add eslint-webpack-plugin --dev

```

在 `webpack.dev.js` 修改如下内容

```ts
...
const ESLintPlugin = require('eslint-webpack-plugin')

const config = {
  ...,
  plugins: [
    ...,
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
};

```

在 `src/index.tsx` 中，添加一个未使用的变量

```ts
const unused = "something";

```

Webpack 将会在控制台出现如下的代码校验警告

![Webpack进行代码规范校验](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/a477de7d6e5d43f2aaf13f1c3cd796fd~tplv-k3u1fbpfcp-watermark.awebp)

## 生产环境配置

Webpack 的生产环境配置与开发环境有些不同-我们需要项目代码被打包到文件目录中，并且做一定的优化

- 不需要热更新/代码规范校验等功能
- 为打包的文件名生成 hash 串
- 清空打`build`目录
- 压缩代码
- ......

让我们创建`webpack.pro.js`并加入以下内容

```ts
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "production",

  entry: {
    main: path.resolve(__dirname, "../src/index.tsx"),
  },
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "",
    path: path.resolve(__dirname, "../build"),
    // 打包前清空输出目录
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
};

module.exports = config;

```

配置与开发环境很像，但是又有以下不同

- 我们将`mode`设置为 production. Webpack 会自动将`process.env.NODE_ENV`设置为`production`.这意味着打包后的代码中不会包含 React 开发者工具
- `output`告诉 Webpack 将打包后的资源放到哪里.在我们的项目中，是放在`build` 目录中.
  - 如果项目中做了代码分离(code split).我们使用`[name]`标志告诉 Webpack 分离后的文件名称
  - 同时将`[contenthash]`标志加入到文件名称中.以便在代码内容更改后，打包以生成新的文件名称。这就可以避免浏览器缓存旧的文件
  - `clean: true`用来在每次打包构建前清空`build`目录，而不需要额外的插件，比如`CleanWebpackPlugin`

## 为生产环境添加 NPM 脚本

让我们为生产环境添加 NPM 脚本

```json
  ...,
  "scripts": {
    "build": "webpack --config config/webpack.pro.js",
  },
  ...

```

该脚本可以启动 Webpack 打包流程。 我们使用`config`选项来引用我们刚刚创建的生产配置文件。

在终端运行以下命令：

```shell
npm run build

```

N 秒后，Webpack 将会在 `build` 目录生成打包后的文件

如果我们查看 JavaScript 文件，可以发现它是被压缩过的。因为 Webpack 在生产模式会使用`TerserWebpackPlugin`来压缩代码。

打包后的 JavaScript 文件也包含了我们应用程序中的所有代码以及 `react` 和 `react-dom` 依赖包中的代码。

如果我们查看 html 文件，会发现所有空格/换行都已被删除。 如果仔细观察，我们会看到一个 script 元素，该元素是通过`HtmlWebpackPlugin`自动插入的，以便引用打包后的 JavaScript 文件。

![打包后的HTML](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/06522061d27a4ce7a88541b0bb02ac53~tplv-k3u1fbpfcp-watermark.awebp)

## 抽离 Webpack 的公共配置

虽然，我们将 生产环境 和 开发环境 做了区分，但是我们还是应该遵循不重复原则(Don't repeat yourself - DRY)，保留一个 "common(通用)" 配置。为了将这些配置合并在一起，我们使用一个名为 `webpack-merge` 的工具。此工具会引用 "common" 配置，因此我们不必再在环境特定(environment-specific)的配置中编写重复代码。 [参考文档](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fguides%2Fproduction%2F)

我们先从安装 `webpack-merge` 开始

```shell
yarn add  webpack-merge --dev

```

添加 `config/webpack.common.js` 文件并加入以下配置

```ts
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx'),
  },
  // 指定target为 web
  target: 'web',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Build',
      template: 'public/index.html',
    }),
  ],
};

```

修改 `config/webpack.dev.js` 的配置

```ts
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build'),
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/i,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                },
              ],
              // 热更新加载器
              'react-refresh/babel',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 热更新插件
    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/],
    }),
    // 使用fork-ts-checker-webpack-plugin 让 Webpack 构建过程支持类型检查。这意味着 Webpack 会通知我们任何类型相关的错误
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    // 使用 ESLintPlugin 来使 Webpack 构建过程能够使用 ESLint 进行代码规范校验
    // 比如：'unused' is declared but its value is never read.
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    // webpack v4+ 版本不支持contentBase，改成static
    // contentBase: path.join(__dirname, '../build'),
    static: {
      directory: path.join(__dirname, '../build'),
    },
    historyApiFallback: true,
    port: 4000,
    hot: true,
  },
});

```

修改`config/webpack.prod.js`的配置

```ts
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '',
    path: path.resolve(__dirname, '../build'),
    // 打包前清空输出目录
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
});

```

在 `webpack.common.js` 中，我们设置了 `entry` 和 `output` 配置，并且在其中引入了开发/生产环境公用的全部插件。

在 `webpack.dev.js` 中，我们将 `mode` 设置为 `development`，并且为此环境添加了推荐的 `devtool`（强大的 source map）和简单的 `devServer` 配置。

在 `webpack.prod.js` 中，我们将 `mode` 设置为 `production`

随便运行下 NPM 脚本，然后查看输出结果的变化都能按预期所展示

------

完美! 😊 现在我们的项目已经准备就绪，并可以有效地开发 React 和 TypeScript 应用程序了。通过 build 命令也可以轻松地将项目集成到 CI / CD 流程中

# 「超详细React项目搭建教程三」集成 CSS/Less/Sass/Antd

在上一篇文章中，我们使用 TypeScript/ESLint/Webpack 搭建了一个 React 应用。这篇文章中,我们继续在上一篇文章的基础上加入 CSS/Less/Sass/Antd

## 在代码中引入 CSS

创建一个`src/pages/CssDemo/index.tsx`组件并添加一个 CSS 类名

```ts
import React from "react";

const Index: React.FC = () => {
  return (
    <div className="container">
      <div>CSSDemo</div>
    </div>
  );
};

export default Index;

```

然后我们在组件的同级目录创建一个 `index.css`文件并加入以下内容

```css
.container > div {
  font-size: 20px;
  color: blue;

  width: 200px;
  height: 200px;
  border: 1px solid gray;
}

```

通过`npm start` 启动应用

当然！样式肯定是不会生效的。因为组件根本不知道`container`是在哪里被定义的。 so!我们需要在组件中导入样式文件模块

```ts
import "./index.css";

```

Webpack 会提示错误:"Module parse failed: Unexpected token".错误 ❎ 的原因是我们使用了一个 Webpack 无法解析的文件模块

![Webpack无法解析CSS](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/c7123a4b9cf7457e8a57c9599a50b315~tplv-k3u1fbpfcp-watermark.awebp)

## 为开发环境配置 CSS

我们需要让 Webpack 知道如何解析 CSS 文件，因此我们需要在`webpack.dev.js`中加入两个解析器

```js
const config= {
  ...
  module: {
    rules: [
      ...,
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  ...
};

```

这样配置后，当 Webpack 再遇到`.css`文件时，它将使用`css-loader`和`style-loader`进行处理（use 数组中的加载器从后向前执行）。

- `css-loader` 在 import 语句（在我们的示例中为`app.css`）中读取引用的 CSS 文件并解析成 JavaScript 代码。
- `style-loader` 将 JavaScript 代码中的 CSS 以 style 标签的形式插入到 html 文件中。

为了使新的 Webpack 配置正常工作，我们需要安装`css-loader`和`style-loader`：

```shell
yarn add css-loader style-loader --dev

```

接下来重新启动应用并观察界面，当然！样式生效了!

![no-cssModules-demo-right](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/f279064aae30424d889fdb1f23d87281~tplv-k3u1fbpfcp-watermark.awebp)

## 为生产环境配置 CSS

在生产环境中，需要把 CSS 样式抽离成单独的文件(避免浏览器缓存). 我们可以使用`mini-css-extract-plugin`代替`style-loader`来做到这一点。

[webpack 官方文档有说:](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fextract-text-webpack-plugin%2F%23usage)

> 从 webpack v4 开始,应该使用`mini-css-extract-plugin` 替换`extract-text-webpack-plugin`

接下来，我们安装`mini-css-extract-plugin`及其 TypeScript 类型库

```shell
yarn add mini-css-extract-plugin @types/mini-css-extract-plugin --dev

```

然后，我们需要把此 loader 加入到生产环境配置文件中，在`webpack.prod.js`中修改如下内容

```js
...
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config= {
  ...,
  module: {
    rules: [
      ...,
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  ...,
  plugins: [
    ...,
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  ...
};

```

`mini-css-extract-plugin`会将 CSS 样式从 JS 代码中抽离出来并创建.css 文件

如果我们的应用使用了 code split

- 那么可以使用[name]标志来让 Webpack 命名新的 CSS 文件。
- 当内容更改时，使用[contenthash]标志更改已打包的新的文件名称，这也可以避免浏览器缓存。

来，我们打一个包看看

```shell
yarn run build

```

我们可以看到在 `build`目录下已经生成了 CSS 文件

![build/file.css](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/ff3461f2233f438b8920449692205bdf~tplv-k3u1fbpfcp-watermark.awebp)

然后我们查看 HTML 文件，发现 CSS 文件也被自动引入了

![html自动引入/file.css](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/55f302ee17504abfbf63a526281fb364~tplv-k3u1fbpfcp-watermark.awebp)

## 为多个组件添加样式

接下来我们在`cssDemo/index.tsx`组件中添加两个子组件，并且导入两个样式文件

```ts
import "./heading.css";
import "./content.css";

const App = () => (
  <>
    <Heading />
    <Content />
  </>
);
const Heading = () => <h1 className="heading">My React and TypeScript App</h1>;

const Content = () => <div className="content">With CSS!</div>;

```

两个 CSS 文件内容如下所示

```css
/* heading.css */
.heading {
  color: red;
}

/* content.css */
.content {
  color: green;
}

```

然后通过`yanr start`启动应用查看界面效果,我们发现样式文件被转换了，变成了两个 style 标签引入到了 HTML 文件中

![开发环境下的样式效果](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/f00731e0109c4d16aba465eef6daf680~tplv-k3u1fbpfcp-watermark.awebp)

接下来执行`yarn run build`打包项目，并查看打包后的文件，我们看到 CSS 生成了单独的文件

![生产环境下的样式文件效果](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/969efbfb18a94e85857404c2198e0b4e~tplv-k3u1fbpfcp-watermark.awebp)

是不是很有趣！🙂

## 使用 CSS modules

到这里，有经验的同学应该会发现一个问题: 开发人员必须仔细命名 CSS 类，才能避免样式名称冲突。 例如，如果我们将两个 CSS 类都称为“text”，那么标题和内容的颜色是什么呢？

![样式冲突](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/ccbcf91e2d494f5188e6df262847ecc2~tplv-k3u1fbpfcp-watermark.awebp)

第二个 CSS 类的优先级高于第一个 CSS 类，导致两段文本均为绿色。

如何解决呢？

`CSS modules` 可以通过将 CSS 名称限定到特定组件中来解决样式类名冲突问题

接下来我们`CV`如下代码实现`CSS modules` ：

```ts
import heading from "./heading.module.css";
import content from "./content.module.css";
...
const Heading = () => (
  <h1 className={heading.heading}>My React and TypeScript App</h1>
);
const Content = () => <div className={content.content}>With CSS!</div>;

```

import 语句跟原来的略有不同。 我们通过引用`.module.css`后缀的文件，并从中导入为一个变量

这个变量是一个对象，包含了对应样式文件的所有 CSS 类名称, 然后在组件中引用对应的类名变量

我们还需要将`content.css`重命名为`content.module.css`，将`heading.css`重命名为`heading.module.css`。

但是！TypeScript 编译出现错误 ❎“无法找到模块'.module.css'或对应的类型声明”错误，因为 TS 无法解析`CSS modules`

![TS无法解析CSS modules](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/f9202c438c1f49c2b0296a1121f9658d~tplv-k3u1fbpfcp-watermark.awebp)

为了解决这个错误，我们需要创建一个`src/typings.d.ts`类型声明文件并加入以下内容

```ts
declare module "*.module.css";
复制代码
```

之后重启应用，再次查看界面效果，可以发现样式按预期的正常显示了

![TS正常解析CSS modules](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/d469aff519e84e829fe64a543c850865~tplv-k3u1fbpfcp-watermark.awebp)

我们看到 CSS 类名称被赋予了一个看起来很随机的名称。 因为这样可以确保不同组件中的样式名称不会冲突。

如果我们还记得在组件中引用类名称的方式，那看起就有些奇怪了：

```ts
className={fileName.cssClassName}

```

为什么代码中导入的样式类名与生成后的类名不一样？因为上面的代码其实在通知 Webpack 为类名称赋予全局唯一的名称。

接下来，我们再看看`npm run build`后的样式文件，我们发现生产环境的样式文件类名也是全局唯一的

![生产环境的样式类名](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/b123027d10dc48e391368fbfcc064af9~tplv-k3u1fbpfcp-watermark.awebp)

## CSS modules 的引用方式优化

每次都需要通过 `*.module.css`的方式实现 CSS modules 不免有些麻烦。其实，我们可以通过修改 Webpack 配置简化 CSS modules 的写法

修改`webpack.dev.js` 的配置, [CSS modules 官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.webpackjs.com%2Floaders%2Fcss-loader%2F)

```js
...
      {
        test: /\.css$/i,
        use: ["style-loader", {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
        ],
      },
...

```

修改`webpack.pro.js` 的配置

```js
...
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },],
      },
...

```

修改`typings.d.ts` 的配置

```ts
declare module "*.css";

```

我们还需要将`content.module.css`重命名为`content.css`，将`heading.module.css`重命名为`heading.css`。

修改 App 组件中导入的样式名称

```ts
import contentStyle from "./content.css";
import headingStyle from "./heading.css";

```

最后重新启动应用查看界面效果，可以发现与之前的效果一致

写法更简洁了是吧？😯

## 在项目中配置 Less

真实工作中，我们一般需要一些 CSS 预编译器以提高我们的工作效率，先说如何配置 Less [webpack 参考文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.webpackjs.com%2Floaders%2Fless-loader%2F%23%E5%AE%89%E8%A3%85)

修改`webpack.dev.js` 配置

```ts
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },

```

修改`webpack.pro.js` 配置

```ts
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 1,
          },
        },
        {
          loader: "less-loader",
        },
        ],
      },

```

为了使新的 Webpack 配置正常工作，我们需要安装`less-loader`和`less`：

```shell
yarn add less less-loader --dev

```

注意:还需要在`typings.d.ts` 中加入以下内容,否则 Typescript 无法识别 Less 类型

```ts
declare module "*.less";

```

## 为组件添加 Less

接下来我们在 `src/lessDemo/index.tsx` 组件中导入 less 文件

```ts
import React from "react";

import style from "./index.less";

const Index: React.FC = () => {
  return (
    <div className={style.container}>
      <div>LessDemo</div>
    </div>
  );
};

export default Index;

```

Less 文件内容如下所示

```css
@color: purple;

.container {
  div {
    font-size: 20px;
    color: @color;
    width: 200px;
    height: 200px;
    border: 1px solid gray;
  }
}

```

然后通过`yanr start`启动应用查看界面效果,我们发现样式文件被转换了，变成了两个 style 标签引入到了 HTML 文件中

![开发环境下的Less样式效果](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/d881a1d8cfed4ac6b7bbf71fd8c9c743~tplv-k3u1fbpfcp-watermark.awebp)

接下来执行`yarn run build`打包项目，并查看打包后的文件，我们看到 Less 和其他的 CSS 一起 生成了单独的文件

![生产环境下的样式文件效果](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/866391001ecb45a89377ec267d2743ae~tplv-k3u1fbpfcp-watermark.awebp)

是不是很有趣！🙂

## 在项目中配置 Sass

接下来我们看看如何配置 Sass,其实与 Less 的设置方式是类似的 . [webpack 参考文档][14]

修改`webpack.dev.js` 配置

```ts
      {
        test: /\.s[ac]ss$/i,
        use: [
          //从包含CSS的JS代码中 创建 `style` 节点
          {
            loader: "style-loader",
          },
          // 将 CSS 转换为 CommonJS 格式的JS代码
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          // 将 Sass 转换为 CSS
          {
            loader: "sass-loader",
          },
        ],
      },

```

修改`webpack.pro.js` 为如下配置

```ts
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 1,
          },
        },
        {
          loader: "sass-loader",
        },
        ],
      },

```

为了使新的 Webpack 配置正常工作，我们需要安装`sass-loader`和`sass`：

```shell
yarn add sass sass-loader --dev

```

注意:还需要在`typings.d.ts` 中加入以下内容,否则 Typescript 无法识别 sass/scss 类型

```ts
declare module "*.sass";
declare module "*.scss";

```

## 为组件添加 Sass

接下来我们为 `src/sassDemo/index.tsx` 组件入 Sass 样式文件

```ts
import React from "react";

import style from "./index.scss";

const Index: React.FC = () => {
  return (
    <div className={style.container}>
      <div>SASSDemo</div>
    </div>
  );
};

export default Index;

```

Ssss 文件内容如下所示

```scss
$color: red;

.container {
  div {
    font-size: 20px;
    color: $color;
    width: 200px;
    height: 200px;
    border: 1px solid gray;
  }
}

```

然后通过`yanr start`启动应用查看界面效果,跟预期一样...

## 为项目添加 UI 库-Antd

在真实开发中，我们一般使用 UI 库来提高我们的界面开发效率。国内最火的 React UI 库非 `Antd`莫属。接下来我们开始配置吧

首先安装 `Antd` 依赖

```shell
yarn add antd

```

修改 `sr/pages/antdDemo/index.tsx`组件-引入一个 Button 组件

```ts
import React from "react";
import { Button } from "antd";

const Index: React.FC = () => {
  return (
    <div>
      <Button type="primary">Antd 按钮</Button>
    </div>
  );
};

export default Index;

```

通过`yarn start`启动项目并观察界面效果，我们发现按钮被成功引用了，但是却没有显示正确的样式

![antd没有显示正确的样式](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/2e03a568d3ee4fd39b03d932f99acdc2~tplv-k3u1fbpfcp-watermark.awebp)

接下我们给 Antd 加上样式

```ts
import React from "react";
import { Button } from "antd";

import "./index.less";

const Index: React.FC = () => {
  return (
    <div>
      <Button type="primary">Antd 按钮</Button>
    </div>
  );
};

export default Index;

```

`index.less`的内容如下

```less
@import "~antd/dist/antd.less";

```

这里可以发现，Antd 的样式是基于 Less 实现的

保存代码后却发现 Webpack 编译报错"Module build failed"

![antd-style-error](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/79439c9c926049269bf6a79d1412815c~tplv-k3u1fbpfcp-watermark.awebp)

我们根据报错中的 issue 地址去找解决方案，有方案说`Less加上javascriptEnabled`即可

来我们加一下看看

```ts
      {
        test: /\.less$/i,
        use: ["style-loader", {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              },
            },
          },
        ],
      },

```

设置完成后重启项目并观察界面效果，但是我们发现 Antd 还是没有样式，那么我们继续查找 issue

真实原因:

> 因为我们的 webpack 项目配置了 css-modules ，它会将 Ant 的样式模块化前缀及哈希化处理，导致样式不匹配.
>
> 因此建议 CSS 模块化配置将 node_modules 目录文件 exclude 掉，不要让它们走 CSS Modules
>
> 换句话说，就是让 antd 的 less 不通过 css-module-loader，只让项目自己的 less 文件通过 css-module-loader

正确的 Webpack 配置如下

```js
const config = {
   ........
  module: {
    rules: [
       ........
      {
        test: /\.less$/i,
        use: ["style-loader", {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
          {
            loader: "less-loader",
          },
        ],
        exclude: path.resolve(__dirname, "../src/app.less"),
      },
      {
        test: /\.less$/i,
        use: ["style-loader", {
          loader: "css-loader",
        },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              },
            },
          },
        ],
        include: path.resolve(__dirname, "../src/app.less"),
      },
    ]
  },
  ........

```

修改`src/app.less`的内容

```less
@import "~antd/dist/antd.less";

/* 全局样式，没有CSS modules

作用:
1. 覆盖Antd样式
2. 定义全局公共样式
*/

.myText {
  color: red;
}

```

修改`src/index.tsx`内容

```ts
import React from "react";
import ReactDOM from "react-dom";

import './app.less'
import AntdDemo from "./pages/antdDemo";
........

const App = () => (
  <>
  ....
    <AntdDemo />
  ....
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

```

重新启动项目，发现样式正常显示了，😆

![img](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/9be8cf7c024246cca5971d447608de61~tplv-k3u1fbpfcp-watermark.awebp)

------

难道这就结束了吗？🙅‍♂️ 不，离搭建一个完整的 React 应用有些距离。那么在下一篇文章中，我会告诉你如何在项目中集成图片/字体资源

# 「超详细React项目搭建教程四」集成图片/字体

在上一篇文章中，我们通过 Webpack 为 React/TypeScript 项目添加了 CSS 模块，在这篇文章中，我们继续在上一篇文章的基础上为前端项目配置图片模块

## 在代码中引入图片

我们在任意组件中通过 img 标签引入一张图片

```ts
import React from "react";

const Index: React.FC = () => {
  return (
    <div>
      <img src="../../assets/flower.jpeg" alt="flower.jpeg无法显示" />
    </div>
  );
};

export default Index;

```

通过`yarn start`启动应用并查看界面效果，我们发现图片无法识别出来

![图片无法识别](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/035dd1c4e244422a948a9744f37861e0~tplv-k3u1fbpfcp-watermark.awebp)

此时，Webpack 没有做任何与图片模块相关的事情

👌！我们通过 ES6 的方式导入图片 ，也许 Webpack 就可以识别此模块并构建它

```ts
import React from "react";

import flower from "../../assets/flower.jpeg";

const Index: React.FC = () => {
  return (
    <div>
      <img src={flower} alt="flower.jpeg无法显示" />
    </div>
  );
};

export default Index;

```

但是我们得到一个 TypeScript 报错

![TypeScript 无法识别图片](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/7203b5a674f045c6b1aad90dd82daadf~tplv-k3u1fbpfcp-watermark.awebp)

这个错误与上一篇文章的 CSS 报错很类似啊。为了解决这个错误，我们在`src/typings.d.ts`中加入以下内容

```ts
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

```

现在 TypeScript 可以识别图片模块了，但是 Webpack 还是无法解析图片模块

![webpack 无法识别图片](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/ac71dad68a2249ee962440527f333570~tplv-k3u1fbpfcp-watermark.awebp)

## 配置 Webpack 以解析图片

Webpack-V5 使用了最新的方式解析静态资源模块，[asset module 官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fguides%2Fasset-modules%2F%23resource-assets)

```ts
const config= {
  ...
  module: {
    rules: [
      ...,
      // 解析图片 ，字体
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: 'static/[hash][ext][query]'
        },
        // 只解析src目录
        include: path.resolve(__dirname, "../src"),
      },
    ],
  },
  ...
};

```

在生产环境和开发环境的配置文件中都加入上面的代码

重新启动应用并查看界面效果，我们可以发现界面正产显示了

![图片正常显示](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/082c213ae7624e109e1794ebf2a67c91~tplv-k3u1fbpfcp-watermark.awebp)

注意，在打包过程中，Webpack 会为每一张图片赋予一个全局唯一的随机名称。 这也就意味着文件名不会与其他组件中的其他图片文件冲突。

在生产环境`npm run build`中，我们看到`build`文件夹下的图片的确拥有全局唯一的随机名称 ，并在 JavaScript 中进行了相应的引用：

![打包后的图片](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/c381bb2cf9a840928fc1bf7789e872cf~tplv-k3u1fbpfcp-watermark.awebp)

## 在 CSS 文件中应用图片

有时候，我们也想在 CSS 代码中引用图片，那如何做呢？

我们给`src/pages/imgDemo/index.tsx`组件添加一个 bgStyle 样式类名

```ts
import React from "react";

import style from "./index.less";
// 这里的 @ 是因为在webpack中设置了路径别名
import flower from "@/assets/flower.jpeg";

const Index: React.FC = () => {
  return (
    <div className={style.container}>
      <img src={flower} alt="flower.jpeg无法显示" />

      <div className={style.bgStyle}>
        <h1>科技感</h1>
      </div>
    </div>
  );
};

export default Index;

```

在 CSS 文件中加上背景图片

```css
@color: purple;

.container {
  .bgStyle {
    background-image: url("@/assets/bg.png");
    width: 400px;
    height: 300px;
    background-size: cover;
    text-align: center;
    line-height: 300px;

    h1 {
      color: white;
    }
  }
}

```

最后，在开发环境中可以发现背景图片设置生效了

![CSS应用背景图片](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/89f988bdaec74d8c83ddc43dbe8bdf6a~tplv-k3u1fbpfcp-watermark.awebp)

在生产环境中可以发现背景图片也设置生效了

![CSS应用背景图片-生产](https://gitee.com/ian_kevin126/picturebed/raw/master/windows/img/8cbd1ad28cd84ad8af5ad017adb92f5c~tplv-k3u1fbpfcp-watermark.awebp)

重新启动项目并观察界面，可以发现。`代码路径更简洁了，也方便之后修改文件路径`。 并且界面效果效果跟原来的一致 😊

注：生产构建出来的包可能提示体积过大，类似的问题我们到后面性能优化的章节再来解决

------

# 参考文章

https://juejin.cn/user/553809589570109/posts