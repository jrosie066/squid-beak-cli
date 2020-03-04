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
| storybook   | 
### Installing
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

### component [name]
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


### page [name]
```sh
$ squid-beak page my-awesome-component
```
or can use alias

```sh
$ squid-beak p my-awesome-component
```
**Options**
`--material` or `-m` - use material-ui styles with this component

default: false

`--no-enhancer` or `-e` - don't use [enhancer pattern](#enhancer) with page

default: false

`--no-wrapper` or `-w` - don't use the higher order component/"wrapper" for the page

default: false


### project [name]

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

Jamie Artin

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


