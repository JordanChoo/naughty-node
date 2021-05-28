/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

 exports.naughty = (req, res) => {

    require('@tensorflow/tfjs');
    require('@tensorflow/tfjs-node');
    const toxicity = require('@tensorflow-models/toxicity');
    const threshold = 0.9;

    // Check to see if it is a POST Req
    if(req.method != 'GET') return res.status(401).send('Not authorized');

    // Check to make sure ENV variables are not null
    if(!kgKey) return res.status(503).send('Empty ENV variables');

    // Make sure that the kgKey matches the env kgKey
    if(req.query.kgKey != kgKey) return res.status(401).send('Not authorized');
  
    // Make sure that the query term is there
    if(!req.query.term) {
        res.status(404).send('Missing term');
    }
  
    // Load the configured toxicity model
    toxicity.load(threshold).then(model => {
      
      // Run the query term through the toxicity classification model 
      model.classify(req.query.term).then(predicition => {

        // Emit the results in console.log
        console.log(JSON.stringify(predicition));
        // Return the results to the requester
        res.status(200).send(predicition);
      });
    });
    
  };
  