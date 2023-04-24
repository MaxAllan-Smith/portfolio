import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        emailAddress: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        profilePicture: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        },
        friends: {
            type: Array,
            default: [],
        },
        friendRequests: {
            type: Array,
            default: [],
        },
        blockedFriends: {
            type: Array,
            default: [],
        },
        location: {
            type: String,
        },
        bio: {
            type: String,
            max: 200,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;