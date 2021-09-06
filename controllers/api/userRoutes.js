const router = require('express').Router();
const {User} = require('../../models');

/* Endpoint ('/api/user/') */

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json(`No user found with the email: ${req.body.email}`);
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json('Incorrect email or password, please try again');
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signup', async (req, res) => {
	try {
		console.log(req.body);

		//Check to see if email is already used
		const userExists = await User.findOne({ where: { email: req.body.email } });

		if(!userExists){
			const userData = await User.create(req.body);

			req.session.save(() => {
				req.session.user_id = userData.id;
				req.session.logged_in = true;
				res.status(200).json(userData);
			});
		}
		else{
			res.status(401).json('Email already in use');
		}
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;