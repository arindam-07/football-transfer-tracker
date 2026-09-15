const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
    player: {
        type: String,
        required: true
    },

    oldClub: {
        type: String,
        required: true
    },

    newClub: {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    positionCategory: {
        type: String,
        required: true
    },

    marketValue: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    transferDate: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    oldClubLogo: {
        type: String,
        required: true
    },

    newClubLogo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Transfer", transferSchema);