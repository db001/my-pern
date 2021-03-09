const router = require('express').Router();
const pool = require('../db');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.send('auth');
});

router.post('/signup', body('email').isEmail(), async (req, res) => {
    const { name, email, password } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user =  await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if(user.rows.length > 0) {
            res.send('User exists');
            return;
        } else {
            console.log('Adding new user')
        }

        let newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        );

        return res.json(newUser.rows[0]);

    } catch (error) {
        console.log(error.message);
    }

})

module.exports = router;