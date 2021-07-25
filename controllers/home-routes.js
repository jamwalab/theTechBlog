const router = require('express').Router();
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'post_content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    // pass a single post object into the homepage template
    //const posts = dbPostData.map(post => post.get({plain: true}));
    //Convert line breals to array
    const postsData = dbPostData.map(post => post.get({ plain: true }));
    const posts = postsData.map(post => {
      let temp = post.post_content.split("\n");
      post.post_content = []
      post.post_content.push(temp[0].split(" ").splice(0, 50).join(" "));
      return post;
    });

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    // serialize the data
    //const post = dbPostData.get({ plain: true });
    //Convert line breals to array
    const post = dbPostData.get({ plain: true });
    let temp = post.post_content.split("\n");
    post.post_content = temp;

    //pass data to the template
    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return;
  }
  res.render('signup');
});

module.exports = router;