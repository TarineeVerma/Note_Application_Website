exports.signup = async (req, res) => {
    const locals = {
        title: 'signup/NOTE_APPLICATION',
        description: 'note application',
        messages: req.flash('error') 
    }
    console.log('Messages:', locals.messages);
    res.render('partials/signup', { locals, layout: 'layouts/signup' });
}

exports.singin = async (req, res) => {
    const locals = {
        title: 'singin/NOTE_APPLICATION',
        description: 'note application'
    };
    res.render('partials/singin', { locals, layout: 'layouts/singin' });
};