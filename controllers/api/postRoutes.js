const router = require('express').Router();
const withAuth = require('../../utils/auth');
const {Post, User} = require('../../models');
const moment = require('moment');

router.get('/', withAuth, async (req, res) => {
    try {
      res.render('post',{
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async(req, res) => {
  try {
    console.log('In the get edit page');
    const postData = await Post.findByPk(req.params.id, {
      attributes : ['id', 'title', 'content'],
      include: {
        model: User,
        attributes: ['first_name', 'last_name']
      }
    });
    const post = postData.get({ plain: true });
    
    console.log(post);
    // console.log(post.id);

    res.status(200).render('edit', {
      logged_in: req.session.logged_in,
      post
    });
  } catch (err) {
    res.status(400).json('Something went wrong with getting your post editor!')
  }
})


router.put('/:id', withAuth, async (req, res) => {
  try {
    await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        updated_at: moment().format()
      },
      {
        where: {id: req.params.id}
      }
    );
    res.status(200).json('Edit saved!');
  } catch (err) {
    res.status(500).json("Something went wrong when updating your post!");
  }
});

router.post('/', withAuth, async (req, res) => {
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