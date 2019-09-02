[![Netlify Status](https://api.netlify.com/api/v1/badges/e3010012-c6e9-486d-802e-cc5b6adef7a1/deploy-status)](https://app.netlify.com/sites/mkr-gov/deploys)

# React Subgraph starter kit

The intention of this project is to provide an easy and faster way to consume data from a [subgraph](https://thegraph.com/) and display them in a react application.

This starter kit was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is configured with:

- [Typescript](https://www.typescriptlang.org/)
- [Apollo-client](https://www.apollographql.com/docs/react/)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io)
- [Husky](https://github.com/typicode/husky#readme)
- AutoGenerated types from subgraph schema

## How to use it

First you have to fork this repository. Then you need to create an **.env.local** with the same content as **.env.example**.

That configuration provides information that will be used by `ExampleMakerDaoCpdEngine` component to communicate with the [MakerDao](https://thegraph.com/explorer/subgraph/protofire/makerdao) subgraph deployed in theGraph.
_(This configuration should be overwritten with the subgraph you want to communicate with)._

You can generate the types for the GQL Queries and Subscriptions by running `npm generateGQLTypes`, this command will search the schema exposed by graphql (it's defined in .env.local in key **REACT_APP_GRAPH_HTTP**) and then will generate a file in `/src/types/generatedGQL.ts` with the types needed for your queries. Note that this command should be executed each time the schema changes.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm generateGQLTypes`

Generate GQL types related with queries and subscriptions taken for the source code. The schema used to generate the types is taken from the environment variable **REACT_APP_GRAPH_HTTP**.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
