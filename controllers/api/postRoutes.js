const router = require('express').Router();
const withAuth = require('../../utils/auth');
const {Post} = require('../../models');

router.get('/', withAuth, async (req, res) => {
    try {
      res.render('post',{
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/add', withAuth, async (req, res) => {
    try {
        //Add the post
      console.log(req.body);
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });

      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json('Something went wrong when trying to add your post!');
    }
  });

module.exports = router;