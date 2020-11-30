var express = require('express');
var router = express.Router();
var classes = require('../classes/classes')
var groups = classes.groups
/* GET users listing. */
router.get('/:groupId', async (req, res) => {
    console.log(req.params.groupId)
    const match = await groups.getMatch(req.params.groupId);
    res.status(200).send(match)
});

module.exports = router;