![alt text](https://github.com/jrosie066/squid-beak-cli/dark-squid-logo@2x.png "Kevin")
# Squid Beak React CLI
An easy way to generate new React project, React components and pages through the command line. 

| package     | version |
|-------------|---------|
| react       | 16.12   |
| typescript  | 3.7.2   |
| eslint      | 6.6.0   |
| redux       | 4.0.4   |
| material-ui | 4.6.1   |
| webpack     | 4.41.2  |
| storybook   | 5.3.12  |


# Installing
Right now, this is not in npm so you will need to clone the package and install globally from there

Clone project from github

`git clone https://github.com/jrosie066/squid-beak-cli.git`
 
Navigate inside the cloned project

`cd squid-beak-cli`

Globally install

`npm i -g ./`

# Usage

```sh
$ squid-beak [cmd] <params>
```
## Commands

* [component](#component)
* [page](#page)
* [project](project)

### component
```sh
$ squid-beak component my-awesome-component
```
or can use alias

```sh
$ squid-beak c my-awesome-component
```
This will create a new component called MyAwesomeComponent with the following folder structure
under the "components" folder

```
├── components
│   └── MyAwesomeComponent
│       ├── MyAwesomeComponent.enhancer.ts
│       ├── MyAwesomeComponent.styles.ts
│       ├── MyAwesomeComponent.tsx
│       ├── index.ts
│       └── test
│           └── MyAwesomeComponent.stories.js
```
**Options**

`--material` or `-m` - use material-ui styles with this component

default: false


`--no-storybook` or `-s` - don't add the test folder with the component's stories file

default: false


`--no-enhancer` or `-e` - don't use the [enhancer pattern](#enhancer) with this component

default: false


### page
```sh
$ squid-beak page my-awesome-page
```
or can use alias

```sh
$ squid-beak p my-awesome-page
```
This will create a new page called MyAwesomePage with the following folder structure under the "pages" folder

```
├── pages
│   ├── MyAwesomePage
│   │   ├── component
│   │   │   ├── MyAwesomePage.enhancer.ts
│   │   │   ├── MyAwesomePage.styles.ts
│   │   │   ├── MyAwesomePage.tsx
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── wrapper
│   │       └── MyAwesomePageWrapper.tsx
```
The component folder holds the presentational page component, styles, HOC enhancer file.

The wrapper folder holds the a higher order component for the... 

**Options**

`--material` or `-m` - use material-ui styles with this component

default: false

`--no-enhancer` or `-e` - don't use [enhancer pattern](#enhancer) with page

default: false

`--no-wrapper` or `-w` - don't use the higher order component/"wrapper" for the page

default: false


### project
```sh
$ squid-beak project my-awesome-component
```
**Options**
The generate project command will prompt you with a serious of questions to select the options to use with the project setup.
1. Pick a Component Library
  * Material-UI
  * Ant-Design
  * None

2. Eslint Style Guide?
  * AirBnb
  * Alloy
  * Google

3. Do you want to use redux? y/n

4. Do you want to set up Storybook? y/n

After your selection the folder structure will be generated and configuration and sample files will be added.
Git will be initiated and it will install all appropriate dependencies.

Here is a sample of the folder structure generated with storybook and redux

```
├── .storybook
│   └── main.js
├── config
│   ├── jest
│   │   ├── assetTransformer.js
│   │   ├── testSetup.js
│   │   └── testShim.js
├── scripts
│   ├── buildApp.js
│   └── index.js
├── src
│   ├── assets
│   │   ├── images
│   │   └── styles
│   ├── build
│   │   └── index.html
│   ├── components
│   ├── constants
│   │   └── route-paths.ts
│   ├── containers
│   │   └── Root.tsx
│   ├── index.tsx
│   ├── pages
│   │   └── routes.tsx
│   ├── redux
│   │   └── reducers
│   │       └── sample
│   │           └── tests
│   ├── serviceWorker.js
│   └── util
├── tsconfig.json
├── webpack.common.config.js
├── webpack.dev.config.js
├── webpack.production.config.js
└── webpack.static.config.js
```

# Enhancer

Instead of piling on the higher order components for a component on to the same file, this pattern has an extra file (the enhancer) that combines together the HOCs with the help of thee redux `compose` function into one function.


```js
// .enhancer.js

import { memo, FunctionComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { WrapperOne } from '../wrapper/WrapperOne';
import { WrapperTwo } from '../wrapper/WrappereTwo'
import { Props } from './MyComponent';

const enhance = compose<FunctionComponent<Props>>(
  memo,
  withStyles,
  WrapperOne,
  WrapperTwo
);
export { enhance };

```
So then when you export the component, you wrap it with the new enhancer function and all of the HOCs are applied. Keeping the component file a bit cleaner and separating out concerns into a new file.

```js
// index.js
import { MyComponent } from './MyComponent';
import { enhance } from './MyComponent.enhancer';

export default enhance(MyComponent);

```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

Jamie Artin

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


