const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    //Get all of the Posts
    const postData = await Post.findAll({ 
      attributes: ['title', 'content', 'updated_at'],
      include:{
        model: User,
        attributes:['first_name', 'last_name']
      },
      order: [
        ['updated_at', 'DESC']
      ]

   })
    
    // Serialize data so the template can read it
    const posts = postData.map((e) => e.get({ plain: true }));
    
    console.log(posts);

    if(!req.session.logged_in){
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in
      });
      return;
    }

    const userData = await User.findByPk(req.session.user_id, {
      attributes:['first_name', 'last_name']
    })

    const user = userData.get({ plain: true });

    console.log(user);

    res.render('homepage', {
      posts,
      user,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {

    //Get all of the Posts by logged in User
    const postData = await User.findByPk(req.session.user_id, {
      attributes: ['first_name', 'last_name'],
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'content', 'updated_at'],
          order : [
            ['updated_at', 'DESC']
          ]
        },
      ],

    });

    // Serialize data so the template can read it
    const posts = postData.get({ plain: true });

    console.log(posts);

    res.render('dashboard', {
      user: posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json("Opps! Something went wrong!");
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('dashboard');
      return;
    }
    res.render('signup', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;