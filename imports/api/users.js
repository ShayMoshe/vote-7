import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = Meteor.users;

if (Meteor.isServer) {

    Meteor.publish('userList', function usersPublication() {
         return Users.find({}, {});
    });
}

Meteor.methods({

});
