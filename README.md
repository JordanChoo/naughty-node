# Naughty Node
Naughty Node is a severless implementation of [Tesnsorflow.js's prebuilt toxicity model](https://github.com/tensorflow/tfjs-models/tree/master/toxicity) for single queries.

## Usage

The usage of Naughty Node is quite straight forward, all requests should be sent as `GET`s with all variables provided as query parameters. 

### Query Parameters
The following query parameters are used in Naughty Node:

- `term` — The term is the word/phrase/text that you want Naughty Node to evaluate. 
- `kgKey` — The kgKey is used as an authentication key, can you [learn more about the usage and implementation here](#kgKey).

## Deployment

### Environment Variables

In order for Naughty Node to work, the following environment variable(s) need to be configured and used:

#### kgKey

In order to prevent any Joe/Jane Schmo from using your Cloud Function, Naughty Node uses an internal environment key that all requests are checked against. The variable name is called `kgKey`.

On the request side the `kgKey` is evaluated as a query parameter in all requests.

### Function Configuration
Since Tensorflow.js is quite picky about the hardware and Node.Js versions it is deployed on, I've found that the following [Google Cloud Function](https://cloud.google.com/functions) settings have worked best:

| Item          | Configuration Value           |
| ------------- |:-----------------------------:|
| Memory        | 8 GiB                         |
| Runtime       | Node.js 12                    |
| Timeout       | 120 seconds                   |