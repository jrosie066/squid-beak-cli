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
 
Navigatee inside the cloned project
`cd squid-beak-cli`

Globally install
`npm i -g ./`


End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

Jamie Artin

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
## Generate Components with enhancer pattern

`npm run generate-component <name>`
** if name is more than one word use dash notation, this will camel case the component file and the folder name
i.e. `npm run generate-component test-name`



## TODO:

* ~redux setup~
* redux test
* production webpack
* verify prod build
* static webpack

### Generators
* fs tests

### Components/Pages
* add comments to generator
* create sample page
* create sample component
