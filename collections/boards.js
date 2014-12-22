Boards = new Mongo.Collection('boards');
BoardMembers = new Mongo.Collection('board_members');

// ALLOWS
Boards.allow({
    insert: function(userId, doc) { return doc.userId === userId; },
    update: function(userId, doc) { return doc.userId === userId; },
    remove: function(userId, doc) { return doc.userId === userId; },
});

// HELPERS
Boards.helpers({
    lists: function() {
        return Lists.find({ boardId: this._id }, { sort: { sort: 1 }});
    },
    edit: function(yes, no) {
        var no = _.isString(no) && no || '';
        return !Meteor.user() ? yes : (no || '');
    }
});


// BOARDS BEFORE HOOK INSERT
Boards.before.insert(function(userId, doc) {
    doc.createdAt = new Date();
    doc.openWidgets = true;
    doc.closed = false;

    // userId native set.
    if (!doc.userId) doc.userId = userId;
});


// BOARDS BEFORE HOOK UPDATE
Boards.before.update(function(userId, doc, fieldNames, modifier) {
    modifier.$set.modifiedAt = new Date();
});
