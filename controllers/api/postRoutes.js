const router = require('express').Router();
const withAuth = require('../../utils/auth');
const {Post, User, Comment} = require('../../models');
const moment = require('moment');

/* Endpoint ('/api/posts/') */

router.get('/add', withAuth, async (req, res) => {
  console.log('I"M IN THE Get /api');
  try {  
    res.status(200).render('add');
  } catch (err) {
    res.status(400).json("Not found");
  }
});

//Individual 
router.get('/post/:id', async (req, res) => {
    try {
      console.log(`post_id: ${req.params.id}`);
      const postData = await Post.findByPk(req.params.id, {
        attributes : ['id', 'title', 'content'],
        include: [
          {
            model: User,
            attributes: ['first_name', 'last_name', 'username']
          }
        ]
      });
      const post = postData.get({ plain: true });
      
      console.log(post);

      const commentData = await Comment.findAll({
        where: {post_id: req.params.id},
        include: [{
          model: User,
          attributes: ['username']
        }]
      })

      console.log("Past the comments Data!");

      const comments = commentData.map((comment) => comment.get({ plain: true }));

      console.log(comments);

      res.render('post',{
        logged_in: req.session.logged_in,
        post,
        comments: comments
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async(req, res) => {
  try {
    //console.log('In the get edit page');
    const postData = await Post.findByPk(req.params.id, {
      attributes : ['id', 'title', 'content'],
      include: {
        model: User,
        attributes: ['first_name', 'last_name']
      }
    });
    const post = postData.get({ plain: true });
    
    //console.log(post);
    // console.log(post.id);

    res.status(200).render('edit', {
      logged_in: req.session.logged_in,
      post
    });
  } catch (err) {
    res.status(400).json('Something went wrong with getting your post editor!')
  }
})


router.put('/edit/:id', withAuth, async (req, res) => {
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

router.post('/comment', withAuth, async (req, res) => {
  try {
      //Add the comment to the post
    console.log(req.body);
    const newPost = await Comment.create({
        content : req.body.content,
        user_id : req.session.user_id,
        post_id : req.body.post_id
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json('Something went wrong when trying to add your post!');
  }
});

module.exports = router;