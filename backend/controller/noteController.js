const Note = require("../model/Note");
const { Op, where } = require("sequelize");

//==================GET ALL NOTES (WHITOUT FILTERS)=====
exports.getAllNotes = async (req, res, next) => {
  const valores = req.query;
  const { filter } = req.params;
  const defaultFilter = filter || 1;
  const { userId } = req.query;
  //const userIdQueryParam = userId || 1;

  const docs = await Note.findAll({
    where: {
      userId: userId,
      ...(valores?.filter?.length == 0 ? {} : { status: valores?.filter }),
    },
  });
  res.status(200).json({
    status: "success",
    results: docs.length,
    filter: filter,
    valores: valores,

    data: {
      data: docs,
    },
  });
};

//==========GET NOTES BY STATUS======================
exports.getNotesByStatus = async (req, res, next) => {
  const values = req.params;
  const { status } = req.params;

  const docs = await Note.findAll({
    where: { status },
  });
  res.status(200).json({
    status: "success",
    valor: values,
    results: docs.length,
    userId: userId,
    filter: filter,
    data: {
      data: docs,
    },
  });
};

//===================INSERT NOTES=====================

exports.insertNewNote = async (req, res, next) => {
  const { status } = req.params;
  const docs = await Note.create(req.body);
  res.status(200).json({
    status: "The note has been created",
    results: docs.length,
    data: {
      data: docs,
    },
  });
};

//======================UPDATE NOTE===================
exports.updateNote = async (req, res, next) => {
  const { id } = req.params;
  const doc = await Note.findOne({ where: { id } });

  if (!doc) {
    const error = new Error("This note does not exist");
    return next(error);
  }
  doc.set(req.body);

  const newDoc = await doc.save();

  res.status(200).json({
    status: "The note has beeen edited sucessfully",
    data: {
      data: newDoc,
    },
  });
};

//=========================DELETE NOTE==================
exports.deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const doc = await Note.findOne({ where: { id } });
  if (!doc) {
    const error = new Error("This note does not exist");
    return next(error);
  }
  await doc.destroy();

  res.status(200).json({
    status: "element has been deleted sucessfully",
  });
};
