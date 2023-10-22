// get Homepage

exports.homepage = async (req,res) =>{

    const locals = {
        title:'NOTE_APPLICATION',
        description: 'note application'
    }
    res.render('index', {
        locals,
        layout:'../views/layouts/front-page'
    });
}


exports.about = async (req,res) =>{

    const locals = {
        title:'About/NOTE_APPLICATION',
        description: 'note application'
    }
    res.render('about', locals);
}

exports.features = async (req,res) =>{

    const locals = {
        title:'About/NOTE_APPLICATION',
        description: 'note application'
    }
    res.render('features', locals);
}

exports.FAQs = async (req,res) =>{

    const locals = {
        title:'About/NOTE_APPLICATION',
        description: 'note application'
    }
    res.render('FAQs', locals);
}