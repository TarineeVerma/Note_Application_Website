const Note = require('../models/Notes');
const mongoose = require('mongoose');

// GET  Dashboard--------------------------------------------------------------------------------------------------------------

exports.homepage = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;

  const locals = {
    title: 'Dashboard',
    description: 'note application'
  };

  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    console.log()

    const notes = await Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: userId } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
      { $skip: perPage * page - perPage },
      { $limit: perPage }
    ]);

    const count = await Note.countDocuments({ user: userId });

    res.render("dashboard/index", {
      userName: req.user.username,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });

  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Note View--------- GET  View Specific Note------------------------------------

exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id }).where({ user: req.user.id }).lean();

  if (note) {
    res.render("dashboard/view-notes", {
      noteID: req.params.id,
      note,
      layout: "layouts/dashboard", // Correct path to the layout file
    });
  } else {
    res.send("Something went wrong.");
  }
};

// Upadate Note----------PUT Update Specific Note---------------------------------------------------------------------------------------------------------
exports.dashboardUpdateNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// DeleteNote------DELETE----------------------------------------------------------------------------------------------------------------
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};


// Add Notes-------GET--------------------------------------------------------------------------------------------------------------
exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};

//Add  Submit note- POST--------------------------------------------------------------------------------------------------------------

exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
}

// GET Search-------------------------------------------------------------------------------------------------------------------
exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {}
};


/**
 * POST /
 * Search For Notes
 */

exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};